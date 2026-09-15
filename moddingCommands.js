
const monsterParamsAcceptMontag ={
                    allowString : true,
                    range : [-100000,19999]
                };
const monsterParamsNoMontag ={
                    allowString : true,
                    range : [0,19999]
                };
const nameParam = {
                    allowString : true,
                    expectString : true
                };

// TODO -- Validate that the path exists
const pathParam = {
                    allowString : true,
                    expectString : true
                };
const nationNbr ={
                    range : [0,500]
                };
                
const poptypeNbr ={
                    range : [0,500]
                };


const moddingCommands = {
    "open": {
        // mod info
        "modname": {
            parameters: [
                nameParam
            ]
        },
        "description": {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "icon": {
            parameters: [
                pathParam
            ]
        },
        "version": {
            parameters: [
                {
                    allowFloat : true
                }
            ]
        },
        "domversion": {
            parameters: [
                {
                    allowFloat : true
                }
            ]
        },
        "selectweapon": {
            startScope: "weapon",
            parameters: [
                {
                    allowString : true,
                    range: [0,3999]
                }
            ]
        },
        "newweapon": {
            startScope: "weapon",
            parameters: [
                {
                    // bitmask : true
                    // fixedValues : []
                    // allowString : true,
                    // expectString : true,
                    // maxStringLength : X
                    // optional : true,
                    range: [1000,3999]
                }
            ]
        },
        "selectarmor": {
            startScope: "armor",
            parameters: [
                {
                    allowString : true,
                    range: [0,999]
                }
            ]
        },
        "newarmor": {
            startScope: "armor",
            parameters: [
                {
                    range: [400,999]
                }
            ]
        },
        "selectmonster": {
            startScope: "monster",
            parameters: [
                {
                    allowString : true,
                    range: [0,19999]
                }
            ]
        },
        "newmonster": {
            startScope: "monster",
            parameters: [
                {
                    range: [5000,19999]
                }
            ]
        },
        "selectnametype": {
            startScope: "nametype",
            parameters: [
                {
                    range: [100,399]
                }
            ]
        },
        "selectbless": {
            startScope: "bless",
            parameters: [
                {
                    allowString : true,
                    range: [0,9999] // TODO
                }
            ]
        },
        "selectsound": {
            startScope: "sound",
            parameters: [
                {
                    range: [0,248]
                }
            ]
        },        
        "selectsite": {
            startScope: "site",
            parameters: [
                {
                    allowString : true,
                    range: [0,3999]
                }
            ]
        },
        "newsite": {
            startScope: "site",
            parameters: [
                {
                    range: [1700,3999]
                }
            ]
        },
        "indepflag": {
            parameters: [
                pathParam
            ]
        },
        "selectnation":{
            startScope: "nation",
            parameters: [
                nationNbr
            ]
        },
        "newnation":{
            startScope: "nation",
        },
        "disableoldnations" : {
        },
        "clearallspells" : {
        },
        "selectspell": {
            startScope: "spell",
            parameters: [
                {
                    allowString : true,
                    range: [0,3999]
                }
            ]
        },
        "newspell": {
            startScope: "spell",
        },        
    },
    "sound" : {
        "sample": {
            parameters: [
                pathParam
            ]
        },
        "smpmode": {
            parameters: [
                {
                    range: [0,5]
                }
            ]
        },
        "loop": {
            parameters: [
                {
                    allowString : true,
                    range: [-5,248]
                }
            ]
        },
    },
    "weapon" : {
        "name" : {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "clear" : {},
        "copyweapon": {
            parameters: [
                {
                    allowString : true,
                    range: [0,3999]
                }
            ]
        },
        "dmg": {
            parameters: [
                {
                    range: [-100,18014398509481984n]
                }
            ]
        },
        "nratt": {
            parameters: [
                {
                    range: [-3,100]
                }
            ]
        },
        "att": {
            parameters: [
                {
                    range: [-100,100]
                }
            ]
        },
        "def": {
            parameters: [
                {
                    range: [-100,100]
                }
            ]
        },
        "len": {
            parameters: [
                {
                    range: [0,5]
                }
            ]
        },
        "twohanded": {
        },
        "sound": {
            parameters: [
                {
                    range: [0,248]
                }
            ]
        },
        "range": {
            parameters: [
                {
                    range: [-5,200]
                }
            ]
        },
        "ammo": {
            parameters: [
                {
                    range: [1,1100]
                }
            ]
        },
        "rcost": {
            parameters: [
                {
                    range: [0,100]
                }
            ]
        },
        "sample": {
            parameters: [
                pathParam
            ]
        },
        "natural": {
        },
        "dt_normal": {
        },
        "dt_poison": {
        },
        "dt_demon": {
        },
        "dt_small": {
        },
        "dt_magic": {
        },
        "dt_large": {
        },
        "dt_constructonly": {
        },
        "dt_raise": {
        },
        "dt_cap": {
        },
        "dt_weakness": {
        },
        "dt_holy": {
        },
        "dt_drain": {
        },
        "dt_sizestun": {
        },
        "dt_weapondrain": {
        },
        "dt_stun": {
        },
        "dt_realstun": {
        },
        "dt_interrupt": {
        },
        "dt_bouncekill": {
        },
        "dt_paralyze": {
        },
        "dt_aff": {
        },
        "poison": {
        },
        "acid": {
        },
        "slash": {
        },
        "pierce": {
        },
        "blunt": {
        },
        "cold": {
        },
        "fire": {
        },
        "shock": {
        },
        "magic": {
        },
        "armorpiercing": {
        },
        "armornegating": {
        },
        "nostr": {
        },
        "bowstr": {
        },
        "thirdstr": {
        },
        "halfstr": {
        },
        "fullstr": {
        },
        "mrnegates": {
        },
        "mrnegateseasily": {
        },
        "hardmrneg": {
        },
        "mrhalf": {
        },
        "sizeresist": {
        },
        "mind": {
        },
        "undeadimmune": {
        },
        "inanimateimmune": {
        },
        "flyingimmune": {
        },
        "enemyimmune": {
        },
        "friendlyimmune": {
        },
        "undeadonly": {
        },
        "sacredonly": {
        },
        "demononly": {
        },
        "demonundead": {
        },
        "magiconly": {
        },
        "internal": {
        },
        "spiritformimmune": {
        },
        "illusionsimmune": {
        },
        "false": {
        },
        "defroll": {
        },
        "morrol": {
        },
        "aoe": {
            parameters: [
                {
                    range: [0,100]
                }
            ]
        },
        "bonus": {
        },                
        "secondaryeffect": {
            parameters: [
                {
                    range: [0,3999],
                    allowString : true,
                }
            ]
        },
        "secondaryeffectalways": {
            parameters: [
                {
                    range: [0,3999],
                    allowString : true,
                }
            ]
        },
        "ironweapon": {
        },
        "woodenweapon": {
        },
        "iceweapon": {
        },
        "charge": {
        },
        "flail": {
        },
        "norepel": {
        },
        "unrepel": {
        },
        "beam": {
        },
        "range050": {
        },
        "range0": {
        },
        "melee50": {
        },
        "skip": {
        },
        "skip2": {
        },
        "explspr": {
            parameters: [
                {
                    range: [10001,10317],
                    fixedValues: [-1]
                }
            ]
        },
        "flyspr": {
            parameters: [
                {
                    range: [-1,10400],
                },
                {
                    range: [1,1000],
                }
            ]
        },
        "speedmult": {
            parameters: [
                {
                    range: [1,3],
                }
            ]
        },
        "uwok": {
        },
        "nouw": {
        },
        "notmounted": {
            parameters: [
                {
                    range: [1,2],
                }
            ]
        },
        "notdismounted": {
        },
        "holyifhit": {
            parameters: [
                {
                    range: [0,999],
                }
            ]
        },
        "killmagicifhit": {
            parameters: [
                {
                    range: [0,999],
                }
            ]
        },
        "holystunifhit": {
            parameters: [
                {
                    range: [0,999],
                }
            ]
        },
        "petrifyifhit": {
            parameters: [
                {
                    range: [0,999],
                }
            ]
        },
        "fireifhit": {
            parameters: [
                {
                    range: [0,999],
                }
            ]
        },
        "coldifhit": {
            parameters: [
                {
                    range: [0,999],
                }
            ]
        },
        "shockifhit": {
            parameters: [
                {
                    range: [0,999],
                }
            ]
        },
        "poisonifdmg": {
            parameters: [
                {
                    range: [0,999],
                }
            ]
        },
        "aftercloud": {
            parameters: [
                {
                    range: [0,999],
                },
                {
                    fixedValues: [1,8,64,512,4096,32768,262144,2097152,16777216,134217728],
                },
            ]
        },
        "aftercloudarea": {
            parameters: [
                {
                    range: [1,100],
                }
            ]
        },
    },
    "monster" : {
        "name": {
            parameters: [
                nameParam
            ]
        },
        "fixedname": {
            parameters: [
                nameParam
            ]
        },
        "descr": {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                    maxStringLength : 1999
                }
            ]
        },
        "spr1": {
            parameters: [
                pathParam
            ]
        },
        "spr2": {
            parameters: [
                pathParam
            ]
        },
        "speciallook": {
            parameters: [
                {
                    range: [100,199],
                    fixedValues: [1,2,3]
                }
            ]
        },
        "drawsize": {
            parameters: [
                {
                    range: [-99,100],
                }
            ]
        },
        "clear": {
        },
        "clearweapons": {
        },
        "cleararmor": {
        },
        "clearmagic": {
        },
        "clearspec": {
        },
        "copystats": {                    
            parameters: [
                {
                    range: [0,19999]
                }
            ]
        },
        "copyspr": {                    
            parameters: [
                {
                    range: [0,19999]
                }
            ]
        },
        "pathcost": {
            parameters: [
                {
                    range: [0,999]
                }
            ]
        },
        "startdom": {
            parameters: [
                {
                    range: [1,4]
                }
            ]
        },
        "homerealm": {
            parameters: [
                {
                    range: [1,10]
                }
            ]
        },
        "gcost": {
            parameters: [
                {
                    range: [0,20000]
                }
            ]
        },
        "triplegod": {
            parameters: [
                {
                    range: [1,5]
                }
            ]
        },
        "triplegodmag": {
            parameters: [
                {
                    range: [0,10]
                }
            ]
        },
        "unify": {
        },
        "triple3mon": {
        },
        "minprison": {
            parameters: [
                {
                    range: [0,2]
                }
            ]
        },
        "maxprison": {
            parameters: [
                {
                    range: [0,2]
                }
            ]
        },
        "godsite": {
            parameters: [
                {
                    allowString : true,
                    range: [0,9999]
                }
            ]
        },
        "moreorder": {
            parameters: [
                {
                    range: [-5,5]
                }
            ]
        },
        "moreprod": {
            parameters: [
                {
                    range: [-5,5]
                }
            ]
        },
        "moreheat": {
            parameters: [
                {
                    range: [-5,5]
                }
            ]
        },
        "moregrowth": {
            parameters: [
                {
                    range: [-5,5]
                }
            ]
        },
        "moreluck": {
            parameters: [
                {
                    range: [-5,5]
                }
            ]
        },
        "moremagic": {
            parameters: [
                {
                    range: [-5,5]
                }
            ]
        },
        "slowrec": {
        },
        "noslowrec": {
        },
        "reclimit": {
            parameters: [
                {
                    range: [-2,100]
                }
            ]
        },
        "enchrebate10": {
            parameters: [
                {
                    range: [0,9999]
                }
            ]
        },
        "enchrebate20": {
            parameters: [
                {
                    range: [0,9999]
                }
            ]
        },
        "enchrebate50": {
            parameters: [
                {
                    range: [0,9999]
                }
            ]
        },
        "enchrebate75": {
            parameters: [
                {
                    range: [0,9999]
                }
            ]
        },
        "enchrebate100": {
            parameters: [
                {
                    range: [0,9999]
                }
            ]
        },
        "enchrebate25p": {
            parameters: [
                {
                    range: [0,9999]
                }
            ]
        },
        "enchrebate50p": {
            parameters: [
                {
                    range: [0,9999]
                }
            ]
        },
        "reqlab" : {                    
        },
        "noreqlab" : {                    
        },
        "reqtemple" : {                    
        },
        "noreqtemple" : {                    
        },
        "chaosrec": {
            parameters: [
                {
                    range: [0,500]
                }
            ]
        },
        "deathrec": {
            parameters: [
                {
                    range: [0,500]
                }
            ]
        },
        "aisinglerec" : {                    
        },
        "ainorec" : {                    
        },
        "monpresentrec": {
            parameters: [
                {
                    range: [0,19999],
                    allowString : true,
                }
            ]
        },
        "ownsmonrec": {
            parameters: [
                {
                    range: [0,19999],
                    allowString : true,
                }
            ]
        },
        "domrec": {
            parameters: [
                {
                    range: [1,10],
                }
            ]
        },
        "heatrecscale": {
            parameters: [
                {
                    range: [-5,5],
                }
            ]
        },
        "coldrecscale": {
            parameters: [
                {
                    range: [-5,5],
                }
            ]
        },
        "growthrecscale": {
            parameters: [
                {
                    range: [-5,5],
                }
            ]
        },
        "deathrecscale": {
            parameters: [
                {
                    range: [-5,5],
                }
            ]
        },
        "orderrecscale": {
            parameters: [
                {
                    range: [-5,5],
                }
            ]
        },
        "chaosrecscale": {
            parameters: [
                {
                    range: [-5,5],
                }
            ]
        },
        "singlebattle" : {
        },
        "deserter": {
            parameters: [
                {
                    range: [0,100],
                }
            ]
        },
        "horrordeserter": {
            parameters: [
                {
                    range: [0,100],
                }
            ]
        },
        "defector": {
            parameters: [
                {
                    range: [0,100],
                }
            ]
        },
        "nowish" : {},
        "rpcost": {
            parameters: [
                {
                    range: [0,99999],
                }
            ]
        },                
        "rcost": {
            parameters: [
                {
                    range: [0,99999],
                }
            ]
        },
        "ressize": {
            parameters: [
                {
                    range: [1,10],
                }
            ]
        },
        "hp": {
            parameters: [
                {
                    range: [1,999],
                }
            ]
        },
        "str": {
            parameters: [
                {
                    range: [1,99],
                }
            ]
        },
        "att": {
            parameters: [
                {
                    range: [0,99],
                }
            ]
        },
        "def": {
            parameters: [
                {
                    range: [0,99],
                }
            ]
        },
        "prec": {
            parameters: [
                {
                    range: [0,99],
                }
            ]
        },
        "prot": {
            parameters: [
                {
                    range: [0,99],
                }
            ]
        },
        "size": {
            parameters: [
                {
                    range: [1,10],
                }
            ]
        },
        "mr": {
            parameters: [
                {
                    range: [1,99],
                }
            ]
        },
        "mor": {
            parameters: [
                {
                    range: [1,50],
                }
            ]
        },
        "enc": {
            parameters: [
                {
                    range: [0,10],
                }
            ]
        },
        "mapmove": {
            parameters: [
                {
                    range: [0,99],
                }
            ]
        },
        "ap": {
            parameters: [
                {
                    range: [0,99],
                }
            ]
        },
        "eyes": {
            parameters: [
                {
                    range: [0,99],
                }
            ]
        },
        "voidsanity": {
            parameters: [
                {
                    range: [0,100],
                }
            ]
        },
        "weapon": {
            parameters: [
                {
                    range: [0,3999],
                    allowString : true,
                }
            ]
        },
        "armor": {
            parameters: [
                {
                    range: [0,1999],
                    allowString : true,
                }
            ]
        },
        "humanoid": {
        },
        "mountedhumanoid": {
        },
        "quadruped": {
        },
        "lizard": {
        },
        "naga": {
        },
        "snake": {
        },
        "bird": {
        },
        "djinn": {
        },
        "troglodyte": {
        },
        "miscshape": {
        },
        "startitem": {
            parameters: [
                {
                    range: [0,1999],
                    allowString : true,
                }
            ]
        },
        "userestricteditem": {
            parameters: [
                {
                    range: [0,10000],
                }
            ]
        },
        "noitem": {
        },
        "itemslots": {
            parameters: [
                {
                    bitmask : true,
                }
            ]
        },
        "noweapon": {
            parameters: [
                {
                    range: [0,1],
                }
            ]
        },
        "female": {
        },
        "coldblood": {
        },
        "drake": {
        },
        "plant": {
        },
        "lesserhorror": {
        },
        "greaterhorror": {
        },
        "doomhorror": {
        },
        "holy": {
        },
        "holycost": {
            parameters: [
                {
                    range: [1,10],
                }
            ]
        },
        "animal": {
        },
        "unique": {
        },
        "undead": {
        },
        "bug": {
        },
        "demon": {
        },
        "magicbeing": {
        },
        "autocompete": {
        },
        "blind": {
        },
        "uwbug": {
        },
        "stonebeing": {
        },
        "inanimate": {
        },
        "dungeon": {
        },
        "lanceok": {
        },
        "spiritform": {
        },
        "nospiritform": {
        },
        "illusion": {
        },
        "divinebeing": {
        },
        "polyimmune": {
        },
        "immobile": {
        },
        "aquatic": {
        },
        "amphibian": {
        },
        "pooramphibian": {
        },
        "float": {
        },
        "flying": {
        },
        "swimming": {
        },
        "snow": {
        },
        "stormimmune": {
        },
        "teleport": {
        },
        "mapteleport": {
        },
        "blink": {
        },
        "unteleportable": {
        },
        "noriverpass": {
        },
        "forestsurvival": {
        },
        "mountainsurvival": {
        },
        "swampsurvival": {
        },
        "wastesurvival": {
        },
        "sailing": {
            parameters : [
                {
                    range : [1,999]
                },
                {
                    range : [1,10]
                }
            ],
        },
        "giftofwater": {
            parameters : [
                {
                    range : [1,999]
                },
            ],
        },
        "indepmove": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "indepstay": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        },
        "norange": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "nomovepen": {
        },
        "mobilearcher": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        },
        "farsail": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        },
        "statstorm": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        },
        "statbreak": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        },
        "seduce": {
            parameters : [
                {
                    range : [1,25]
                },
            ],
        },
        "succubus": {
            parameters : [
                {
                    range : [1,25]
                },
            ],
        },
        "corruptor": {
            parameters : [
                {
                    range : [1,25]
                },
            ],
        },
        "stealthy": {
            parameters : [
                {
                    range : [-1000,1000]
                },
            ],
        },
        "spy": {
        },
        "assassin": {
        },
        "patience": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        },
        "scalewalls": {
        },
        "beckon": {
            parameters : [
                {
                    range : [1,25]
                },
            ],
        },
        "falsearmy": {
            parameters : [
                {
                    range : [-999,999]
                },
            ],
        },
        "foolscouts": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },
        "plaguedoctor": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "assencloc": {
            parameters : [
                {
                    range : [0,7]
                },
            ],
        },
        "startage": {
            parameters : [
                {
                    range : [-1,99999]
                },
            ],
        },
        "maxage": {
            parameters : [
                {
                    range : [0,99999]
                },
            ],
        },
        "older": {
            parameters : [
                {
                    range : [-9999,9999]
                },
            ],
        },
        "addrandomage": {
            parameters : [
                {
                    range : [0,99999]
                },
            ],
        },
        "uwdamage": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "heal": {
        },
        "noheal": {
        },
        "landdamage": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "healer": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "homesick": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "autohealer": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        },
        "autodishealer": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        },
        "autodisgrinder": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        },
        "autocorpsehealer": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        },
        "diseaseres": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "woundfend": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },
        "hpoverflow": {
        },
        "corpseeater": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },
        "deadhp": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },
        "maxdeadhp": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },
        "startaff": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "startmajoraff": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "startingaff": {
            parameters : [
                {
                    bitmask : true
                },
            ],
        },
        "insane": {
            parameters : [
                {
                    range : [-100,100]
                },
            ],
        },
        "startheroab": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "xpgain": {
            parameters : [
                {
                    range : [-100,999]
                },
            ],
        },
        "extralives": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "bluntres": {
        },
        "ethereal": {
        },
        "noheal": {
        },
        "coldres": {
            parameters : [
                {
                    range : [-100,100]
                },
            ],
        },
        "fireres": {
            parameters : [
                {
                    range : [-100,100]
                },
            ],
        },
        "poisonres": {
            parameters : [
                {
                    range : [-100,100]
                },
            ],
        },
        "shockres": {
            parameters : [
                {
                    range : [-100,100]
                },
            ],
        },
        "acidres": {
            parameters : [
                {
                    range : [-100,100]
                },
            ],
        },
        "decayres": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        },
        "iceprot": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },
        "icenatprot": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },
        "invulnerable": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "regeneration": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "doheal": {
        },
        "undregen": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "reconst": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "uwregen": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "falseregen": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "enchantedblood": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "pierceres": {
        },
        "slashres": {
        },
        "reinvigoration": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "airshield": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "ironvul": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "twistfate": {
        },
        "glamour": {
        },
        "immortal": {
        },
        "domimmortal": {
        },
        "reformtime": {
            parameters : [
                {
                    range : [-2,100]
                },
            ],
        },
        "springimmortal": {
        },
        "reform": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "bugreform": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "bugshape": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "buguwshape": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "bugswarmshape": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "bugswarmuwshape": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "heat": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "cold": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "uwheat": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "poisonarmor": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },
        "poisonskin": {
            parameters : [
                {
                    range : [0,500]
                },
            ],
        },
        "poisoncloud": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "diseasecloud": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "animalawe": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "awe": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "sunawe": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "haltheretic": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "fear": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "dread": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "fireshield": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "uwfireshield": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "banefireshield": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "acidshield": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "curseluckshield": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "damagereversal": {
            parameters : [
                {
                    range : [1,50]
                },
            ],
        },
        "bloodvengeance": {
            parameters : [
                {
                    range : [1,50]
                },
            ],
        },
        "slimer": {
            parameters : [
                {
                    range : [1,50]
                },
            ],
        },
        "entangle": {
        },
        "eyeloss": {
        },
        "horrormark": {
        },
        "mindslime": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "overcharged": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },
        "sleepaura": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "nightmareaura": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "spikes": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },
        "springpower": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "summerpower": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "fallpower": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "winterpower": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },                
        "yearturn": {
            parameters : [
                {
                    range : [0,25]
                },
            ],
        },               
        "chaospower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "coldpower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "firepower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "deathpower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "growthpower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "darkpower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "stormpower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "magicpower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "slothpower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "dompower": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        },            
        "ambidextrous": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },            
        "clumsy": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        },        
        "berserk": {
            parameters : [
                {
                    range : [0,25]
                },
            ],
        },        
        "autoberserk": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        },        
        "blessbers": {
        },     
        "blessfly": {
        },       
        "darkvision": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },      
        "spiritsight": {
        },       
        "truesight": {
        },       
        "invisible": {
        },       
        "unseen": {
        },       
        "guardspiritbonus": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },  
        "trampswallow": {
        },        
        "raiseonkill": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },   
        "trample": {
        },            
        "digest": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },            
        "aciddigest": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },              
        "incorporate": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                            
        "raiseshape": {
            parameters : [
                {
                    allowString : true,
                    range : [-10000,19999]
                },
            ],
        },                          
        "fearofflood": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                        
        "mindcollar": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                        
        "deathcurse": {
        },                         
        "deathpoison": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "deathdisease": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "deathparalyze": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "deathfire": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "deathshock": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "deathslime": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "deathgrab": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "powerofdeath": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "sleepres": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "beartattoo": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                              
        "horsetattoo": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "wolftattoo": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "boartattoo": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                            
        "snaketattoo": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        },                              
        "castledef": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                            
        "siegebonus": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                            
        "patrolbonus": {
            parameters : [
                {
                    range : [-999,999]
                },
            ],
        },                            
        "pillagebonus": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                            
        "inquisitor": {
        },                      
        "supplybonus": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                      
        "falsesupply": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                         
        "appetite": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                      
        "heretic": {
            parameters : [
                {
                    range : [0,5]
                },
            ],
        },                        
        "resources": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                       
        "iceforging": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                       
        "neednoteat": {
        },                       
        "elegist": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },                    
        "spreaddom": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        },                    
        "praise": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        },                         
        "nobadevents": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },                          
        "shatteredsoul": {
            parameters : [
                {
                    range : [-100,100]
                },
            ],
        },                      
        "incunrest": {
            parameters : [
                {
                    range : [-1000,1000]
                },
            ],
        },                
        "incprovdef": {
            parameters : [
                {
                    range : [0,19]
                },
            ],
        },    
        "taxcollector": {
        },    
        "gold": {
            parameters : [
                {
                    range : [-1000,1000]
                },
            ],
        },    
        "addupkeep": {
            parameters : [
                {
                    range : [-9999,9999]
                },
            ],
        },    
        "leper": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },  
        "popkill": {
            parameters : [
                {
                    range : [0,10000]
                },
            ],
        },  
        "insanify": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },  
        "nohof": {
        },                  
        "alchemy": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        },  
        "mason": {
        },  
        "incscale": {
            parameters : [
                {
                    range : [0,6]
                },
            ],
        },   
        "decscale": {
            parameters : [
                {
                    range : [0,5]
                },
            ],
        },   
        "fortkill": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },   
        "thronekill": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },   
        "farthronekill": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },   
        "localsun": {
        },                   
        "adeptsacr": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },  
        "mindvessel": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        },   
        "shapechange": {
            parameters : [
                monsterParamsNoMontag,
            ],
        },   
        "prophetshape": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },   
        "firstshape": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },   
        "secondshape": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },    
        "secondtmpshape": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },    
        "shapechance": {
            parameters : [
                {
                    allowString : true,
                    range : [-75,0]
                },
            ],
        },   
        "forestshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        },  
        "plainshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "foreignshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "homeshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "domshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "notdomshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "springshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "summershape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        },
        "autumnshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        },  
        "wintershape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "growhp": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        }, 
        "shrinkhp": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        }, 
        "xpshape": {
            parameters : [
                {
                    range : [0,9999]
                },
            ],
        }, 
        "labxpshape": {
            parameters : [
                {
                    range : [0,9999]
                },
            ],
        },   
        "xpshapemon": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },  
        "xpshapeloss": {
            parameters : [
                {
                    allowString : true,
                    range : [0,100]
                },
            ],
        },   
        "xploss": {
            parameters : [
                {
                    allowString : true,
                    range : [0,100]
                },
            ],
        },   
        "transformation": {
            parameters : [
                {
                    allowString : true,
                    range : [-1,1]
                },
            ],
        },    
        "fireattuned": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },     
        "airattuned": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },     
        "waterattuned": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },     
        "earthattuned": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },     
        "astralattuned": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },     
        "deathattuned": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },    
        "natureattuned": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },    
        "glamourattuned": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },    
        "bloodattuned": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },  
        "cleanshape": {
        }, 
        "forcess": {
        }, 
        "landshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "watershape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "twiceborn": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "lich": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "battleshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "worldshape": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "animated": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "reanimator": {
            parameters : [
                {
                    range : [0,9999]
                },
            ],
        }, 
        "reanimpriest": {
        },                 
        "domsummon": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        }, 
        "domsummon2": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        }, 
        "domsummon20": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        }, 
        "raredomsummon": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        }, 
        "templetrainer": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        }, 
        "makemonsters1": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "makemonsters2": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "makemonsters3": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "makemonsters4": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "makemonsters5": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "summon1": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "summon2": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "summon3": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "summon4": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "summon5": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "battlesum1": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "battlesum2": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "battlesum3": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "battlesum4": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "battlesum5": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "battlesum1d2": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "battlesum1d3": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "battlesumwarm": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum1": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum2": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum3": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum4": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum5": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum1d3": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum1d6": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum2d6": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum3d6": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum4d6": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum5d6": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum6d6": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum7d6": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum8d6": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },
        "batstartsum9d6": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        },                
        "montag": {
            parameters : [
                {
                    range : [1000,100000]
                },
            ],
        },              
        "montagweight": {
            parameters : [
                {
                    range : [1,100]
                },
            ],
        },           
        "ivylord": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },          
        "dragonlord": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },          
        "lamialord": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },          
        "corpselord": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },          
        "onisummon": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        },
        "slaver": {
            parameters : [
                monsterParamsAcceptMontag,
            ],
        }, 
        "slaverbonus": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "faysummon": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "fireelementals": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "aireelementals": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "earthelementals": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "waterelementals": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "nametype": {
            parameters : [
                {
                    range : [0,399]
                },
            ],
        }, 
        "mountmnr": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "unmountedspr1": {
            parameters : [
                {
                    allowString : true,
                    expectString : true,
                },
            ],
        }, 
        "unmountedspr2": {
            parameters : [
                {
                    allowString : true,
                    expectString : true,
                },
            ],
        }, 
        "nofmounts": {
            parameters : [
                {
                    range : [1,8]
                },
            ],
        }, 
        "nofriders": {
            parameters : [
                {
                    range : [1,8]
                },
            ],
        }, 
        "coridermnr": {
            parameters : [
                monsterParamsNoMontag,
            ],
        }, 
        "xspr1": {
            parameters : [
                {
                    allowString : true,
                    expectString : true,
                },
            ],
        }, 
        "xspr2": {
            parameters : [
                {
                    allowString : true,
                    expectString : true,
                },
            ],
        }, 
        "unmountedspr1": {
            parameters : [
                {
                    allowString : true,
                    expectString : true,
                },
            ],
        }, 
        "regainmount": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        }, 
        "noremount": {
        }, 
        "skilledrider": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        }, 
        "mountiscom": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        }, 
        "nobarding": {
        }, 
        "nothrowoff": {
        }, 
        "nofalldmg": {
        }, 
        "mounted": {
        }, 
        "bravemount": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "smartmount": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "noleader": {
        }, 
        "poorleader": {
        }, 
        "okleader": {
        }, 
        "goodleader": {
        }, 
        "expertleader": {
        }, 
        "superiorleader": {
        }, 
        "command": {
            parameters : [
                {
                    range : [-1000,1000]
                },
            ],
        }, 
        "nomagicleader": {
        }, 
        "poormagicleader": {
        }, 
        "okmagicleader": {
        }, 
        "goodmagicleader": {
        }, 
        "expertmagicleader": {
        }, 
        "superiormagicleader": {
        }, 
        "magiccommand": {
            parameters : [
                {
                    range : [-1000,1000]
                },
            ],
        }, 
        "noundeadleader": {
        }, 
        "poorundeadleader": {
        }, 
        "okundeadleader": {
        }, 
        "goodundeadleader": {
        }, 
        "expertundeadleader": {
        }, 
        "superiorundeadleader": {
        }, 
        "undcommand": {
            parameters : [
                {
                    range : [-1000,1000]
                },
            ],
        }, 
        "almostundead": {
        }, 
        "almostliving": {
        }, 
        "inspirational": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "beastmaster": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "taskmaster": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "slave": {
        },                
        "undisciplined": {
        }, 
        "formationfighter": {
            parameters : [
                {
                    range : [-9,10]
                },
            ],
        }, 
        "bodyguard": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        }, 
        "warning": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "standard": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        }, 
        "latehero": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        }, 
        "undisleader": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        }, 
        "tolerateund": {
        }, 


        "magicskill": {
            parameters : [
                {
                    range : [0,53]
                },
                {
                    range : [1,10]
                },
            ],
        }, 
        "custommagic": {
            parameters : [
                {
                    bitmask : true
                },
                {
                    range : [1,500]
                },
            ],
        }, 
        "magicboost": {
            parameters : [
                {
                    range : [0,53]
                },
                {
                    range : [-5,5]
                },
            ],
        }, 
        "masterrit": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 


        "firerange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "airrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        },
        "waterrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "earthrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "astralrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "deathrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "naturerange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "glamourarange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        },
        "bloodrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "holyrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "elementrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "sorceryrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 
        "allrange": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        }, 

        "fixedresearch": {
            parameters : [
                {
                    range : [0,999]
                },
            ],
        }, 
        "researchbonus": {
            parameters : [
                {
                    range : [-999,999]
                },
            ],
        }, 
        "inspiringres": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        }, 
        "slothresearch": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        }, 
        "drainimmune": {
        }, 
        "magicimmune": {
        }, 
        "divineins": {
        }, 
        "gemprod": {
            parameters : [
                {
                    range : [0,8]
                },
                {
                    range : [0,50]
                },
            ],
        }, 
        "elementgems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 
        "sorcerygems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 

        
        "tmpfiregems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 
        "tmpairgems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 
        "tmpwateregems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 
        "tmpearthgems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 
        "tmpastralgems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 
        "tmpdeathgems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 
        "tmpnaturegems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 
        "tmpglamourgems": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        }, 
        "tmpbloodslaves": {
            parameters : [
                {
                    range : [0,50]
                },
            ],
        },  
        "douse": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "makepearls": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        },  
        "carcasscollector": {
            parameters : [
                {
                    range : [0,10]
                },
            ],
        }, 
            
        "bonusspells": {
            parameters : [
                {
                    range : [0,4]
                },
            ],
        }, 
        "onebattlespell": {
            parameters : [
                {
                    allowString : true,
                    range : [0,7999]
                },
            ],
        }, 
        "3castbattlespell": {
            parameters : [
                {
                    allowString : true,
                    range : [0,7999]
                },
            ],
        }, 
        "crossbreeder": {
            parameters : [
                {
                    range : [0,99]
                },
            ],
        }, 
        "deathbanish": {
            parameters : [
                {
                    range : [-13,-11]
                },
            ],
        }, 
        "kokytosret": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "infernoret": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "voidret": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "allret": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "randomspell": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "tainted": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "forgebonus": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "fixforgebonus": {
            parameters : [
                {
                    range : [0,100]
                },
            ],
        }, 
        "mastersmith": {
            parameters : [
                {
                    range : [-10,10]
                },
            ],
        }, 
        "commaster": {
        }, 
        "comslave": {
        }, 
        "sabbathslave": {
        }, 
        "chorusmaster": {
        }, 
        "chorusslave": {
        }, 
        "grandcom": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        }, 
        "indepspells": {
            parameters : [
                {
                    range : [0,9]
                },
            ],
        }, 
        "fastcast": {
            parameters : [
                {
                    range : [-200,200]
                },
            ],
        }, 
        "spellsinger": {
        }, 
        "magicstudy": {
            parameters : [
                {
                    range : [-5,5]
                },
            ],
        }, 
        "glamourmanip": {
            parameters : [
                {
                    range : [0,1]
                },
            ],
        }, 

            
        "bringeroffortune ": {
            parameters : [
                {
                    range : [-100,100]
                },
            ],
        },  
        "combatcaster": {
        },  
        "unsurr": {
            parameters : [
                {
                    range : [0,1000]
                },
            ],
        },  
        "skirmisher": {
            parameters : [
                {
                    range : [-25,25]
                },
            ],
        },  
        "minsizeleader": {
            parameters : [
                {
                    range : [0,6]
                },
            ],
        }, 
    },
    "armor" : {
        "name" : {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "clear" : {},
        "copyarmor": {
            parameters: [
                {
                    allowString : true,
                    range: [0,999]
                }
            ]
        },
        "type": {
            parameters: [
                {
                    fixedValues: [4,5,6,9]
                }
            ]
        },
        "prot": {
            parameters: [
                {
                    range: [0,999]
                }
            ]
        },
        "protparts": {
            parameters: [
                {
                    range: [0,999]
                },
                {
                    range: [0,999]
                }
            ]
        },
        "def": {
            parameters: [
                {
                    range: [-100,100]
                }
            ]
        },
        "enc": {
            parameters: [
                {
                    range: [0,100]
                }
            ]
        },
        "rcost": {
            parameters: [
                {
                    range: [0,100]
                }
            ]
        },
        "magicarmor": {
        },
        "ironarmor": {
        },
        "woodenarmor": {
        },
    },
    "nametype" : {                
        "addname": {
            parameters : [
                nameParam,
            ],
        },               
        "clear": {
        },
    },
    "bless" : {                
        "name": {
            parameters : [
                nameParam,
            ],
        },               
        "path0": {
            parameters : [
                {
                    range : [0,8]
                },
            ],
        },              
        "cost0": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        },               
        "path1": {
            parameters : [
                {
                    range : [0,8]
                },
            ],
        },              
        "cost1": {
            parameters : [
                {
                    range : [1,10]
                },
            ],
        },              
        "clearscales": {
        },              
        "orderscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },     
        "prodscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "heatscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "growthscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "luckscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "magicscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "chaosscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "slothscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "coldscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "deathscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "misfortscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "drainscale": {
            parameters : [
                {
                    range : [1,5]
                },
            ],
        },
        "clearfx": {
        },
    },    
    "site" : {
        "name" : {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "clear" : {
        },        
        "copysite" : {
            parameters: [
                {
                    allowString : true,
                    range : [0,3999]
                }
            ]
        },   
        "path" : {
            parameters: [
                {
                    range : [0,9]
                }
            ]
        },
        "look" : {
            parameters: [
                {
                    range : [-1,9]
                }
            ]
        },
        "loc" : {
            parameters: [
                {
                    bitmask : true
                }
            ]
        },
        "gems" : {
            parameters: [
                {
                    range : [0,8]
                },
                {
                    range : [0,99]
                }
            ]
        },
        "gold" : {
            parameters: [
                {
                    range : [0,9999]
                }
            ]
        },
        "res" : {
            parameters: [
                {
                    range : [0,9999]
                }
            ]
        },
        "level" : {
            parameters: [
                {
                    range : [0,4]
                }
            ]
        },
        "rarity" : {
            parameters: [
                {
                    fixedValues : [0,1,2,5,11,12,13]
                }
            ]
        },
        "decunrest" : {
            parameters: [
                {
                    range : [500,500]
                }
            ]
        },
        "supply" : {
            parameters: [
                {
                    range : [0,9999]
                }
            ]
        },
        "homemon" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "mon" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "com" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "nat" : {
            parameters: [
                {
                    nationNbr
                }
            ]
        },
        "natmon" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "natcom" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "summon" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "summonlv2" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "summonlv3" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "summonlv4" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },      
        "voidgate" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },
        "wallcom" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "wallunit" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "wallmult" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "uwwallunit" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "uwwallmult" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "uwwallcom" : {
            parameters: [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "defcom" : {
            parameters: [
                {
                    // CHECK - is montag accepted
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defunit" : {
            parameters: [
                {
                    // CHECK - is montag accepted
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defmult" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "incscale" : {
            parameters: [
                {
                    range : [0,5]
                }
            ]
        },
        "decscale" : {
            parameters: [
                {
                    range : [0,5]
                }
            ]
        },
        "conjcost" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },
        "altcost" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },
        "evocost" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },
        "constcost" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },
        "enchcost" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },
        "thaucost" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },
        "bloodcost" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },
        "scry" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "scryrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "firerange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "airrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "waterrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "earthrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "astralrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "deathrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "naturerange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "glamourrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "bloodrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "elementrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "sorceryrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "allrange" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "heal" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "curse" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "cluster" : {
            parameters: [
                {
                    range : [1,32000]
                }
            ]
        },
        "disease" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "horrormark" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "holyfire" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "holypower" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "xp" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "adventureruin" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },
        "lab" : {
        },
        "temple" : {
        },        
        "fort" : {
            parameters: [
                {
                    range : [1,30]
                }
            ]
        },     
        "popgrowth" : {
            parameters: [
                {
                    range : [-1000,1000]
                }
            ]
        },
        "claim" : {
        },         
        "dominion" : {
            parameters: [
                {
                    range : [1,30]
                }
            ]
        },            
        "goddomchaos" : {
            parameters: [
                {
                    range : [-5,5]
                }
            ]
        },             
        "goddomlazy" : {
            parameters: [
                {
                    range : [-5,5]
                }
            ]
        },             
        "goddomcold" : {
            parameters: [
                {
                    range : [-5,5]
                }
            ]
        },             
        "goddomdeath" : {
            parameters: [
                {
                    range : [-5,5]
                }
            ]
        },             
        "goddommisfortune" : {
            parameters: [
                {
                    range : [-5,5]
                }
            ]
        },             
        "goddomdrain" : {
            parameters: [
                {
                    range : [-5,5]
                }
            ]
        },               
        "blesshp" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },                
        "blessanimawe" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },             
        "blessmr" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },           
        "blessawe" : {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },           
        "blessmor" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },           
        "blessstr" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },        
        "blessdarkvis" : {
            parameters: [
                {
                    range : [5,100]
                }
            ]
        },        
        "blessatt" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },        
        "evil" : {
        },       
        "blessdef" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },         
        "blessprec" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },           
        "blessfireres" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },          
        "blesscoldres" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },          
        "blessshockres" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },         
        "blesspoisres" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },           
        "blessairshield" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },          
        "blessreinvig" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },          
        "blessdtv" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },          
        "wild" : {
        },         
        "recallgod" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },           
        "domwar" : {
            parameters: [
                {
                    range : [1,100]
                }
            ]
        },   
    },
    "nation" : {
        "name" : {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "clearnation" : {
        },
        "epithet" : {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "era" : {
            parameters : [
                { range : [0,3] }
            ]
        },
        "descr" : {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "summary" : {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "brief" : {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "color" : {
            parameters : [
                {
                    range : [0,1],
                    allowFloat : true
                },                
                {
                    range : [0,1],
                    allowFloat : true
                },                
                {
                    range : [0,1],
                    allowFloat : true
                }
            ]
        },
        "secondarycolor" : {
            parameters : [
                {
                    range : [0,1],
                    allowFloat : true
                },                
                {
                    range : [0,1],
                    allowFloat : true
                },                
                {
                    range : [0,1],
                    allowFloat : true
                }
            ]
        },
        "flag" : {
            parameters : [
                pathParam
            ]
        },
        "viewallprov" : {
        },
        "viewallbat" : {
        },
        "clearsites" : {
        },
        "startsite" : {
            parameters : [
                nameParam
            ]
        },
        "futuresite" : {
            parameters : [
                nameParam
            ]
        },
        "islandsite" : {
            parameters : [
                nameParam
            ]
        },
        "likesterr" : {
            parameters : [
                {
                    bitmask : true
                }
            ]
        },
        "idealcold" : {
            parameters : [
                {
                    range : [-3,3]
                }
            ]
        },
        "defchaos" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "defsloth" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "defdeath" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "defmisfortune" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "defdrain" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "uwnation" : {
        },
        "coastnation" : {
        },
        "riverstart" : {
        },
        "cavenation" : {
            parameters : [
                {
                    range : [0,3]
                }
            ]
        },
        "caveinc" : {
            parameters : [
                {
                    range : [0,100]
                }
            ]
        },
        "caveres" : {
            parameters : [
                {
                    range : [0,100]
                }
            ]
        },
        "caverecpt" : {
            parameters : [
                {
                    range : [0,100]
                }
            ]
        },
        "islandnation" : {
        },
        "hatesterr" : {
            parameters : [
                {
                    bitmask : true
                }
            ]
        },
        "killcappop" : {
            parameters : [
                {
                    range : [-100,100]
                }
            ]
        },
        "fortcoldscaleres" : {
            parameters : [
                {
                    range : [0,5]
                }
            ]
        },
        "fortheatscaleres" : {
            parameters : [
                {
                    range : [0,5]
                }
            ]
        },
        "homecoldscaleres" : {
            parameters : [
                {
                    range : [0,5]
                }
            ]
        },
        "homeheatscaleres" : {
            parameters : [
                {
                    range : [0,5]
                }
            ]
        },
        "moreorder" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "moreprod" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "moreheat" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "moregrowth" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "moreluck" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "moremagic" : {
            parameters : [
                {
                    range : [-5,5]
                }
            ]
        },
        "aiholdgod" : {
        },
        "aiawake" : {
            parameters : [
                {
                    range : [0,100]
                }
            ]
        },
        "aifirenation" : {
        },
        "aiairnation" : {
        },
        "aiwaternation" : {
        },
        "aiearthnation" : {
        },
        "ainaturenation" : {
        },
        "aiastralnation" : {
        },
        "aideathnation" : {
        },
        "aiglamournation" : {
        },
        "aibloodnation" : {
        },
        "bloodnation" : {
        },
        "aigoodbless" : {
            parameters : [
                {
                    range : [0,100]
                }
            ]
        },
        "aimusthavemag" : {
            parameters : [
                {
                    range : [0,8]
                }
            ]
        },
        "aicheapholy" : {
        },
        "aiholyranged" : {
        },
        "aiheavyrec" : {
            parameters : [
                {
                    range : [0,99]
                }
            ]
        },
        "aimagerec" : {
            parameters : [
                {
                    range : [0,99]
                }
            ]
        },
        "clearrec" : {
        },
        "startcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "addforeignunit" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "addforeigncom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },

         
        "plainrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "forestrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "mountainrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "swamprec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "wasterec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "farmrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "caverec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "driprec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "coastrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "searec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "deeprec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "kelprec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },

        
        "plainfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "forestfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "mountainfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "swampfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "wastefortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "farmfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "cavefortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "dripfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "coastfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "seafortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "deepfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "kelpfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "foreignfortrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },

        "startscout" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },

        "plaincom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "forestcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "mountaincom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "swampcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "wastecom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "farmcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "cavecom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "dripcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "coastcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "seacom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "deepcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "kelpcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },

        
        "plainfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "forestfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "mountainfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "swampfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "wastefortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "farmfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "cavefortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "dripfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "coastfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "seafortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "deepfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "kelpfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "foreignfortcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },

        
        "startunittype1" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "startunitnbrs1" : {
            parameters : [
                {
                    range : [1,999]
                }
            ]
        },
        "startunittype2" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "startunitnbrs2" : {
            parameters : [
                {
                    range : [1,999]
                }
            ]
        },

        "addrecunit" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "addreccom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "uwrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "uwcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "landrec" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "landcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },        
        "merccost" : {
            parameters : [
                {
                    range : [-100,100]
                }
            ]
        },

              
        "hero1" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "hero2" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "hero3" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "hero4" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "hero5" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "hero6" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "hero7" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "hero8" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "hero9" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "hero10" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "multihero1" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "multihero2" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "multihero3" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "multihero4" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "multihero5" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "multihero6" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "multihero7" : {
            parameters : [
                {
                    range : [-1,19999]
                }
            ]
        },
        "noforeignrec" : {
        },

        
        "defcom1" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defcom2" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defunit1" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defunit1b" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defunit1c" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defunit1d" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defunit2" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defunit2b" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "defmult1" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "defmult1b" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "defmult1c" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "defmult1d" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "defmult2" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "defmult2b" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },

        
        "wallcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "wallunit" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "wallmult" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "guardcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "guardunit" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "guardmult" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
         "foreignwallcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "foreignwallunit" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "foreignwallmult" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "foreignguardcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "foreignguardunit" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "foreignguardmult" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "badindpd" : {
            parameters : [
                {
                    range: [0,1]
                }
            ]
        },

        "uwdefcom1" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "uwdefcom2" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "uwdefunit1" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "uwdefunit1b" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "uwdefunit1c" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "uwdefunit1d" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "uwdefunit2" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "uwdefunit2b" : {
            parameters : [
                {
                    monsterParamsAcceptMontag
                }
            ]
        },
        "uwdefmult1" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "uwdefmult1b" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "uwdefmult1c" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "uwdefmult1d" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "uwdefmult2" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "uwdefmult2b" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },

        
        "uwwallunit" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "uwwallmult" : {
            parameters : [
                {
                    range: [1,100]
                }
            ]
        },
        "uwwallcom" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },

        "cleargods" : {
        },
        "addgod" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },
        "homerealm" : {
            parameters : [
                {
                    range : [1,10]
                }
            ]
        },
        "noundeadgods" : {
        },
        "delgod" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },        
        "likespop" : {
            parameters : [
                {
                    poptypeNbr
                }
            ]
        },
        "godrebirth" : {
        },        
        "cheapgod20" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },  
        "uwbuild" : {
            parameters : [
                {
                    range : [0,1]
                }
            ]
        },  
        "cheapgod40" : {
            parameters : [
                {
                    monsterParamsNoMontag
                }
            ]
        },  
        "blessbonus" : {
            parameters : [
                {
                    range : [0,9]
                }
            ]
        }, 

        // typed bless bonuses are intentionally not included

        
        "minprison" : {
            parameters : [
                {
                    range : [0,29]
                }
            ]
        }, 
        "maxprison" : {
            parameters : [
                {
                    range : [0,2]
                }
            ]
        }, 

        
        "fortera" : {
            parameters : [
                {
                    range : [0,4]
                }
            ]
        }, 
        "fortcost" : {
            parameters : [
                {
                    range : [0,999]
                }
            ]
        }, 
        "labcost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "templecost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "forestlabocst" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "foresttemplecost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "cavelabcost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "cavetemplecost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "swamplabcost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "swamptemplecost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "mountlabcost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "mounttemplecost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "wastelabcost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "wastetemplecost" : {
            parameters : [
                {
                    range : [0,99999]
                }
            ]
        }, 
        "templepic" : {
            parameters : [
                {
                    range : [0,32]
                }
            ]
        }, 
        "templegems" : {
            parameters : [
                {
                    range : [0,8]
                }
            ]
        }, 
        "homefort" : {
            parameters : [
                {
                    range : [1,30]
                }
            ]
        }, 
        "buildfort" : {
            parameters : [
                {
                    range : [1,30]
                }
            ]
        }, 
        "builduwfort" : {
            parameters : [
                {
                    range : [1,30]
                }
            ]
        }, 
        "buildcoastfort" : {
            parameters : [
                {
                    range : [1,30]
                }
            ]
        }, 
        "fortunrest" : {
            parameters : [
                {
                    range : [1,99]
                }
            ]
        }, 

        
        "nodeathsupply" : {
        }, 
        "halfdeathinc" : {
        }, 
        "halfdeathpop" : {
        }, 
        "domdeathsense" : {
        }, 
        "nationinc" : {
            parameters : [
                {
                    range : [-100,500]
                }
            ]
        }, 
        "castleprod" : {
            parameters : [
                {
                    range : [-100,999]
                }
            ]
        }, 
        "tradecoast" : {
            parameters : [
                {
                    range : [-100,999]
                }
            ]
        }, 
        "seatrace" : {
        }, 
        "golemhp" : {
            parameters : [
                {
                    range : [-100,999]
                }
            ]
        }, 
        "disbless" : {
            parameters : [
                {
                    allowString : true,
                    range : [0,999]
                }
            ]
        }, 
        "nopreach" : {
        }, 
        "dyingdom" : {
        }, 
        "sacrificedom" : {
        }, 
        "recallgod" : {
            parameters : [
                {
                    allowString : true,
                    range : [0,999]
                }
            ]
        }, 
        "domkill" : {
            parameters : [
                {
                    range : [0,999]
                }
            ]
        }, 
        "domunrest" : {
            parameters : [
                {
                    range : [-999,999]
                }
            ]
        }, 
        "autoundead" : {
        }, 
        "guardspirit" : {
            parameters : [
                monsterParamsAcceptMontag
            ]
        }, 
        "syncretism" : {
            parameters : [
                {
                    range : [0,1]
                }
            ]
        }, 
        "domwar" : {
            parameters : [
                {
                    range : [-99,99]
                }
            ]
        }, 
        "domsail" : {
        }, 
        "hidedom" : {
            parameters : [
                {
                    range : [0,1]
                }
            ]
        }, 
        "templeholypoints" : {
            parameters : [
                {
                    range : [0,99]
                }
            ]
        }, 
        "priestreanim" : {
        }, 
        "undeadreanim" : {
        },
        "horsereanim" : {
        },
        "wightreanim" : {
        },
        "tombwyrmreanim" : {
        },
        "manikinreanim" : {
        },
        "supayareanim" : {
        },
        "greekreanim" : {
        },
        "ghostreanim" : {
        },
    },
    "spell" : {        
        "clear": {
        },
        "copyspell": {
            parameters: [
                {
                    allowString : true,
                    range: [0,3999]
                }
            ]
        },
        "name": {
            parameters: [
                nameParam
            ]
        },
        "descr": {
            parameters: [
                nameParam
            ]
        },
        "details": {
            parameters: [
                nameParam
            ]
        },
        "school": {
            parameters: [
                {
                    range : [-1,7]
                }
            ]
        },
        "researchlevel": {
            parameters: [
                {
                    range : [0,9]
                }
            ]
        },
        "path": {
            parameters: [
                {
                    range : [0,1]
                },                
                {
                    range : [-1,9]
                }
            ]
        },
        "pathlevel": {
            parameters: [
                {
                    range : [0,1]
                },                
                {
                    range : [0,9]
                }
            ]
        },
        "fatiguecost": {
            parameters: [
                {
                    range : [1,100000]
                },
            ]
        },
        // spell effects
        
        "aoe": {
            parameters: [
                {
                    range : [0,100000]
                },
            ]
        },
        "damage": {
            parameters: [
                {
                    range : [-100000,100000]
                },
            ]
        },
        "damagemon": {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                },
            ]
        },
        "nextspell": {
            parameters: [
                {
                    allowString : true,
                    range: [0,3999]
                }
            ]
        },
        "nextingeo": {
            parameters: [
                {
                    bitmask : true
                }
            ]
        },
        "effect": {
            parameters: [
                {
                    range: [0,10699]
                }
            ]
        },        
        "nreff": {
            parameters: [
                {
                    range: [1,99999]
                }
            ]
        },      
        "range": {
            parameters: [
                {
                    range: [0,99999]
                }
            ]
        },      
        "prec": {
            parameters: [
                {
                    range: [-100,100]
                }
            ]
        },   
        "flightspr": {
            parameters: [
                {
                    range: [-1,10400],
                },
            ]
        },
        "explspr": {
            parameters: [
                {
                    range: [10001,10317],
                    fixedValues: [-1]
                }
            ]
        },
        "sound": {
            parameters: [
                {
                    range: [0,248]
                }
            ]
        },
        "strikesound": {
            parameters: [
                {
                    range: [0,248]
                }
            ]
        },
        "sample": {
            parameters: [
                pathParam
            ]
        },
        "speedmult": {
            parameters: [
                {
                    range: [1,3],
                }
            ]
        },
        "makecrater": {
            parameters: [
                {
                    range: [0,1],
                }
            ]
        },

        // targeting        
        "provrange": {
            parameters: [
                {
                    range: [0,99],
                }
            ]
        },      
        "onlygeosrc": {
            parameters: [
                {
                    bitmask : true
                }
            ]
        },      
        "onlygeodst": {
            parameters: [
                {
                    bitmask : true
                }
            ]
        },      
        "nogeodst": {
            parameters: [
                {
                    bitmask : true
                }
            ]
        },      
        "onlycoastsrc": {
            parameters: [
                {
                    range: [0,1]
                }
            ]
        },  
        "onlyatsite": {
            parameters: [
                {
                    allowString : true,
                    range: [0,3999]
                }
            ]
        },
        "onlysitedst": {
            parameters: [
                {
                    allowString : true,
                    range: [0,3999]
                }
            ]
        }, 
        "onlyfriendlydst": {
            parameters: [
                {
                    range: [0,2]
                }
            ]
        }, 
        "onlyowndst": {
            parameters: [
                {
                    range: [0,1]
                }
            ]
        },
        "nowatertrace": {
            parameters: [
                {
                    range: [0,1]
                }
            ]
        },
        "nolandtrace": {
            parameters: [
                {
                    range: [0,1]
                }
            ]
        },
        "walkable": {
            parameters: [
                {
                    range: [0,1]
                }
            ]
        },

        // special attributes
        "spec": {
            parameters: [
                {
                    bitmask : true
                }
            ]
        },
        "spec2": {
            parameters: [
                {
                    bitmask : true
                }
            ]
        },
        "restricted": {
            parameters: [
                {
                    allowString : true,
                    range : [0,500]
                }
            ]
        },
        "notfornation": {
            parameters: [
                {
                    allowString : true,
                    range : [0,500]
                }
            ]
        },
        "homerealm": {
            parameters: [
                {
                    range : [1,10]
                }
            ]
        },
        "farsumcom": {
            parameters: [
                monsterParamsNoMontag
            ]
        },
        "casttime": {
            parameters: [
                {
                    range : [1,1000]
                }
            ]
        },
        "godpathspell": {
            parameters: [
                {
                    range : [-1,7]
                }
            ]
        },
        "friendlyench": {
            parameters: [
                {
                    range : [0,1]
                }
            ]
        },
        "hiddenench": {
            parameters: [
                {
                    range : [0,1]
                }
            ]
        },
        "nocastmindless": {
            parameters: [
                {
                    range : [0,1]
                }
            ]
        },
        "spellreqfly": {
            parameters: [
                {
                    range : [0,1]
                }
            ]
        },
        "onlymnr": {
            monsterParamsAcceptMontag
        },
        "notmnr": {
            monsterParamsAcceptMontag
        },
        "polygetmagic": {
            parameters: [
                {
                    range : [0,1]
                }
            ]
        },
        "maxbounces": {
            parameters: [
                {
                    range : [0,100]
                }
            ]
        },
        "sethome": {
        },
        "reqsun": {
            parameters: [
                {
                    range : [0,1]
                }
            ]
        },
        "dispimmune": {
            parameters: [
                {
                    range : [0,2]
                }
            ]
        },
        "napbreakrit": {
            parameters: [
                {
                    range : [-1,1]
                }
            ]
        },
        "sumhealaffs": {
            parameters: [
                {
                    range : [0,99]
                }
            ]
        },
        "notindoors": {
            parameters: [
                {
                    range : [-1,1]
                }
            ]
        },
        "sizecost": {
            parameters: [
                {
                    range : [-99,99]
                }
            ]
        },
        "twiceborncost": {
            parameters: [
                {
                    range : [-99,99]
                }
            ]
        },

        // global enchantments
        "localglobal": {
            parameters: [
                {
                    range : [0,1]
                }
            ]
        },
        "worldvisible": {
            parameters: [
                {
                    range : [0,1]
                }
            ]
        },
        "globallook": {
            parameters: [
                {
                    range : [1,9]
                }
            ]
        },
        "portent": {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },
        "cure": {
            parameters: [
                {
                    allowString : true,
                    expectString : true,
                }
            ]
        },

        // rare caster requirements        
        "reqspellsinger": {
        },    
        "reqtaskmaster": {
        },    
        "reqseduce": {
        },    
        "reqplant": {
        },    
        "reqnospellsinger": {
        },
        "reqnotaskmaster": {
        },
        "reqnoseduce": {
        },
        "reqnoplant": {
        },

        // spell ai hints
        
        "ainocast": {
            parameters: [
                {
                    range : [0,1]
                }
            ]
        },
        "aibadlvl": {
            parameters: [
                {
                    range : [1,10]
                }
            ]
        },
        "aispellmod": {
            parameters: [
                {
                    range : [-100,1000]
                }
            ]
        },
        "aiassmod": {
            parameters: [
                {
                    range : [-100,1000]
                }
            ]
        },






    }
}

module.exports = moddingCommands;