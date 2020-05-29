"use strict";
exports.__esModule = true;
exports.__esModule = true;
var suite_1 = require("./params_module/suite");
var branch_1 = require("./params_module/branch");
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
function sendMessage(message) {
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
bot.on('error', function (err) { return console.log(err); });
// Message Handler
bot.on('message', function (data) {
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
function handleMessage(message) {
    var pieces = message.split(' ');
    // var protractorParams = new ProtractorParams();
    for (var i = 0; i < 4; i++) {
        if (message.includes(runCommands[i])) {
            if (IsCheckPrintSuite) {
                sendMessage('Введите SUITE: ');
                IsCheckPrintSuite = false;
            }
        }
    }
    for (var i = 0; i < 32; i++) {
        if (message.includes(suite_1.suiteParams[i])) {
            protractorParams.SUITE = pieces[1];
            if (IsCheckPrintBranch) {
                sendMessage('Введите BRANCH: ');
                IsCheckPrintBranch = false;
            }
        }
    }
    for (var i = 0; i < 2; i++) {
        if (message.includes(branch_1.branchParams[i])) {
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
        jenkins.build_with_params('protractor-external-tests', protractorParams, function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log(data);
        });
    }
}
//# sourceMappingURL=index.js.map