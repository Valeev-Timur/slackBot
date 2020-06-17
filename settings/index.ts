"use strict";
exports.__esModule = true;
import  {handleMessage} from "../functional/bot_functionality";
var SlackBot = require("slackbots");
var botName = ''; 
var botToken = ''; // bot_token
var channel = ''; // channel_name without #
var bot = new SlackBot({
    token: botToken,
    name: botName
});

bot.on('start', function () {
    var message = 'Привет, я бот.';
    var params = {
        icon_emoji: ':robot_face:'
    };
    bot.postMessageToChannel(channel, message, params);
});

// Error Handler
bot.on('error', function (err: any) { return console.log(err); });
// Message Handler
bot.on('message', function (data: { type: string; text: any; }) {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
});

