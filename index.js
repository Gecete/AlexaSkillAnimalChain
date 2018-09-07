/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample is a test to see how Alexa Skills owrks.
  **/
'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//Author : Gonzalo del Corral 
//Email : gonzalocote90@gmail.com
//Date : 26/08/2018
//=========================================================================================================================================

const APP_ID = "amzn1.ask.skill.0c53adb8-25c0-4920-8615-4f6270e5b50c";

const SKILL_NAME = 'Animal chain';
const GET_ANIMAL_MESSAGE = "Ok, then I say: ";
const HELP_MESSAGE = 'You have to say an animal starting with the last letter of the previous one, for example, if I say cat, you can say tiger.  You can also say, "I surrender" , if you dont know any. Or ask me to repeat the last animal I said by saying, "repeat please" , or "say again". And its important, not to repeat animals that have already been said. Ready to continue?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Ok, Goodbye then.';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    "aardvark",
    "albatross",
    "alligator",
    "alpaca",
    "ant",
    "anteater",
    "antelope",
    "ape",
    "armadillo",
    "baboon",
    "badger",
    "barracuda",
    "bat",
    "bear",
    "beaver",
    "bee",
    "bison",
    "boar",
    "buffalo",
    "butterfly",
    "camel",
    "capybara",
    "caribou",
    "cassowary",
    "cat",
    "caterpillar",
    "cattle",
    "chamois",
    "cheetah",
    "chicken",
    "chimpanzee",
    "chinchilla",
    "chough",
    "clam",
    "cobra",
    "cockroach",
    "cod",
    "cormorant",
    "coyote",
    "crab",
    "crane",
    "crocodile",
    "crow",
    "curlew",
    "deer",
    "dinosaur",
    "dog",
    "dogfish",
    "dolphin",
    "donkey",
    "dotterel",
    "dove",
    "dragonfly",
    "duck",
    "dugong",
    "eagle",
    "echidna",
    "eel",
    "eland",
    "elephant",
    "elephant-seal",
    "elk",
    "emu",
    "falcon",
    "ferret",
    "finch",
    "fish",
    "flamingo",
    "fly",
    "fox",
    "frog",
    "gaur",
    "gazelle",
    "gerbil",
    "giant-panda",
    "giraffe",
    "gnat",
    "gnu",
    "goat",
    "goose",
    "goldfinch",
    "goldfish",
    "gorilla",
    "goshawk",
    "grasshopper",
    "grouse",
    "guanaco",
    "guinea-fowl",
    "guinea-pig",
    "gull",
    "hamster",
    "hare",
    "hawk",
    "hedgehog",
    "heron",
    "herring",
    "hippopotamus",
    "hornet",
    "horse",
    "human",
    "hummingbird",
    "hyena",
    "ibex",
    "ibis",
    "jackal",
    "jaguar",
    "jay",
    "jellyfish",
    "kangaroo",
    "kingfisher",
    "koala",
    "komodo-dragon",
    "kookabura",
    "kouprey",
    "kudu",
    "lapwing",
    "lark",
    "lemur",
    "leopard",
    "lion",
    "llama",
    "lobster",
    "locust",
    "loris",
    "louse",
    "lyrebird",
    "magpie",
    "mallard",
    "manatee",
    "mandrill",
    "mantis",
    "marten",
    "meerkat",
    "mink",
    "mole",
    "mongoose",
    "monkey",
    "moose",
    "mouse",
    "mosquito",
    "mule",
    "narwhal",
    "newt",
    "nightingale",
    "octopus",
    "okapi",
    "opossum",
    "oryx",
    "ostrich",
    "otter",
    "owl",
    "ox",
    "oyster",
    "panther",
    "parrot",
    "partridge",
    "peafowl",
    "pelican",
    "penguin",
    "pheasant",
    "pig",
    "pigeon",
    "polar-bear",
    "pony",
    "porcupine",
    "porpoise",
    "prairie-dog",
    "quail",
    "quelea",
    "quetzal",
    "rabbit",
    "raccoon",
    "rail",
    "ram",
    "rat",
    "raven",
    "red-deer",
    "red-panda",
    "reindeer",
    "rhinoceros",
    "rook",
    "salamander",
    "salmon",
    "sand-dollar",
    "sandpiper",
    "sardine",
    "scorpion",
    "sea-lion",
    "sea-urchin",
    "seahorse",
    "seal",
    "shark",
    "sheep",
    "shrew",
    "skunk",
    "snail",
    "snake",
    "sparrow",
    "spider",
    "spoonbill",
    "squid",
    "squirrel",
    "starling",
    "stingray",
    "stinkbug",
    "stork",
    "swallow",
    "swan",
    "tapir",
    "tarsier",
    "termite",
    "tiger",
    "toad",
    "trout",
    "turkey",
    "turtle",
    "vicuña",
    "viper",
    "vulture",
    "wallaby",
    "walrus",
    "wasp",
    "water-buffalo",
    "weasel",
    "whale",
    "wolf",
    "wolverine",
    "wombat",
    "woodcock",
    "woodpecker",
    "worm",
    "wren",
    "yak",
    "zebra"
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
var AnimalArr = data;
var AnimalIndex = null;
var word = null;
var randomAnimal = null;
//Different resopnses to make it more real
var success = ["good one", "amazing animal", "perfect", "hahaha not bad", " wow you are impressing me", "that is not an animal... HA! just kidding, well done!", "good move"];
var speechOutput = null;
var speechOutputOld = '';
var AnimalArrTrim = null;
var restart = false;
//words said by user or alexa during the session
var pastwords = [];
var first = true;
var handlers = {
    'LaunchRequest': function () {
        this.handler.state = '_Understand';

        this.response.speak("Starting Animal Chain. Do you know how to play?").listen("do you know how to play?");
        this.emit(':responseReady');

    },
    'GetFirstAnimal': function () {
        this.handler.state = 'main';
        if (restart) {
            first = true;
            restart = false;
            pastwords = [];
        }
        AnimalArr = data;
        AnimalIndex = Math.floor(Math.random() * AnimalArr.length);
        randomAnimal = AnimalArr[AnimalIndex];
        AnimalArr.splice(AnimalIndex, 1);
        speechOutput = GET_ANIMAL_MESSAGE + randomAnimal;
        pastwords.push(randomAnimal)
        this.response.cardRenderer(SKILL_NAME, randomAnimal);
        this.response.speak(speechOutput).listen("say animal names please");
        first = false
        this.emit(':responseReady');
    },
    'another': function () {
        this.handler.state = 'main';
        restart = false;
        pastwords.push(word)
        //get only valid animals from the list
        AnimalArrTrim = AnimalArr.filter(function (res) {
            return res[0] === word[word.length - 1];
        });
        //if there are animals on the list, get a random one and continue
        if (AnimalArrTrim.length != 0) {
            AnimalIndex = Math.floor(Math.random() * AnimalArrTrim.length);
            randomAnimal = AnimalArrTrim[AnimalIndex];
            AnimalArr.splice(AnimalIndex, 1);
            speechOutput = GET_ANIMAL_MESSAGE + randomAnimal;
            pastwords.push(randomAnimal)
            this.response.cardRenderer(SKILL_NAME, randomAnimal);
            if (speechOutputOld != '') {
                speechOutputOld = speechOutputOld + ' ';
            }
            this.response.speak(speechOutputOld + speechOutput).listen("say animal names please");
            this.emit(':responseReady');
        }
        //no more valid animals, alexa lost
        else {
            this.handler.state = '_Quit';
            speechOutput = 'Ok! you wan... I lost.  Do you want to play again?';
            this.response.speak(speechOutput).listen("say if you want to play again");
            this.emit(':responseReady');
        }
    },

    'Next': function () {
        this.handler.state = 'main';
        const intent = this.event.request.intent;
        word = intent.slots.word.value;
        if (!restart) {
            speechOutputOld = null;
            if (randomAnimal[randomAnimal.length - 1] === word[0]) {
                if (AnimalArr.indexOf(word)) {
                    AnimalArr.splice(AnimalIndex, 1);
                }
                var exists = false;
                pastwords.forEach(function (elem) {
                    if (elem === word) {
                        exists = true;
                    }
                })
                if (!exists) {
                    var randomize = Math.floor(Math.random() * success.length);
                    speechOutputOld = word + '? ' + success[randomize] + '!';
                    this.emit('another');
                } else {
                    speechOutputOld = word + ' has already been said, goldfish memory!, you lost!, I, wan!   Do you want to play again?';
                    restart = true;
                    this.handler.state = '_Quit';
                    this.response.speak(speechOutputOld).listen('do you want to play again?');
                    this.emit(':responseReady');
                }
            } else {
                this.handler.state = '_Quit';
                speechOutputOld = 'Ooooh! , ' + word + ' starts with, "' + word[0] + '", and ' + randomAnimal + ' ends with, "' + randomAnimal[randomAnimal.length - 1] + '". I wan!      Do you want to play again?';
                this.response.speak(speechOutputOld).listen('do you want to play again?').listen("say yes or no");
                restart = true;
                this.emit(':responseReady');
            }
        } else {
            this.emit('another');
        }
    },
    'Unhandled': function () {
        this.handler.state = 'help';
        this.emit(':ask', "I don't know about that, do you need help?", "yes or no?");
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = 'help';

        speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen("do you understand how the game works now?");
        this.emit(':responseReady');
    },
    'AMAZON.YesIntent': function () {
        this.response.speak("can you say an animal please?  If you want to resume the game, just say STOP or 'I surender'").listen("can you say an animal please?  If you want to resume the game, just say STOP");
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function () {
        this.response.speak("can you say an animal please?  If you want to resume the game, just say STOP or 'I surender'").listen("can you say an animal please?  If you want to resume the game, just say STOP");
        this.emit(':responseReady');
    },

    'AMAZON.CancelIntent': function () {
        this.handler.state = 'main';

        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.handler.state = 'main';

        restart = true;

        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'Repeat': function () {

        this.handler.state = 'main';
        var verb = null;
        if (!first) {
            this.response.speak("I said, " + randomAnimal + '. you have to say an animal that starts with, "' + randomAnimal[randomAnimal.length - 1] + '".').listen("say animal names please");
            this.emit(':responseReady');
        } else {
            this.emit('GetFirstAnimal');
        }
    },
    'Surrender': function () {
        this.handler.state = '_Quit';

        restart = true;
        this.response.speak("Looser, then I wan! Do you want to play again?").listen("say animal names please");
        this.emit(':responseReady');
    },
    'Restart': function () {
        this.handler.state = 'main';

        restart = true;
        this.emit('GetFirstAnimal');
    },

};



exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers, yesnoQuit, yesnoUnderstand, yesnoHelp);
    alexa.execute();
};

var yesnoUnderstand = Alexa.CreateStateHandler('_Understand', {
    'Unhandled': function () {
        this.handler.state = '_Understand';
        this.emit(':ask', "I don't know about that, do you know how to play?", "yes or no?");
    },

    'AMAZON.CancelIntent': function () {
        this.handler.state = 'main';

        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.handler.state = 'main';

        restart = true;

        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },

    'AMAZON.YesIntent': function () {
        this.emit('GetFirstAnimal');
    },
    'AMAZON.NoIntent': function () {
        this.handler.state = '_Quit';

        this.response.speak("I will say the name of an animal, and you have to say another animal that starts with the last letter of the previous one. Are you ready to start?").listen("ready?");
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = 'help';

        speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen("do you understand how the game works now?");
        this.emit(':responseReady');
    },

});
var yesnoHelp = Alexa.CreateStateHandler('help', {
    'Unhandled': function () {
        this.handler.state = '_Understand';
        this.emit(':ask', "I don't know about that, do you know how to play?", "yes or no?");
    },

    'AMAZON.CancelIntent': function () {
        this.handler.state = 'main';

        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.handler.state = 'main';

        restart = true;

        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },

    'AMAZON.YesIntent': function () {
        this.emit('Repeat');
    },
    'AMAZON.NoIntent': function () {
        this.handler.state = 'main';

        restart = true;

        this.response.speak("I am sorry I could not help, see you later. Bye bye!");
        this.emit(':responseReady');
    }

});


var yesnoQuit = Alexa.CreateStateHandler('_Quit', {
    'Unhandled': function () {
        this.handler.state = '_Understand';
        this.emit(':ask', "I don't know about that, do you know how to play?", "yes or no?");
    },

    'AMAZON.YesIntent': function () {
        this.emit('GetFirstAnimal');
    },
    'AMAZON.NoIntent': function () {
        this.emit('AMAZON.StopIntent');

    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = 'help';

        speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen("do you understand how the game works now?");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.handler.state = 'main';

        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.handler.state = 'main';

        restart = true;

        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },

});