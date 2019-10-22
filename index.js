//Required to run: npm install https://github.com/woor/discord.io/tarball/gateway_v6
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, 
{
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client(
{
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) 
{
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

function sendMessage(message, channel)
{
	bot.sendMessage(
	{
		to: channel,
		message: message
	});
}

bot.on('message', function (user, userID, channelID, message, evt) 
{
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') 
	{
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) 
		{
            // !ping
            case 'ping':
                sendMessage('Pong!', channelID);
				break;
			
			case 'teo':
				sendMessage('Teo Countdown started!', channelID);
				setTimeout(function(){ sendMessage('OH LAWD, HE GON BLOW!!!', channelID);}, 78000)
				break;
         }
     }
});
