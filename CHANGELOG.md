# Change Log

All notable changes to the "dominions-mod-support" extension will be documented in this file.

## [1.0]

- Initial release

### [1.0.1]

Added hover details for unit, spell, item, site, ench ids. 

### [1.1.0]

Added diagnostics and some error correction. As well as a lot of strcutural changes to improve maintainability long term. 

### [1.1.1]

Fixed bug with float numbers diagnostics not ignoring strings and comments. 

### [2.0.0]

Updated to support d6 commands
Added more diagnostic checks
Added better snippets support loading and displaying some associated tables. 

### [2.0.1]

Added Bless modding commands

### [2.0.2]

Added #end check for bless modding

### [2.0.3]

Added addtional missing d6 commands and added addtional hover tables and value results

### [2.0.4]

Fixed some broken diagnostics

### [2.0.5]

Added more commands. Thanks everyone who points these out. 

### [2.0.6]

Added more commands. Thanks everyone who points these out. 

### [2.0.7]

Caught up to dom version 6.24
Added before but forgot to make a note, support for hotkey commenting. Ctrl-K to comment a selected text, Shift-Ctrl-K to uncomment.
Added a bunch more error diagnostics. If there's a particular error that catches you a lot and I'm not checking for it, let me know and I'll add it in.  

### [2.0.8]

Ignore files that don't end with .dm (resolves problem with reporting problems in VScode generated .dm.git files)
Refactor diagnostic parser to improve performance, maintainability and resolve some false positive errors
Improve parser to understand multiline string parameters
Add error for when an event command requires a site name to be specified in the #msg
Extend validation to cover all modding commands
Using a nonexistent command is an error
Using a command outside of its intended scope is an error
Add an inline bitmask editor (currently supported spec, spec2, startingaff, all terrain bitmasks, custommagic)
Add tables for #spec, #spec2 and custommagic bitmasks
Fix incorrect snippet adding an #end command after #newdom