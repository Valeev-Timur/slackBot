"use strict";
exports.__esModule = true;
exports.__esModule = true;
var bot_functionality_1 = require("../functional/bot_functionality");
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
bot.on('error', function (err) { return console.log(err); });
// Message Handler
bot.on('message', function (data) {
    if (data.type !== 'message') {
        return;
    }
    bot_functionality_1.handleMessage(data.text);
});
//# sourceMappingURL=index.js.map