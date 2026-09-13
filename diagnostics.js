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
        const diagnostics = [];

        const lines = document.getText().split('\n');
        this.checkMissingEnd(lines, diagnostics, startValues);
        this.checkFloatValues(lines, diagnostics);
        this.checkColorValues(lines,diagnostics);

        const pattern = /(?:^|\n)+(#\S+)[ \t]*((?:"[^"]*")|(?:[^\s"]*))(?:[ \t]*(\S*))(?:[ \t]*?--[^\n]*)?\n*/g;
        const statements = document.getText().matchAll(pattern);

        //Refactor all of this to new methods to avoid repeating the same standard values for repeat stuff like range or boost

        let scanIndex = 0;
        let currentLine = 0;
        let lineIndex = 0;
        const text = document.getText()

        for(const statement of statements) {
            while(scanIndex <= statement.index) {
                if(text[scanIndex] === '\n') {
                    currentLine++;
                    lineIndex = scanIndex+1;
                }
                scanIndex++;
            }

            const commandRange = new vscode.Range(
                new vscode.Position(currentLine, scanIndex-lineIndex),
                new vscode.Position(currentLine, scanIndex-lineIndex + statement[1].length)
            );
            const valueRange = new vscode.Range(
                new vscode.Position(currentLine, scanIndex-lineIndex + statement[1].length + 1),
                new vscode.Position(currentLine, scanIndex-lineIndex + statement[0].length)
            );

            const parsedStatement = statement.map(value => {
                const numericValue = /^-?\d+(\.\d+)?$/.test(value) ? parseFloat(value) : value;
                return isNaN(numericValue) ? value : numericValue;
            });

            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#newweapon', 1000, 3999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#newarmor', 300, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#newmonster', 5000, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#ressize', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#size', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#minsize', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#maxsize', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#montag', 1000, 100000);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#researchlevel', 0, 9);
            //make a custom checker for #path, needs two values, just check mod manual this is complicated cuz there's two #paths. will need to check for command after previous #end
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#selectnametype', 100, 399);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#newsite', 1700, 3999, true);
            this.checkTwoCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#gems', 0, 8, 0, 99);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#level', 0, 4);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#selectnation', 5, 499);
            //this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#victorycondition',null,null,false,true,[76,89]);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#fort', 1, 29);
            this.checkTwoCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#magicskill', 0, 9, 1, 10, [50,51,52,53]);
            // create a custom checker for #custommagic, needs two values 1st is path mask (from table 18) and 2nd is the chance (1 to 100)
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#mainpath', -1, 9);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#secondarypath', -1, 9);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#cluster', 1, 32000);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#reconst', 1, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#firerange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#airrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#waterrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#earthrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#astralrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#deathrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#naturerange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#glamourrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#bloodrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#elementrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#sorceryrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#deathshock', 1, 50);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#deathslime', 1, 50);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#nightmareaura', 1, 50);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#falseregen', 1, 50);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#dread', 1, 50);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#undisleader', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#assencloc', 0, 7);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#extralives', 1, 50);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#startresearch', 1, 1000);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#regainmount', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#skilledrider', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#mountiscom', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#bravemount', 1, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#smartmount', 1, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_gem', 0, 8);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathfire', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathglamour', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathwater', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathearth', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathastral', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathdeath', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathnature', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathglamour', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathblood', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathholy', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathfire', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathglamour', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathwater', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathearth', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathastral', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathdeath', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathnature', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathglamour', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathblood', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathholy', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nopathall', 1, 10);
            this.checkPowerOfTwoValues(parsedStatement, commandRange, valueRange, diagnostics, '#dt_aff', 50, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#armor", 0, 1999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#selectarmor", 0, 1999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#copyarmor", 0, 999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#weapon", 0, 3999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#selectweapon", 0, 3999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#copyweapon", 0, 3999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#secondaryeffect", 0, 3999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#secondaryeffectalways", 0, 3999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#restricted", 0, 499);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#nationrebate", 0, 499);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#notfornation", 0, 499);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#nat", 0, 499);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#startitem", 0, 1999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#selectitem", 0, 1999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#copyitem", 0, 1999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#onebattlespell", 0, 1999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#selectspell", 0, 7999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#nextspell", 0, 7999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#selectsite", 0, 3999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#enchrebate50", 0, 101);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#enchrebate25p", 0, 101);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#enchrebate50p", 0, 101);
            this.checkCustomRangeTwoSetsValues(parsedStatement, commandRange, valueRange, diagnostics, "#effect",0, 699, 10000, 10699);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_month", 1 , 12);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_targsight", 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#speedmult", 1, 3);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#localglobal", 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#worldvisible", 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#globallook", 1, 9);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#extramsg', 5, 499);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_nearbythrone', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_thronesite', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#aimagerec', 0, 99);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#holycost', 1, 15);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#norange", 0, 100,false,true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#att", -100, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#look", -1, 9);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#clumsy", 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#falsesupply", 0, 500);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#glamourmanip", 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#godsite", 0, 3999, true);
            this.checkPowerOfTwoValues(parsedStatement, commandRange, valueRange, diagnostics, "#addgeo", 59);
            this.checkPowerOfTwoValues(parsedStatement, commandRange, valueRange, diagnostics, "#remgeo", 59);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#danceweapon", 1, 3999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#dancenratt", 2, 50);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#holyifhit", -20, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#killmagicifhit", -20, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#killdemonifhit", -20, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#holystunifhit", 1, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#petrifyifhit", 1, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#fireifhit", -20, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#coldifhit", -20, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#shockifhit", -20, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#poisonifdmg", -20, 999);
            this.checkValueRangeAndSet(parsedStatement, commandRange, valueRange, diagnostics, "#aftercloud", 1, 7, [1,8,64,512,4096,32768,262144,2097152,16777216])
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#aftercloudarea", 1, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#plaguedoctor", 1, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#notmounted", 1, 2);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#hidedom", 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#growthrecscale", 0, 5);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#deathrecscale", 0, 5);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#orderrecscale", 0, 5);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#chaosrecscale", 0, 5);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_enchnearby", 0, 9999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_targseductions", 0, 500);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_targminkills", 0, 1000);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_targmaxkills", 0, 1000);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_targmaxkills", 0, 1000);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#addseduction", 0, 500);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#addkills", 0, 1000);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_plane", -2, 8);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_godawake", 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_pretismnr", 0, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#req_pretawake", 0, 1);
            this.checkQuotedTextLength(parsedStatement, commandRange, valueRange, diagnostics, "#msg",2399);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, "#icenatprot", -40, 40);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#holyrange', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#sorcerygems', 1, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#elementgems', 1, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#mobilearcher', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#animated', 0, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#domwar', -10, 10);
            this.checkQuotedTextLength(parsedStatement, commandRange, valueRange, diagnostics, "#portent",2399);
            this.checkQuotedTextLength(parsedStatement, commandRange, valueRange, diagnostics, "#cure",2399);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_void', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#onlyfriendlydst', 0, 2);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_kelp', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_gorge', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_deep', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_forestcave', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_deep', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_drip', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_crystal', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#clearvar', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#incvar', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#decvar', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#inc10var', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#dec10var', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#invvar', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#togglevar', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#gemlongevity', 0, 2);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#cavenation', 0, 3);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_minglobals', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_maxglobals', 1, 20);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_varpos', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_varneg', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_varzero', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_varone', -4, 9999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_arenadone ', 0, 1);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_worlditem ', 0, 1999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_noworlditem ', 0, 1999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#dispglobals', 1, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#aiassmod', -100, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#onlysitedst', -1, 1998, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#napbreakrit', -100, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_turnrare', -100, 100);
            this.checkQuotedTextLength(parsedStatement, commandRange, valueRange, diagnostics, "#description", 1999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_targhorrormark', 1, 200);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#templeholypoints', 1, 10);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#mindcollar', 1, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#statstorm', 0, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#statbreak', 0, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_fortid', 1, 16);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#sumhealaffs', 1, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#spikes', 1, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#sleepres', -40, 40);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_school', 0, 7);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_path', 0, 9);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_minresearch', 0, 9);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_pathgems', 1, 999);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#bugshape', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#buguwshape', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#bugswarmshape', -100000, -1000);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#bugswarmuwshape', -100000, -1000);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_targrealmnr', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#req_targnorealmnr', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#plainrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#plaincom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#plainfortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#plainfortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#forestrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#forestcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#forestfortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#forestfortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#mountainrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#mountaincom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#mountainfortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#mountainfortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#swamprec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#swampcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#swampfortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#swampfortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#wasterec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#wastecom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#wastefortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#wastefortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#farmrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#farmcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#farmfortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#farmfortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#caverec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#cavecom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#cavefortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#cavefortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#driprec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#dripcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#dripfortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#dripfortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#coastrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#coastcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#coastfortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#coastfortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#searec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#seacom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#seafortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#seafortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#deeprec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#deepcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#deepfortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#deepfortcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#kelprec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#kelpcom', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#kelpfortrec', 1, 19999, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#kelpfortcom', 1, 19999, true);
            this.checkCustomRangeTwoSetsValues(parsedStatement, commandRange, valueRange, diagnostics, '#worldshape', 1, 19999, -100000, -1000, true);
            this.checkCustomRangeTwoSetsValues(parsedStatement, commandRange, valueRange, diagnostics, '#battleshape', 1, 19999, -100000, -1000, true);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#reclimit ', -2, 100);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#caveinc ', 1, 500);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#caveres ', 1, 500);
            this.checkCustomRangeValues(parsedStatement, commandRange, valueRange, diagnostics, '#caverecpt ', 1, 500);
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
