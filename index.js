const SlackBot = require('slackbots');
const dotenv = require("dotenv");
dotenv.config();
const Slack_Bot_TOKEN = process.env.TOKEN;
const Slack_Bot_NAME = process.env.NAME;
const Slack_Bot_CHANNEL = process.env.CHANNEL;

const bot = new SlackBot({
  token: Slack_Bot_TOKEN,
  name: Slack_Bot_NAME,
  channel: Slack_Bot_CHANNEL
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    Slack_Bot_CHANNEL,
    'Get Ready To work with @opsbot!',
    params
  );
});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

// Response to Data
function handleMessage(message) {
  if (message.includes(' terraform')) {
    terraformOps();
  } else if (message.includes(' help')) {
    runHelp();
  }
}

// Help with terraform 
function terraformOps() {

    const params = {
      icon_emoji: ':question:'
    };
  
   bot.postMessageToChannel(
    Slack_Bot_CHANNEL,
    'Check this link https://www.terraform.io/docs/providers/oci/guides/faq.html',
    params
  );
}


// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    Slack_Bot_CHANNEL,
    `Type @opsbot with 'terraform'`,
    params
  );
}