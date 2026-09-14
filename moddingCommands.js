

const moddingCommands = {
    "open": {
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
                {
                    allowString : true,
                    expectString : true
                }
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
                {
                    allowString : true,
                    expectString : true
                }
            ]
        },
        "fixedname": {
            parameters: [
                {
                    allowString : true,
                    expectString : true
                }
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
                {
                    allowString : true,
                    expectString : true
                }
            ]
        },
        "spr2": {
            parameters: [
                {
                    allowString : true,
                    expectString : true
                }
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
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "buguwshape": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "bugswarmshape": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "bugswarmuwshape": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
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
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        },   
        "prophetshape": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },   
        "firstshape": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },   
        "secondshape": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },    
        "secondtmpshape": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
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
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        },  
        "plainshape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "foreignshape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "homeshape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "domshape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "notdomshape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "springshape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "summershape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        },
        "autumnshape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        },  
        "wintershape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
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
                {
                    allowString : true,
                    range : [-100000,19999]
                },
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
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "watershape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "twiceborn": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "lich": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "battleshape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "worldshape": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
            ],
        }, 
        "animated": {
            parameters : [
                {
                    allowString : true,
                    range : [0,19999]
                },
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
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        }, 
        "domsummon2": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        }, 
        "domsummon20": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        }, 
        "raredomsummon": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        }, 
        "templetrainer": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        }, 
        "makemonsters1": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "makemonsters2": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "makemonsters3": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "makemonsters4": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "makemonsters5": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "summon1": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "summon2": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "summon3": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "summon4": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "summon5": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "battlesum1": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "battlesum2": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "battlesum3": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "battlesum4": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "battlesum5": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "battlesum1d2": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "battlesum1d3": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "battlesumwarm": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum1": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum2": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum3": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum4": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum5": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum1d3": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum1d6": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum2d6": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum3d6": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum4d6": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum5d6": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum6d6": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum7d6": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum8d6": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
            ],
        },
        "batstartsum9d6": {
            parameters : [
                {
                    allowString : true,
                    range : [-100000,19999]
                },
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
                {
                    allowString : true,
                    range : [-100000,19999]
                },
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
                {
                    allowString : true,
                    range : [0,19999]
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
                {
                    allowString : true,
                    range : [0,19999]
                },
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
                {
                    allowString : true,
                    expectString : true
                },
            ],
        },               
        "clear": {
        },
    },
    "bless" : {                
        "name": {
            parameters : [
                {
                    allowString : true,
                    expectString : true
                },
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
    }
}

module.exports = moddingCommands;