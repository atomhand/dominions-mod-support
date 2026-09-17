const vscode = require('vscode');
const fs = require('fs');


class HoverProvider {
    constructor() {
        this.commandJson = {};
    }

    separateCommand(inputString) {
        const pattern = /#(\S+(?:\s+\S+)*)/;
        const match = inputString.match(pattern);
        return match ? match[1].split(/\s+/) : [null];
    }
    
    
    

    async loadJson(filename) {
        try {
            const data = await fs.promises.readFile(filename, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData
          } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
          }
    }

    async replaceCommand(uri, position, commandName, value) {
        // capture group 1 -- command name
        // capture group 2 -- previous value
        // capture group 3 -- remaining params/comment
        const doc = await vscode.workspace.openTextDocument(uri);
        const line = doc.lineAt(position.line);
        const paramsMatch = line.text.match(/^(#[^\s-]+)([ \t]+-?[^\s"-]* ?)?([^\n]*)/);
        
        const edit = new vscode.WorkspaceEdit();

        edit.replace(uri, line.range, `${paramsMatch[1]} ${value}${paramsMatch[3].length>0 ? " " : ""}${paramsMatch[3]}`);
        await vscode.workspace.applyEdit(edit);

        const editor = vscode.window.activeTextEditor;
        editor.selection = new vscode.Selection(position, position);
        await vscode.commands.executeCommand('editor.action.hideHover');
        await vscode.commands.executeCommand('editor.action.showHover');
    }


    generateBitmaskSelectorTable(data, bitmask, customMessage, uri, position, commandName) {
        // Check if the data is an array
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
            // Extract the headers from the first object
            const headers = Object.keys(data[0]);
            const bitHeader = headers[0];

            // Generate rows for each object using the extracted headers
            const tableRows = data.map(
                datarow => {
                    const bit = BigInt(datarow[bitHeader]);
                    const bitSet = bit & bitmask;
                    //const args = [{ uri : uri}, {line: line}, {commandName : "testcommandName"}, {value : String(bitSet ? bitmask - bit : bitmask + bit)}];
                    const args = [ uri, position, commandName, String(bitSet ? bitmask - bit : bitmask + bit)];
                    const toggleCommand = vscode.Uri.parse(
                        `command:bitmaskSelector.replace?${encodeURIComponent(JSON.stringify(args))}`
                    );

                    const toggleButton = bit == 0 ? 
                    bitmask == 0 ? "✅": "🔲"
                    :`[${bitSet ? "✅": "🔲"}](${toggleCommand})`;

                    return `| ${toggleButton} | ${headers.map(header => datarow[header] || "").join(' | ')} |`
                }
            ).join('\n');
    
            // Combine the header and rows to form the table content
            const tableContent = ` | On | ${headers.join(' | ')} |\n| ${headers.map(() => ':---:').join(' | ')} |:---:|\n${tableRows}`;
    
            // Check if the custom message is not empty, then include it before the table
            return new vscode.MarkdownString(customMessage ? `${customMessage}\n\n${tableContent}` : tableContent); 
        } else {
            // Handle other cases, such as invalid input
            return new vscode.MarkdownString('Invalid input data.');
        }
    }

    generateMarkdownTable(data, customMessage = "") {
        // Check if the data is an array
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
            // Extract the headers from the first object
            const headers = Object.keys(data[0]);
    
            // Generate rows for each object using the extracted headers
            const tableRows = data.map(obj => `| ${headers.map(header => obj[header] || "").join(' | ')} |`).join('\n');
    
            // Combine the header and rows to form the table content
            const tableContent = `| ${headers.join(' | ')} |\n| ${headers.map(() => ':---:').join(' | ')} |\n${tableRows}`;
    
            // Check if the custom message is not empty, then include it before the table
            return customMessage ? `${customMessage}\n\n${tableContent}` : tableContent;
        } else if (typeof data === 'object') {
            // If it's a single object, use the provided template
            const tableHeader = '| Property | Value |\n|:--------:|:-----:|';
            const tableRow = Object.entries(data)
                .filter(([prop, val]) => val !== "") // Skip rows where the value is blank (empty string)
                .map(([prop, val]) => `| ${prop} | ${val} |`)
                .join('\n');
            const tableContent = `${tableHeader}\n${tableRow}`;
    
            // Check if the custom message is not empty, then include it before the table
            return customMessage ? `${customMessage}\n\n${tableContent}` : tableContent;
        } else {
            // Handle other cases, such as invalid input
            return 'Invalid input data.';
        }
    }

    generateHoverTableContent(matchedValue, customMessage) {
        const markdownTable = this.generateMarkdownTable(matchedValue);
        const markdownContent = customMessage ? `${customMessage}\n\n${markdownTable}` : markdownTable;
        return new vscode.Hover(new vscode.MarkdownString(markdownContent, true));
    }
    


    async activate(context) {
        vscode.commands.registerCommand(
            'bitmaskSelector.replace',
            async (uri, line, commandName, value) => {
                await this.replaceCommand(uri, line, commandName,value);
            }
        );
        
        console.log('Hover provider active');

        this.commandJson = await this.loadJson(context.asAbsolutePath('/json/commands.json'));

        vscode.languages.registerHoverProvider('dominionsmod', {
            provideHover: async (document, position, token) => {

                const diagnostics = vscode.languages.getDiagnostics(document.uri);

                const shouldDisableHover = diagnostics.some(diagnostic => diagnostic.range.contains(position) && diagnostic.code !== 'show-hover');

                if (shouldDisableHover) {
                return null; // Disable hover if there's an error at the current position and code is not 'show-hover'
                }

    
                const range = document.getWordRangeAtPosition(position);
                const word = document.getText(range);
                const line = document.lineAt(position.line).text;
                const command = this.separateCommand(line);
    
                console.log('Hovered command', command[0]);
                console.log('Hovered value', command[1]); // fix this for multivalue commands
                console.log('Hovered Word', word);

                const commandIsHovered = command[0] == word;
                
    
                const nationcmds = ["restricted", "nationrebate", "notfornation", "nat", "selectnation","extramsg"]
                const unitcmds = ["selectmonster","copystats", "copyspr", "monpresentrec","ownsmonrec","raiseshape","shapechange","prophetshape","firstshape","secondshape","secondtmpshape","forestshape","plainshape","foreignshape","homeshape","domshape","notdomshape","springshape","summershape","autumnshape","wintershape","landshape","watershape","twiceborn","domsummon","domsummon2","domsummon20","raredomsummon","templetrainer","makemonsters1","makemonsters2","makemonsters3","makemonsters4","makemonsters5","summon1","summon2","summon3","summon4","summon5","battlesum1", "battlesum2","battlesum3", "battlesum4", "battlesum5","batstartsum1","batstartsum2","batstartsum3","batstartsum4","batstartsum5","batstartsum1d3","batstartsum1d6","batstartsum2d6","batstartsum3d6","batstartsum4d6","batstartsum5d6","batstartsum6d6","batstartsum7d6","batstartsum8d6","batstartsum9d6","slaver","farsumcom","onlymnr","notmnr","homemon","homecom","mon","com","natmon","natcom","summon","summonlvl2","summonlvl3","summonlvl4","wallcom","wallunit","uwwallunit","uwwallcom","startcom","coastcom1","coastcom2","addforeignunit", "addforeigncom","forestrec", "mountainrec", "swamprec","wasterec","caverec","coastrec","startscout","forestcom","mountaincom","swampcom","wastecom","cavecom","coastcom","startunittype1","startunittype2","addrecunit","addreccom","uwrec","uwcom","coastunit1","coastunit2","coastunit3","landrec","landcom","hero1","hero2","hero3","hero4","hero5","hero6","hero7","hero8","hero9","hero10","multihero1","multihero2","multihero3","multihero4","multihero5","multihero6","multihero7","defcom1","defcom2","defunit1", "defunit1b","defunit1c", "defunit1d", "defunit2","defunit2b","delgod","cheapgod20","cheapgod40","plainrec","plaincom","plainfortrec","plainfortcom","bugshape","buguwshape","bugswarmshape","bugswarmuwshape","animated","worldshape","worldshape"]
                const itemcmds = ["startitem","selectitem","copyitem"]
                const spellcmds = ["onebattlespell", "selectspell","nextspell"]
                const sitescmds = ["selectsite", "newsite"]
                const enchtcmds = ["enchrebate50", "enchrebate25p", "enchrebate50p",]
                const affcmds = ["dt_aff","startingaff"]
                const weaponscmds = ["weapon","selectweapon","copyweapon","secondaryeffect","secondaryeffectalways"]
                const armorcmds = ["armor","selectarmor","copyarmor"]
                const assassincmds = ["assencloc"] // TEST FROM HERE DOWNWARDS
                const magicpathcmds = ["gems","templegems","pathlevel","req_path"]
                const sitelocationcmds = ["loc"]
                const realmcmds = ["homerealm"]
                const itemslotscmds = ["itemslots"]
                const scalecmds = ["incscale","decscale"]
                const templepiccmds = ["templepic"]
                const forttypecmds = ["homefort","buildfort","builduwfort","buildcoastfort", "req_fortid"]
                const magicschoolcmds = ["school", "req_school"]
                const spelleffectscmds =["effect"] // effects_info.csv
                const terrainmaskcmds = ["nextingeo","likesterr","hatesterr","onlygeosrc","nogeosrc","nogeodst","addgeo","remgeo"]
                const eramaskcmds = ["eramask"] // technically a mask but presolved
                const enchlookcmds = ["globallook"]
                const cloudtypecmds = ["aftercloud"]

                const descriptionObj = this.commandJson.find(obj => obj["CommandName"] === command[0]);
                const description = descriptionObj ? descriptionObj.description : "No description found for command.";

                // BIT MASKS

                let isBitmask = false;
                let tableData = null;
                if(command[0] === "spec") {
                    tableData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/specMask.json'));
                    isBitmask = true;
                } else if(command[0] === "spec2") {
                    tableData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/spec2Mask.json'));
                    isBitmask = true;
                } else if(command[0] === "custommagic") {
                    tableData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/magicPathBitmask.json'));
                    isBitmask = true;
                } else if (affcmds.some(cmd => cmd === command[0])) {
                    tableData = await this.loadJson(context.asAbsolutePath('/json/afflictions.json'));
                    isBitmask = true;
                } else if (terrainmaskcmds.some(cmd => cmd === command[0])) {
                    tableData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/terrainMask.json'));
                    isBitmask = true;
                }
                else if (sitelocationcmds.some(cmd => cmd === command[0])) {
                    tableData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/siteTerrainBitmask.json'));
                    isBitmask = true;
                }

                if(isBitmask) {
                    const table = this.generateBitmaskSelectorTable(tableData, BigInt(command[1]), description, document.uri, position, command[0]);
                    table.isTrusted = true;
                    return new vscode.Hover(table);
                }


                if (nationcmds.some(cmd => cmd === command[0])) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/nations.json'));
                    if (!commandIsHovered) {
                        const keyToFind = "id";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }
                else if (unitcmds.some(cmd => cmd === command[0]) && !commandIsHovered) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/BaseU.json'));
                    const keyToFind = "id";
                    const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
    
                    if (matchedValue) {
                        const customMessage = null;
            
                        // Call the function to generate the hover content
                        return this.generateHoverTableContent(matchedValue, customMessage);
                    }
                }
    
                else if (itemcmds.some(cmd => cmd === command[0]) && !commandIsHovered) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/BaseI.json'));
                    const keyToFind = "id";
                    const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
    
                    if (matchedValue) {
                        const customMessage = null;
            
                        // Call the function to generate the hover content
                        return this.generateHoverTableContent(matchedValue, customMessage);
                    }
                }
    
                else if (spellcmds.some(cmd => cmd === command[0]) && !commandIsHovered) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/spells.json'));
                    const keyToFind = "id";
                    const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
    
                    if (matchedValue) {
                        const customMessage = null;
            
                        // Call the function to generate the hover content
                        return this.generateHoverTableContent(matchedValue, customMessage);
                    }
                }
    
                else if (sitescmds.some(cmd => cmd === command[0]) && !commandIsHovered) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/MagicSites.json'));
                    const keyToFind = "id";
                    const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
    
                    if (matchedValue) {
                        const customMessage = null;
            
                        // Call the function to generate the hover content
                        return this.generateHoverTableContent(matchedValue, customMessage);
                    }
                }
    
                else if (enchtcmds.some(cmd => cmd === command[0]) && !commandIsHovered) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/enchantments.json'));
                    const keyToFind = "number";
                    const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
    
                    if (matchedValue) {
                        const customMessage = null;
            
                        // Call the function to generate the hover content
                        return this.generateHoverTableContent(matchedValue, customMessage);
                    }
                }

                else if (enchlookcmds.some(cmd => cmd === command[0])) {

                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/enchlook.json'));
                
                    if (!commandIsHovered) {
                        const keyToFind = "Nbr";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }

                
                }

                /* else if (enchlookcmds.some(cmd => cmd === command[0]) && !commandIsHovered) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/enchlook.json'));
                    const keyToFind = "nbr";
                    const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
    
                    if (matchedValue) {
                        const customMessage = null;
            
                        // Call the function to generate the hover content
                        return this.generateHoverTableContent(matchedValue, customMessage);
                    }
                } */

                else if (weaponscmds.some(cmd => cmd === command[0]) && !commandIsHovered) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/weapons.json'));
                    const keyToFind = "id";
                    const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
    
                    if (matchedValue) {
                        const customMessage = null;
            
                        // Call the function to generate the hover content
                        return this.generateHoverTableContent(matchedValue, customMessage);
                    }
                }

                else if (armorcmds.some(cmd => cmd === command[0]) && !commandIsHovered) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/armors.json'));
                    const keyToFind = "id";
                    const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
    
                    if (matchedValue) {
                        const customMessage = null;
            
                        // Call the function to generate the hover content
                        return this.generateHoverTableContent(matchedValue, customMessage);
                    }
                }
                
                else if (assassincmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/assassin_locations.json'));

                    if (!commandIsHovered) {
                        const keyToFind = "id";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }

                else if (magicpathcmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/monsterMagicPaths.json'));

                    if (!commandIsHovered && word == command[1]) {
                        const keyToFind = "Nbr";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }

                else if (realmcmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/homeRealms.json'));

                    if (!commandIsHovered) {
                        const keyToFind = "Nbr";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }

                else if (itemslotscmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/itemSlotBitmask.json'));
                
                    if (!commandIsHovered) {
                        const keyToFind = "Mask";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
                
                        if (matchedValue) {
                            const customMessage = null;
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        } else {
                            // Handle the case when matchedValue is not found
                            return new vscode.Hover({
                                language: "English",
                                value: "Need to add bitmask decoder"
                            });
                        }
                    } else {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                
                        if (secondValue) {
                            return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }
                
                else if (scalecmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/scaleValues.json'));

                    if (!commandIsHovered) {
                        const keyToFind = "Nbr";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }                

                else if (templepiccmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/templePic.json'));

                    if (!commandIsHovered) {
                        const keyToFind = "Nbr";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }

                else if (forttypecmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/fortTypes.json'));

                    if (!commandIsHovered) {
                        const keyToFind = "Fort nbr";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }

                else if (magicschoolcmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/magicSchools.json'));

                    if (!commandIsHovered) {
                        const keyToFind = "Nbr";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }

                else if (spelleffectscmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/effects_info.json'));

                    if (!commandIsHovered) {
                        const keyToFind = "number";
                        // Convert the word string to a number
                        let numberValue = parseFloat(word);
                    
                        // Subtract 10000 if the value is over 10000
                        if (numberValue > 10000) {
                            numberValue -= 10000;
                        }
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === numberValue.toString());
                        if (matchedValue) {   

                            const customMessage = null;
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);

                        }
                    }
                    
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }

                else if (eramaskcmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/eraMask.json'));

                    if (!commandIsHovered) {
                        const keyToFind = "Mask";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }

                else if (unitcmds.some(cmd => cmd === command[0]) && !commandIsHovered) {
                
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/BaseU.json'));
                    const keyToFind = "id";
                    const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
    
                    if (matchedValue) {
                        const customMessage = null;
            
                        // Call the function to generate the hover content
                        return this.generateHoverTableContent(matchedValue, customMessage);
                    }
                }

                else if (cloudtypecmds.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/cloudType.json'));

                    if (word == command[2]) {
                        const keyToFind = "id";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === parseInt(word));
                        console.log('Matched Value', matchedValue);
                        
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }



                else if (word != null) {
                        const matchedValue = this.commandJson.find(obj => obj["CommandName"] === word);
                    
                        if(matchedValue) {                            
                            return new vscode.Hover({
                                language: "English",
                                value: matchedValue.description
                                });
                        }
                    }

                else {
                }
                /*
                else if (_____.some(cmd => cmd === command[0])) {
                    const jsonData = await this.loadJson(context.asAbsolutePath('/json/Hover_Tables/_____.json'));

                    if (!commandIsHovered) {
                        const keyToFind = "id";
                        const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
        
                        if (matchedValue) {
                            const customMessage = null;
                
                            // Call the function to generate the hover content
                            return this.generateHoverTableContent(matchedValue, customMessage);
                        }
                    }
                    
                    else if (commandIsHovered) {
                        const firstValue = this.commandJson.find(obj => obj["CommandName"] === word);
                        const secondValue = this.generateMarkdownTable(jsonData);
                        
                        if (secondValue){
                            
                        return this.generateHoverTableContent(jsonData, firstValue.description);
                        }
                    }
                }
*/
           }
       });
    }

    deactivate() {   
    }
}

module.exports = HoverProvider;

