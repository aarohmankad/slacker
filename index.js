const { RTMClient } = require('@slack/rtm-api');
const { WebClient } = require('@slack/web-api');

require('dotenv').config();
const { SLACK_TOKEN, SLACK_BOT_TOKEN } = process.env;
const rtm = new RTMClient(SLACK_BOT_TOKEN);
const web = new WebClient(SLACK_TOKEN);
let RANDOM_CHANNEL_ID = '';

rtm.on('user_change', async event => {
  try {
    const result = await web.chat.postMessage({
      text: `${event.user.name}\n ${event.user.profile.status_emoji} ${event.user.profile.status_text}`,
      channel: RANDOM_CHANNEL_ID,
    });
  } catch (error) {
    console.log('An error occurred', error);
  }
});

(async () => {
  const result = await web.conversations.list();
  const random = result.channels.filter(channel => channel.name === 'random');
  RANDOM_CHANNEL_ID = random[0].id;
  // Connect to Slack
  await rtm.start();
})();
