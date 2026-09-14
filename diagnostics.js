const moddingCommands = require('./moddingCommands');

const vscode = require('vscode');
const fs = require('fs');

class ErrorDiagnosticProvider {
    constructor() {
        this.needEndJson = {};
    }

    async loadJson(filename) {
        try {
            const data = await fs.promises.readFile(filename, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
        }
    }

    /* separateCommand(inputString) {
        // Exclude anything that follows "--" in the line
        const lineWithoutComments = inputString.split('--')[0].trim();
    
        const pattern = /#(\S+(?:\s+\S+)*)/;
        const match = lineWithoutComments.match(pattern);
    
        if (match) {
            const values = match[1].split(/\s+/);
    
            // Convert numeric strings to numbers (floats or integers)
            const parsedValues = values.map(value => {
                const numericValue = parseFloat(value);
                return isNaN(numericValue) ? value : numericValue;
            });
    
            return parsedValues;
        } else {
            return [null];
        }
    } */

    separateCommand(inputString) {
        // Exclude anything that follows "--" in the line
        const lineWithoutComments = inputString.split('--')[0].trim();
    
        const pattern = /#\S*\s+((?:"[^"]*")|(?:[^\s"]+))(?:\s*(\S*))/;
        const match = lineWithoutComments.match(pattern);
    
        if (match) {
            const values = match.slice(1);
    
            // Convert numeric strings to numbers (floats or integers)
            const parsedValues = values.map(value => {
                const numericValue = /^-?\d+(\.\d+)?$/.test(value) ? parseFloat(value) : value;
                return isNaN(numericValue) ? value : numericValue;
            });
    
            return parsedValues;
        } else {
            return [null];
        }
    }
    
    
    

    checkMissingEnd(lines, diagnostics, startValues) {
        let lastCommand = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.includes('#end')) {
                lastCommand = null;
            }
            
            for (const command of startValues.command) {
                if (line.startsWith(command)) {
                    if (lastCommand && !line.endsWith('#end')) {
                        const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length));
                        const diagnostic = new vscode.Diagnostic(range, `Missing #end command for ${lastCommand} above this.`, vscode.DiagnosticSeverity.Error);
                        diagnostic.code = 'missing-end-above';
                        diagnostics.push(diagnostic);
                    }
                    lastCommand = command;
                    break; // No need to continue checking after a match
                }
            }
        }
        
        // Check if there's a missing #end by the end of the document after a startValue
        if (lastCommand) {
            const lastLineIndex = lines.length - 1;
            const lastLine = lines[lastLineIndex].trim();
            if (!lastLine.endsWith('#end')) {
                const range = new vscode.Range(new vscode.Position(lastLineIndex, 0), new vscode.Position(lastLineIndex, lastLine.length));
                const diagnostic = new vscode.Diagnostic(range, `Missing #end command for ${lastCommand} at the end of the document.`, vscode.DiagnosticSeverity.Error);
                diagnostic.code = 'missing-end-below';
                diagnostics.push(diagnostic);
            }
        }
    }
    
    checkFloatValues(lines, diagnostics) {
        const exclusionCommands = ['#color', '#maptextcol', '#secondarycolor', '#version', '#domversion'];
    
        let insideQuotes = false;
    
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            // Check if the line starts with any of the exclusion commands
            if (exclusionCommands.some(command => line.startsWith(command))) {
                continue;
            }
    
            let lineWithoutComment = line;
            const commentIndex = line.indexOf('--');
            if (commentIndex !== -1) {
                lineWithoutComment = line.substring(0, commentIndex).trim();
            }
    
            let lineWithoutQuotes = '';
            for (let j = 0; j < lineWithoutComment.length; j++) {
                const char = lineWithoutComment[j];
                if (char === '"') {
                    insideQuotes = !insideQuotes;
                }
                if (!insideQuotes) {
                    lineWithoutQuotes += char;
                }
            }
    
            const words = lineWithoutQuotes.split(/\s+/);
            for (const word of words) {
                // Check if the word contains a period (.) indicating a potential floating-point number
                if (/\d+\./.test(lineWithoutQuotes)) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(word)),
                        new vscode.Position(i, line.indexOf(word) + word.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        'Floating-point value found',
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            }
        }
    }
    

    checkColorValues(lines, diagnostics) {
        const colorCommands = ['#color', '#maptextcol', '#secondarycolor'];
    
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            for (const command of colorCommands) {
                if (line.startsWith(command)) {
                    const valueMatches = line.match(/(\d+\.\d+)/g);
    
                    if (valueMatches && valueMatches.length === 3) {
                        const values = valueMatches.map(match => parseFloat(match));
                        const isValid = values.every(value => value >= 0.0 && value <= 1.0);
    
                        if (!isValid) {
                            const range = new vscode.Range(
                                new vscode.Position(i, line.indexOf(valueMatches[0])),
                                new vscode.Position(i, line.indexOf(valueMatches[2]) + valueMatches[2].length)
                            );
                            const diagnostic = new vscode.Diagnostic(
                                range,
                                `Values for ${command} should be between 0.0 and 1.0`,
                                vscode.DiagnosticSeverity.Error
                            );
                            diagnostics.push(diagnostic);
                        }
                    } else {
                        const range = new vscode.Range(
                            new vscode.Position(i, line.indexOf(command)),
                            new vscode.Position(i, line.indexOf(command) + command.length)
                        );
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            `Invalid or missing values for ${command} command`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostic.code = 'show-hover';
                        diagnostics.push(diagnostic);
                    }
                    break; // No need to continue checking after a match
                }
            }
        }
    }


    checkCustomRangeValues(statement, commandRange, valueRange, diagnostics, command, minValue, maxValue, allowString = false, allowEmptyValue = false, legalValuesSet = []) {    
        if (statement[1] === command) {
            const parameters = statement.slice(2)

            // Check if matchedValue array has more than 2 objects
            if (parameters.length > 2) {
                const diagnostic = new vscode.Diagnostic(
                    valueRange,
                    `Too many parameters for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
                return;  // Skip further checks for this line
            }

            if (parameters[0] !== "") {
                const value = parameters[0];

                if (value === null || value === undefined) {
                    const diagnostic = new vscode.Diagnostic(
                        commandRange,
                        `Missing parameter for ${command} command.`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                } else if (allowString && typeof value === 'string') {
                    // Check if the string is wrapped in quotes
                    const isQuotedString = /^".*"$/.test(value);

                    if (!isQuotedString) {
                        const diagnostic = new vscode.Diagnostic(
                            valueRange,
                            `String values for ${command} should be wrapped in quotes`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    }
                } else if (!allowString && typeof value === 'string') {
                    const diagnostic = new vscode.Diagnostic(
                        valueRange,
                        `String values are not allowed for ${command} command`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                } else if (typeof value === 'number') {
                    if ((value < minValue || value > maxValue) || (legalValuesSet.length > 0 && !legalValuesSet.includes(value))) {
                        const diagnostic = new vscode.Diagnostic(
                            valueRange,
                            `Value ${value} for ${command} should be between ${minValue} and ${maxValue}`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    }
                }
            } else if (!allowEmptyValue) {
                const diagnostic = new vscode.Diagnostic(
                    commandRange,
                    `Value missing for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }
    
    // use this when there's two ranges a single value for a command can exist in
    checkCustomRangeTwoSetsValues(statement, commandRange, valueRange, diagnostics, command, minValue1, maxValue1, minValue2, maxValue2, allowString = false, allowEmptyValue = false, legalValuesSet = []) {    
        if (statement[1] === command) {
            const parameters = statement.slice(2)

            // Check if matchedValue array has more than 2 objects
            if (parameters.length > 2) {
                const diagnostic = new vscode.Diagnostic(
                    valueRange,
                    `Too many parameters for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
                return;  // Skip further checks for this line
            }

            if (parameters[0] !== "") {
                const value = parameters[0];

                if (value === null) {
                    const diagnostic = new vscode.Diagnostic(
                        commandRange,
                        `Invalid value format for ${command} command`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                } else if (allowString && typeof value === 'string') {
                    // Check if the string is wrapped in quotes
                    const isQuotedString = /^".*"$/.test(value);

                    if (!isQuotedString) {
                        const diagnostic = new vscode.Diagnostic(
                            valueRange,
                            `String values for ${command} should be wrapped in quotes`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    }
                } else if (typeof value === 'number') {
                    const isInRange1 = (value >= minValue1 && value <= maxValue1);
                    const isInRange2 = (value >= minValue2 && value <= maxValue2);
                    
                    if (!((isInRange1 || isInRange2) || (legalValuesSet.length > 0 && legalValuesSet.includes(value)))) {
                        const diagnostic = new vscode.Diagnostic(
                            valueRange,
                            `Value ${value} for ${command} should be between ${minValue1} and ${maxValue1} or between ${minValue2} and ${maxValue2}`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    }
                }
            } else if (!allowEmptyValue) {
                const diagnostic = new vscode.Diagnostic(
                    commandRange,
                    `Value missing for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }
    
    
    
    
    
    
    
    
    checkPowerOfTwoValues(statement, commandRange, valueRange, diagnostics, command, maxPower, allowEmptyValue = false, legalValuesSet = []) {    
        if (statement[1] === command) {
            const parameters = statement.slice(2);

            if (parameters.length > 2) {
                const diagnostic = new vscode.Diagnostic(
                    valueRange,
                    `Invalid format for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
                return;  // Skip further checks for this line
            }

            // Add code here
             if (allowEmptyValue && parameters[0] === "") {
                return;
            } else if (parameters[0] === "") {
                const diagnostic = new vscode.Diagnostic(
                    commandRange,
                    `Missing or invalid value for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            } else if (typeof parameters[0] !== 'number') {
                const diagnostic = new vscode.Diagnostic(
                    valueRange,
                    `Invalid value ${parameters[0]} for ${command}. Value should be a valid number.`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            } else {
                const value = parseFloat(parameters[0]);
                const isPowerOfTwo = (value & (value - 1)) === 0 && value !== 0 && value <= Math.pow(2, maxPower);

                if (!isPowerOfTwo || (legalValuesSet.length !== 0 && legalValuesSet.includes(value))) {
                    const diagnostic = new vscode.Diagnostic(
                        valueRange,
                        `Value ${value} for ${command} should be a power of 2 up to 2^${maxPower}`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            }
        }
    }
    
    


checkTwoCustomRangeValues(statement, commandRange, valueRange, diagnostics, command, minValueSet1, maxValueSet1, minValueSet2, maxValueSet2, legalValuesSet1 = [], legalValuesSet2 = []) {
    if (statement[1] === command) {
        const parameters = statement.slice(2)

        if (parameters.length >= 2) {
            const value1 = parseInt(parameters[0]);
            const value2 = parseInt(parameters[1]);

            if (
                ((value1 < minValueSet1 || value1 > maxValueSet1) && (legalValuesSet1.length === 0 || !legalValuesSet1.includes(value1))) ||
                ((value2 < minValueSet2 || value2 > maxValueSet2) && (legalValuesSet2.length === 0 || !legalValuesSet2.includes(value2)))
            ) {
                const diagnostic = new vscode.Diagnostic(
                    valueRange,
                    `Values for ${command} should be within specified ranges or legal alternatives`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        } else {
            const diagnostic = new vscode.Diagnostic(
                commandRange,
                `Missing or invalid values for ${command} command`,
                vscode.DiagnosticSeverity.Error
            );
            diagnostic.code = 'show-hover';
            diagnostics.push(diagnostic);
        }
    }
}

checkValueRangeAndSet(statement, commandRange, valueRange, diagnostics, command, minValue, maxValue, allowedValues) {
    if (statement[1] === command) {
        const parameters = statement.slice(2)

        if (parameters.length >= 2) {
            const value1 = parseInt(parameters[0]);
            const value2 = parseInt(parameters[1]);

            // Check if value1 is within the specified numeric range
            // and if value2 is in the allowed set.
            if ((value1 < minValue || value1 > maxValue) || !allowedValues.includes(value2)) {
                const diagnostic = new vscode.Diagnostic(
                    valueRange,
                    `The first value of ${command} must be between ${minValue} and ${maxValue}, and the second must be one of: ${allowedValues.join(', ')}.`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        } else {
            // Handle cases where either value is missing or invalid
            const diagnostic = new vscode.Diagnostic(
                commandRange,
                `Missing or invalid values for ${command} command.`,
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }
    }
}

checkQuotedTextLength(statement, commandRange, valueRange, diagnostics, command, maxLength) {
    if (statement[1] === command) {
        const parameters = statement.slice(2)

        if (parameters[0].length > maxLength) {            
            const diagnostic = new vscode.Diagnostic(
                valueRange,
                `The quoted text after ${command} exceeds the maximum allowed length of ${maxLength} characters. Your current message is ${quotedText.length}.`,
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        } else if (parameters[0].length == 0) {
            // No opening quote found
            const diagnostic = new vscode.Diagnostic(
                commandRange,
                `No quoted text found after ${command} command.`,
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }
    }
}



    async analyzeDocument(document, diagnosticCollection, startValues) {
        if(!document.uri.fsPath.endsWith('.dm')) {
            return;
        }

        const diagnostics = [];

        const lines = document.getText().split('\n');
        this.checkMissingEnd(lines, diagnostics, startValues);
        this.checkFloatValues(lines, diagnostics);
        this.checkColorValues(lines,diagnostics);

        const pattern = /(?:^)+#([a-z_\d]+)[ \t]*((?:"[^"]*"))?[ \t]*([^\n]*)\n/gm;
        const statements = document.getText().matchAll(pattern);

        //Refactor all of this to new methods to avoid repeating the same standard values for repeat stuff like range or boost

        const text = document.getText()

        let activeScope = "open";

        let scanIndex = 0;
        let lineIndex = 0;
        let currentLine = 0;
        for(const statement of statements) {
            while(scanIndex <= statement.index) {
                if(text[scanIndex] === '\n') {
                    currentLine++;
                    lineIndex = scanIndex+1;
                }
                scanIndex++;
            }
            const offset = scanIndex-lineIndex;
            const startLine = currentLine;
            const commandRange = new vscode.Range(
                new vscode.Position(startLine, scanIndex-lineIndex-1),
                new vscode.Position(startLine, scanIndex-lineIndex + statement[1].length)
            );            
            
            while(scanIndex <= statement.index+ statement[0].length) {
                if(text[scanIndex] === '\n') {
                    currentLine++;
                    lineIndex = scanIndex+1;
                }
                scanIndex++;
            }
            const valueRange = new vscode.Range(
                new vscode.Position(startLine, offset + statement[1].length + 1),
                new vscode.Position(currentLine, scanIndex-lineIndex-1)
            );

            const commandName = statement[1];

            const stringPart = statement[2];
            const withoutComment = statement[3].split("--")[0].trim();

            let statementParams = [];
            if(stringPart) {
                statementParams.push(stringPart);
                statementParams.push(withoutComment);
            } else {
                statementParams = withoutComment.split(" ");
                while(statementParams.length < 2){
                    statementParams.push("")
                }
            }

            const parsedStatement = statementParams.map(value => {
                const numericValue = /^-?\d+(\.\d+)?$/.test(value) ? parseFloat(value) : value;
                return isNaN(numericValue) ? value : numericValue;
            });

            if(commandName === "end") {
                activeScope = "open"
                continue;
            }

            const scopeCom = moddingCommands[activeScope];
            if(!scopeCom) {
                continue; //temp
            }

            const command = moddingCommands[activeScope][commandName];
            if(!command) {
                const diagnostic = new vscode.Diagnostic(commandRange, `${commandName}: Command not recognised for ${activeScope} scope.`, vscode.DiagnosticSeverity.Error);
                diagnostics.push(diagnostic);
            } else {
                if(command.startScope) {
                    activeScope = command.startScope;
                }

                if(!command.parameters) {
                    if(parsedStatement[0] !== "") {
                        const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}: Command does not accept a parameter (${parsedStatement[0]}).`, vscode.DiagnosticSeverity.Error);
                        diagnostics.push(diagnostic);
                    }
                } else {
                    if(command.parameters.length < 2 && parsedStatement[1] !== "") {
                        const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}: Command does not accept a second parameter (${parsedStatement[0]},${parsedStatement[1]}).`, vscode.DiagnosticSeverity.Error);
                        diagnostics.push(diagnostic);
                    }

                    for(let j=0; j<command.parameters.length; j++) {
                        const param = command.parameters[j]
                        const paramArg = parsedStatement[j]
                        
                        if(paramArg === "") {
                            if(!param.optional) {
                                const diagnostic = new vscode.Diagnostic(commandRange, `${commandName}, Parameter ${j+1}: Missing required parameter.`, vscode.DiagnosticSeverity.Error);
                                diagnostics.push(diagnostic);
                            }
                            continue;
                        }
                        if(!param.allowString) {
                            if(typeof paramArg !== 'number') {                                
                                const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Must be a number.`, vscode.DiagnosticSeverity.Error);
                                diagnostics.push(diagnostic);
                                continue;
                            }
                        }
                        if(param.fixedValues && param.range) {
                            if((paramArg < param.range[0] || paramArg > param.range[1]) && !param.fixedValues.includes(paramArg)) {
                                const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Value (${paramArg}) must fall in the inclusive range ${param.range[0]} - ${param.range[1]} OR be one of ${param.fixedValues.join(', ')}.`, vscode.DiagnosticSeverity.Error);
                                diagnostics.push(diagnostic);
                                continue;
                            }
                        } else if(param.fixedValues) {
                            if(!param.fixedValues.includes(paramArg)) {
                                const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Value (${paramArg}) must be one of ${param.fixedValues.join(', ')}.`, vscode.DiagnosticSeverity.Error);
                                diagnostics.push(diagnostic);
                                continue;
                            }
                        } else if(param.range) {                            
                            if(paramArg < param.range[0] || paramArg > param.range[1]) {                                
                                const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Value (${paramArg}) must fall in the inclusive range ${param.range[0]} - ${param.range[1]}.`, vscode.DiagnosticSeverity.Error);
                                diagnostics.push(diagnostic);
                                continue;
                            }
                        }
                        if(param.bitmask) {
                            //TODO
                        }
                        if(param.expectString) {
                            if(typeof paramArg !== 'string') {                                
                                const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Must be a string.`, vscode.DiagnosticSeverity.Error);
                                diagnostics.push(diagnostic);
                                continue;
                            }
                        }
                        if(param.maxStringLength) {
                            if(paramArg.length > param.maxStringLength) {
                                const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: String length ${paramArg.length} exceeds the maximum (${param.maxStringLength}).`, vscode.DiagnosticSeverity.Error);
                                diagnostics.push(diagnostic);
                                continue;
                            }
                        }
                    }
                }
            }
        }

        //create monster diagnostics including transform and forcetransform
/*      These all need revision because the trailing number is being counted as the value for the command.
        this.checkCustomRangeValues(statement, diagnostics, "#path0", 0, 8);
        this.checkCustomRangeValues(lines, diagnostics, "#cost0", 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, "#path1", 0, 8);
        this.checkCustomRangeValues(lines, diagnostics, "#cost1", 1, 10);
         */
        
        diagnosticCollection.set(document.uri, diagnostics);
    }

    async activate(context) {
        console.log('Error Diagnostic Provider active');
    
        this.needEndJson = await this.loadJson(context.asAbsolutePath('/json/needEnd.json'));
    
        const diagnosticCollection = vscode.languages.createDiagnosticCollection('dominionsmod');
    
        vscode.workspace.onDidOpenTextDocument(document => this.analyzeDocument(document, diagnosticCollection, this.needEndJson), this, context.subscriptions);
        vscode.workspace.onDidChangeTextDocument(event => this.analyzeDocument(event.document, diagnosticCollection, this.needEndJson), this, context.subscriptions);
        vscode.workspace.onDidCloseTextDocument(document => diagnosticCollection.delete(document.uri), null, context.subscriptions);
    
        const codeActionProvider = vscode.languages.registerCodeActionsProvider(
            'dominionsmod', // Language ID
            {
                provideCodeActions: (document, rangeOrSelection, context, token) => {
                    const fixes = [];

                    // Check if the diagnostic has the missing #end warning
                    for (const diagnostic of context.diagnostics) {
                        if (diagnostic.code === 'missing-end-above' && diagnostic.range.contains(rangeOrSelection.start)) {
                            const fix = new vscode.CodeAction('Add #end command above', vscode.CodeActionKind.QuickFix);
                            fix.edit = new vscode.WorkspaceEdit();

                            const lineToAdd = diagnostic.range.start.line;
                            const newText = '#end\n';

                            fix.edit.insert(document.uri, new vscode.Position(lineToAdd, 0), newText);

                            fix.isPreferred = true;
                            fix.diagnostics = [diagnostic];
                            fixes.push(fix);
                        } else if (diagnostic.code === 'missing-end-below' && diagnostic.range.isEqual(rangeOrSelection)) {
                            const fix = new vscode.CodeAction('Add #end command at the end of the document', vscode.CodeActionKind.QuickFix);
                            fix.edit = new vscode.WorkspaceEdit();

                            const lineToAdd = document.lineCount; // Insert at the end of the document
                            const newText = '\n#end\n';

                            fix.edit.insert(document.uri, new vscode.Position(lineToAdd, 0), newText);

                            fix.isPreferred = true;
                            fix.diagnostics = [diagnostic];
                            fixes.push(fix);
                        }
                    }

                    return fixes;
                }
            }
        );
    
        context.subscriptions.push(diagnosticCollection, codeActionProvider);
    }

    dispose() {
        
    }
}

module.exports = ErrorDiagnosticProvider;
