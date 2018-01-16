import XmlToJs from './XmlToJs';

class Compendium {
    constructor() {
        if (localStorage.getItem('Compendium')) {
            var restoringData = JSON.parse(localStorage.getItem('Compendium'));
            console.log('restoring form localStorage', restoringData);

            this.SourceUrl = restoringData.SourceUrl;
            this.Items = restoringData.Items;
            this.Spells = restoringData.Spells;
            this.Feats = restoringData.Feats;
            this.Races = restoringData.Races;
            this.Backgrounds = restoringData.Backgrounds;
            this.Monsters = restoringData.Monsters;
            this.Classes = restoringData.Classes;
        }

    }

    SetSource(url) {
        var self = this;
        return fetch(url, {
            mode: 'cors'
        })
            .then(response => response.text())
            .then(str => {
                var tree = new XmlToJs()
                    .parseXML(str)
                    .compendium;

                this.SourceUrl = url;
                //any other processing that needs to be done, goes here
                console.log(tree);

                tree
                    .item
                    .forEach(item => {
                        self
                            .Items
                            .push(item);
                    });
                tree
                    .race
                    .forEach(race => {
                        self
                            .Races
                            .push(race);
                    });
                tree
                    .background
                    .forEach(bg => {
                        self
                            .Backgrounds
                            .push(bg);
                    });
                tree
                    .feat
                    .forEach(feat => {
                        self
                            .Feats
                            .push(feat);
                    });
                tree
                    .monster
                    .forEach(monster => {
                        self
                            .Monsters
                            .push(monster);
                    });
                tree
                    .spell
                    .forEach(spell => {
                        self
                            .Spells
                            .push(spell);
                    });
                tree
                    .class
                    .forEach(aClass => {
                        self
                            .Classes
                            .push(self.MapClass(aClass));
                    });

                localStorage.setItem('Compendium', JSON.stringify(this));

            });
    }

    MapClass(aClass) {
        var levels = {};

        aClass
            .autolevel
            .map(level => {
                //console.log(level);

                var lvlNum = level['-level'];

                if (!levels[lvlNum]) {
                    //console.log('making lvl ' + lvlNum);
                    levels['' + lvlNum + ''] = {
                        features: [],
                        scoreImprovement: false
                    };
                }

                //feature cleanup + formatting
                if (typeof level.feature !== 'undefined') {

                    if (typeof level.feature['-optional'] !== 'undefined') {
                        level.feature.optional = true;
                        delete level.feature['-optional'];
                    }

                    levels[lvlNum]
                        .features
                        .push(level.feature);
                }

                //spell slots
                if (typeof level.slots !== 'undefined') {
                    if (typeof level.slots === 'string') { //csv slots (could be ',' or ', ')
                        levels[lvlNum].slots = level
                            .slots
                            .split(',')
                            .map(s => {
                                return s.trim();
                            });

                    } else { //optional slots are in subobjects
                        levels[lvlNum].optionalSlots = true;
                        levels[lvlNum].slots = level
                            .slots['#text']
                            .split(',')
                            .map(s => {
                                return s.trim();
                            });
                    }
                }

                //score improvement
                if (typeof level['-scoreImprovement'] !== 'undefined') {
                    levels[lvlNum].scoreImprovement = true;
                }
            });
        aClass.levels = levels;
        delete aClass.autolevel;
        return aClass;
    }

    ResetStorage() {
        console.log('ResetStorage');

        this.Items.length = 0;
        this.Spells.length = 0;
        this.Feats.length = 0;
        this.Races.length = 0;
        this.Backgrounds.length = 0;
        this.Monsters.length = 0;
        this.Classes.length = 0;
        this.SourceUrl = "";

        localStorage.clear();
    }

    Search(query) {
        var results = {
            Item: [],
            Spell: [],
            Feat: [],
            Race: [],
            Background: [],
            Monster: [],
            Class: []
        };

        var regex = new RegExp(query, 'i');

        //Items
        this
            .Items
            .forEach(item => {
                if (item.name.search(regex) > -1 || this.TextArrContains(regex, item.text)) {
                    results
                        .Item
                        .push(item);
                }
            })

        //Spells
        this
            .Spells
            .forEach(spell => {
                if (spell.name.search(regex) > -1 || this.TextArrContains(regex, spell.text)) {
                    results
                        .Spell
                        .push(spell);
                }
            })

        //Feats
        this
            .Feats
            .forEach(feat => {
                if (feat.name.search(regex) > -1 || this.TextArrContains(regex, feat.text)) {
                    results
                        .Feat
                        .push(feat);
                }
            })

        //Races
        this
            .Races
            .forEach(race => {
                if (race.name.search(regex) > -1 || this.TraitContains(regex, race.trait)) {
                    results
                        .Race
                        .push(race);
                }
            })

        //Backgrounds
        this
            .Backgrounds
            .forEach(background => {
                if (background.name.search(regex) > -1 || this.TraitContains(regex, background.trait)) {
                    results
                        .Background
                        .push(background);
                }
            })

        //Monsters
        this
            .Monsters
            .forEach(monster => {
                if (monster.name.search(regex) > -1 || this.TraitContains(regex, monster.trait)) {
                    results
                        .Monster
                        .push(monster);
                }
            })

            
        //Classses
        this
            .Classes
            .forEach(aClass => {
                if (aClass.name.search(regex) > -1 ) {
                    results
                        .Class
                        .push(aClass);
                }
            })


        return results;
    }

    TextArrContains(regex, text) {
        var found = false;
        if (Array.isArray(text)) {
            text.forEach(item => {
                if (item.search(regex) > -1) {
                    found = true;
                }
            })
        } else {
            if (text.search(regex) > -1) {
                found = true;
            }
        }
        return found;
    }

    TraitContains(regex, traits) {
        var found = false;
        if (Array.isArray(traits)) {
            traits.forEach(trait => {
                if (trait.name.search(regex) > -1) {
                    found = true;
                }
                if (this.TextArrContains(regex, trait.text)) {
                    found = true;
                }
            })
        } else {
            if (traits.name.search(regex) > -1) {
                found = true;
            }
            if (this.TextArrContains(regex, traits.text)) {
                found = true;
            }
        }

        return found;
    }

    Items = [];
    Spells = [];
    Feats = [];
    Races = [];
    Backgrounds = [];
    Monsters = [];
    Classes = [];

    SourceUrl = "";
}

export default new Compendium();