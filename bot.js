var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

//global
var bbc_interval;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  var bbc_array = ['B', 'B', 'C'];
  var bbc_cursor = 0;
  if (message.substring(0, 1) == '-') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);

    //functions:
    var nextLetter = function () {
      if (bbc_cursor >= bbc_array.length) {
        bbc_cursor = 0;
      }
      bot.sendMessage({
        to: channelID,
        message: bbc_array[bbc_cursor]
      });
      bbc_cursor++;
    }

    var clearIntervalCustom = function(interval) {
      clearInterval(interval);
    }
    var startBbcInterval = function() {
      bbc_interval = setInterval(nextLetter, 3000);
    }
    switch (cmd) {
      // !ping
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
        break;
      case 'bbc':
        startBbcInterval();
        break;
      case 'halt':
        clearIntervalCustom(bbc_interval);
        break;
        // Just add any case commands if you want to..
    }
  }



});