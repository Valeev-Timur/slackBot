"use strict";
exports.__esModule = true;
import { suiteParams } from "./params_module/suite";
import { branchParams } from "./params_module/branch";
var SlackBot = require("slackbots");
var jenkinsapi = require('jenkins-api');
var jenkins = jenkinsapi.init('');
var botName = 'BOT';
var botToken = ''; // bot_token
var channel = ''; // channel_name without #
var IsCheckPrintBranch = true;
var IsCheckPrintAgentName = true;
var IsCheckPrintResult = true;
var IsCheckPrintSuite = true;
var isOver = true;
var protractorParams = {
    'SUITE': '',
    'BRANCH': '',
    'AGENTNAME': ''
};

var runCommands = [
    "запусти",
    "запуск",
    "выполни",
    "run"
];

var forProtractor = [
    "ui",
    "автотесты",
    "protractor тесты",
    "protractor"
];

var forYandexTank = [
    "нагрузку",
    "performance",
    "нагрузочный тест"
];

var bot = new SlackBot({
    token: botToken,
    name: botName
});

// Start Hadler
bot.on('start', function () {
    var message = 'Привет, я бот.';
    var params = {
        icon_emoji: ':robot_face:'
    };
    bot.postMessageToChannel(channel, message, params);
});

function sendMessage(message: string) {
    var params = {
        icon_emoji: ':robot_face:'
    };
    bot.postMessageToChannel(channel, message, params);
}

function refreshCheck() {
    IsCheckPrintSuite = true;
    IsCheckPrintBranch = true;
    IsCheckPrintResult = true;
}

// Error Handler
bot.on('error', function (err: any) { return console.log(err); });
// Message Handler
bot.on('message', function (data: { type: string; text: any; }) {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
});


// class ProtractorParams {
//     suite: string;
//     agentname: string;
//     branch: string;
//     constructor() {
//         this.suite;
//         this.agentname;
//         this.branch;
//     }
// }

// Respons to Data
function handleMessage(message: string) {
    let pieces = message.split(' ');
    // var protractorParams = new ProtractorParams();
    for (let i: number = 0; i < 4; i++) {
        if (message.includes(runCommands[i])) {
            if (IsCheckPrintSuite) {
                sendMessage('Введите SUITE: ');
                IsCheckPrintSuite = false;
            }
        }
    }

    for (let i: number = 0; i < 32; i++) {
        if (message.includes(suiteParams[i])) {
            protractorParams.SUITE = pieces[1];
            if (IsCheckPrintBranch) {
                sendMessage('Введите BRANCH: ');
                IsCheckPrintBranch = false;
            }
        }
    }

    for (let i: number = 0; i < 2; i++) {
        if (message.includes(branchParams[i])) {
            protractorParams.BRANCH = pieces[1];
            if (IsCheckPrintAgentName) {
                sendMessage("Введите AGENTNAME: ");
                IsCheckPrintAgentName = false;
            }
        }
    }

    if (message.includes(" cloud")) {
        protractorParams.AGENTNAME = pieces[1];
        if (IsCheckPrintResult) {
            sendMessage("Автотесты запущены.\n" + "AGENTNAME: " + protractorParams.AGENTNAME + "\n" + "BRANCH: " + protractorParams.BRANCH + "\n" + "SUITE: " + protractorParams.SUITE);
            IsCheckPrintResult = false;
        }
        jenkins.build_with_params('protractor-external-tests', protractorParams, function (err: any, data: any) {
            if (err) { return console.log(err); }
            console.log(data)
        });
    }
}

