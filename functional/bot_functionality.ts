import { suiteParams } from "../params_module/suite";
import { branchParams } from "../params_module/branch";
import { runCommands, forProtractor, forYandexTank, protractorParams } from "../called_params/startParams.json";
var SlackBot = require("slackbots");
var jenkinsapi = require('jenkins-api');
var username = ''; //  testov
var token = ''; //  1241241212
var jenkins_company = ''; // jenkins.../job/...
var jenkins = jenkinsapi.init('http://' + username +':' + token + '@' + jenkins_company );
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

function sendMessage(message: string) {
    var params = {
        icon_emoji: ':robot_face:'
    };
    bot.postMessageToChannel(channel, message, params);
}

// Respons to Data
export function handleMessage(message: string) {   
    let pieces = message.split(' ');
    for (let i: number = 0; i < 4; i++) {
        if (message.includes(runCommands[i])) {
            console.log("Проверка наличия команды запуска в сообщении от пользователя");
            if (IsCheckPrintSuite) {
                console.log("Проверка для корректного ответа от бота");
                sendMessage('Введите SUITE: ');
                IsCheckPrintSuite = false;        
            }
        }
    }

    for (let i: number = 0; i < 32; i++) {
        if (message.includes(suiteParams[i])) {
            console.log("Проверка наличия SUITE в сообщении от пользователя");
            protractorParams[0] = pieces[1];
            if (IsCheckPrintBranch) {
                console.log("Проверка для корректного ответа от бота");
                sendMessage('Введите BRANCH: ');
                IsCheckPrintBranch = false;
            }
        }
    }

    for (let i: number = 0; i < 2; i++) {
        if (message.includes(branchParams[i])) {
            console.log("Проверка наличия BRANCH в сообщении от пользователя");
            protractorParams[1] = pieces[1];
            if (IsCheckPrintAgentName) {
                console.log("Проверка для корректного ответа от бота");
                sendMessage("Введите AGENTNAME: ");
                IsCheckPrintAgentName = false;
            }
        }
    }

    if (message.includes(" cloud")) {
        console.log("Проверка наличия AGENTNAME в сообщении от пользователя");
        protractorParams[2] = pieces[1];
        if (IsCheckPrintResult) {
            console.log("Проверка для корректного ответа от бота");
            sendMessage("Автотесты запущены.\n" + "AGENTNAME: " + protractorParams[2] + "\n" + "BRANCH: " + protractorParams[1] + "\n" + "SUITE: " + protractorParams[0]);
            IsCheckPrintResult = false;           
        }
        // jenkins.build_with_params('protractor-external-tests', protractorParams, function (err: any, data: any) {
        //     if (err) { return console.log(err); }
        //     console.log(data)
        // });
    }  
}