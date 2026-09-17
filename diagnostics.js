const { moddingCommands, itemMonsterCommands } = require('./moddingCommands');

const vscode = require('vscode');
const fs = require('fs');

class ErrorDiagnosticProvider {
    constructor() {
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

    getNumber(str, allowFloat) {
        // regex : is the entire string a number (decimal allowed)
        if(!/^-?\d+\.?\d*$/.test(str)) {
            // must be number
            return null
        // regex: is the string an integer
        } else if (!allowFloat && !/^-?\d+$/.test(str)) {
            // must be integer
            return null
        } else {
            const num = parseFloat(str)
            if(isNaN(num)) {
                // must be valid number
                return null
            }
            return num
        }
    }

    async analyzeDocument(document, diagnosticCollection) {
        if(!document.uri.fsPath.endsWith('.dm')) {
            return;
        }

        const diagnostics = [];

        const pattern = /(?:^)+#([a-z_\d]+)[ \t]*((?:"[^"]*"))?[ \t]*([^\n]*)\n/gm;
        const statements = document.getText().matchAll(pattern);

        //Refactor all of this to new methods to avoid repeating the same standard values for repeat stuff like range or boost

        const text = document.getText()

        let activeScope = {
            name : "open"
        };

        let scanIndex = 0; // character index of the scan position
        let lineIndex = 0; // character index of the line
        let currentLine = 0;
        let lastCommandRange = null;

        for(const statement of statements) {
            // calculate text ranges to emit diagnostics for
            let startLine = currentLine;
            let startLineIndex = lineIndex;
            while(scanIndex <= statement.index+ statement[0].length) {
                if(text[scanIndex] === '\n') {
                    currentLine++;
                    lineIndex = scanIndex+1;
                }
                scanIndex++;

                if(scanIndex == 1+statement.index) {
                    startLine = currentLine;
                    startLineIndex = lineIndex;
                }
            }
            const offset = 1+statement.index-startLineIndex;
            const commandRange = new vscode.Range(
                new vscode.Position(startLine, offset-1),
                new vscode.Position(startLine, offset + statement[1].length)
            );
            lastCommandRange = commandRange;
            const valueRange = new vscode.Range(
                new vscode.Position(startLine, offset + statement[1].length + 1),
                new vscode.Position(currentLine, scanIndex-lineIndex-1)
            );

            // extract command and params from statement string
            const commandName = statement[1];
            const stringPart = statement[2];
            const withoutComment = statement[3].split("--")[0].trim();

            let statementParams = [];
            if(stringPart) {
                statementParams.push(stringPart);

                if(commandName === "msg") {             
                    activeScope.msgRange = valueRange;

                    const rmatch = stringPart.match(/"[^"]*\[([^\]]+)]"/);
                    if(rmatch) {
                        activeScope.sitename = rmatch[1];
                    }
                }
            }
            if(withoutComment.length > 0) {                
                for(const part of withoutComment.split(" ")) {
                    statementParams.push(part.trim());
                }
            }

            if(commandName === "end") {
                if(activeScope.requireSitename && activeScope.sitename === undefined) {    
                    const diagnostic = new vscode.Diagnostic(
                        activeScope.msgRange ? activeScope.msgRange : activeScope.requireSitename.errorRange,
                        `${activeScope.requireSitename.commandName}: Command requires a sitename to be specified at the end of the #msg.`,
                        vscode.DiagnosticSeverity.Error);
                    diagnostics.push(diagnostic);
                }
                
                activeScope = { name : "open" };
                continue;
            }

            const command = (activeScope.name === "item" && itemMonsterCommands.has(commandName)) ? moddingCommands["monster"][commandName] : moddingCommands[activeScope.name][commandName];
            if(!command) {
                const diagnostic = new vscode.Diagnostic(commandRange, `${commandName}: Command not recognised for <${activeScope.name}> scope.`, vscode.DiagnosticSeverity.Error);
                diagnostics.push(diagnostic);
            } else {
                if(command.startScope) {
                    activeScope = { name : command.startScope };
                }

                if(command.requireSitename) {
                    activeScope.requireSitename = {
                        errorRange : commandRange,
                        commandName : commandName
                    };
                }

                if(!command.parameters) {
                    if(statementParams.length > 0) {
                        const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}: Command does not accept a parameter.`, vscode.DiagnosticSeverity.Error);
                        diagnostics.push(diagnostic);
                    }
                } else {
                    if(command.parameters.length < statementParams.length) {
                        const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}: Command only accepts ${command.parameters.length} parameters (found ${statementParams.length}).`, vscode.DiagnosticSeverity.Error);
                        diagnostics.push(diagnostic);
                    }

                    for(let j=0; j<command.parameters.length; j++) {
                        const param = command.parameters[j]
                        const paramArg = statementParams[j]
                        
                        if(paramArg === undefined || paramArg === "") {
                            if(!param.optional) {
                                const diagnostic = new vscode.Diagnostic(commandRange, `${commandName}, Parameter ${j+1}: Missing required parameter.`, vscode.DiagnosticSeverity.Error);
                                diagnostics.push(diagnostic);
                            }
                            continue;
                        }
                        
                        const paramNum = this.getNumber(paramArg, param.allowFloat);

                        if(paramNum === null) {
                            // is a string
                            if(!param.allowString) { 
                                if(param.allowFloat) {                          
                                    const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Must be a floating point number.`, vscode.DiagnosticSeverity.Error);
                                    diagnostics.push(diagnostic);
                                    continue;
                                } else {                          
                                    const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Must be an integer. ${paramArg}`, vscode.DiagnosticSeverity.Error);
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
                        } else {
                            // is not a string
                            if(param.expectString) {              
                                const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Must be a string.`, vscode.DiagnosticSeverity.Error);
                                diagnostics.push(diagnostic);
                                continue;
                            }

                            if(param.fixedValues && param.range) {
                                if((paramNum < param.range[0] || paramNum > param.range[1]) && !param.fixedValues.includes(paramNum)) {
                                    const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Value (${paramArg}) must fall in the inclusive range ${param.range[0]} - ${param.range[1]} OR be one of ${param.fixedValues.join(', ')}.`, vscode.DiagnosticSeverity.Error);
                                    diagnostics.push(diagnostic);
                                    continue;
                                }
                            } else if(param.fixedValues) {
                                if(!param.fixedValues.includes(paramNum)) {
                                    const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Value (${paramArg}) must be one of ${param.fixedValues.join(', ')}.`, vscode.DiagnosticSeverity.Error);
                                    diagnostics.push(diagnostic);
                                    continue;
                                }
                            } else if(param.range) {
                                // special handling for multiranges              
                                if(param.range.length > 2) {
                                    let rangeError = `${commandName}, Parameter ${j+1}: Value (${paramArg}) must fall in one of the inclusive ranges:`
                                    let valid = false;
                                    for(let iRange =0; iRange<param.range.length; iRange+=2) {
                                        if(paramNum >= param.range[iRange] && paramNum <= param.range[iRange+1]) {
                                            valid = true;
                                            break;
                                        }
                                        rangeError += ` ${param.range[iRange]} to ${param.range[iRange+1]}`;
                                        rangeError += (iRange == param.range.length-2 ? "." : ";");
                                    }
                                    if(!valid) {
                                        const diagnostic = new vscode.Diagnostic(valueRange, rangeError, vscode.DiagnosticSeverity.Error);
                                        diagnostics.push(diagnostic);
                                    }
                                } else if(paramNum < param.range[0] || paramNum > param.range[1]) {                                
                                    const diagnostic = new vscode.Diagnostic(valueRange, `${commandName}, Parameter ${j+1}: Value (${paramArg}) must fall in the inclusive range ${param.range[0]} to ${param.range[1]}.`, vscode.DiagnosticSeverity.Error);
                                    diagnostics.push(diagnostic);
                                    continue;
                                }
                            }
                            if(param.bitmask) {
                                //TODO
                            }
                        }
                    }
                }
            }
        }        
            
        if(activeScope.name !== "open") {
            const diagnostic = new vscode.Diagnostic(
                    lastCommandRange,
                    `Scope <${activeScope.name}> should be closed with #end before the end of the file.`,
                    vscode.DiagnosticSeverity.Error);
                diagnostics.push(diagnostic);
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
    
        const diagnosticCollection = vscode.languages.createDiagnosticCollection('dominionsmod');
    
        vscode.workspace.onDidOpenTextDocument(document => this.analyzeDocument(document, diagnosticCollection), this, context.subscriptions);
        vscode.workspace.onDidChangeTextDocument(event => this.analyzeDocument(event.document, diagnosticCollection), this, context.subscriptions);
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
