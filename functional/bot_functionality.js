"use strict";
exports.__esModule = true;
var suite_1 = require("../params_module/suite");
var branch_1 = require("../params_module/branch");
var startParams_json_1 = require("../called_params/startParams.json");
var SlackBot = require("slackbots");
var jenkinsapi = require('jenkins-api');
var username = ''; //  testov
var token = ''; //  1241241212
var jenkins_company = ''; // jenkins.../job/...
var jenkins = jenkinsapi.init('http://' + username + ':' + token + '@' + jenkins_company);
var botName = '';
var botToken = ''; // bot_token
var channel = ''; // channel_name without #
var IsCheckPrintBranch = true;
var IsCheckPrintAgentName = true;
var IsCheckPrintResult = true;
var IsCheckPrintSuite = true;
var bot = new SlackBot({
    token: botToken,
    name: botName
});
function sendMessage(message) {
    var params = {
        icon_emoji: ':robot_face:'
    };
    bot.postMessageToChannel(channel, message, params);
}
// Respons to Data
function handleMessage(message) {
    var pieces = message.split(' ');
    for (var i = 0; i < 4; i++) {
        if (message.includes(startParams_json_1.runCommands[i])) {
            console.log("Проверка наличия команды запуска в сообщении от пользователя");
            if (IsCheckPrintSuite) {
                console.log("Проверка для корректного ответа от бота");
                sendMessage('Введите SUITE: ');
                IsCheckPrintSuite = false;
            }
        }
    }
    for (var i = 0; i < 32; i++) {
        if (message.includes(suite_1.suiteParams[i])) {
            console.log("Проверка наличия SUITE в сообщении от пользователя");
            startParams_json_1.protractorParams[0] = pieces[1];
            if (IsCheckPrintBranch) {
                console.log("Проверка для корректного ответа от бота");
                sendMessage('Введите BRANCH: ');
                IsCheckPrintBranch = false;
            }
        }
    }
    for (var i = 0; i < 2; i++) {
        if (message.includes(branch_1.branchParams[i])) {
            console.log("Проверка наличия BRANCH в сообщении от пользователя");
            startParams_json_1.protractorParams[1] = pieces[1];
            if (IsCheckPrintAgentName) {
                console.log("Проверка для корректного ответа от бота");
                sendMessage("Введите AGENTNAME: ");
                IsCheckPrintAgentName = false;
            }
        }
    }
    if (message.includes(" cloud")) {
        console.log("Проверка наличия AGENTNAME в сообщении от пользователя");
        startParams_json_1.protractorParams[2] = pieces[1];
        if (IsCheckPrintResult) {
            console.log("Проверка для корректного ответа от бота");
            sendMessage("Автотесты запущены.\n" + "AGENTNAME: " + startParams_json_1.protractorParams[2] + "\n" + "BRANCH: " + startParams_json_1.protractorParams[1] + "\n" + "SUITE: " + startParams_json_1.protractorParams[0]);
            IsCheckPrintResult = false;
        }
        // jenkins.build_with_params('protractor-external-tests', protractorParams, function (err: any, data: any) {
        //     if (err) { return console.log(err); }
        //     console.log(data)
        // });
    }
}
exports.handleMessage = handleMessage;
//# sourceMappingURL=bot_functionality.js.map