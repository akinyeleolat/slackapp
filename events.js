const { createEventAdapter } = require('@slack/events-api')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackEvents = createEventAdapter(slackSigningSecret)
const { WebClient } = require('@slack/web-api')
const token = process.env.SLACK_BOT_TOKEN
const web = new WebClient(token)
const subjects = require('./elements/subjects.json')

function listenForEvents(app) {
  app.use('/events', slackEvents.requestListener())

  slackEvents.on('app_mention', (event) => {
    console.log(`Received an app_mention event from user ${event.user} in channel ${event.channel}`)

    welcome(event.channel, event.user)

    respondToEvent(event.channel)
  })

  slackEvents.on('message', (event) => {
    console.log(`Received a message event from user ${event.user} in channel ${event.channel}`)
    if (event && event.type === 'message'){
      if (event.text === '!hello') {
        welcome(event.channel, event.user)
        respondToEvent(event.channel)
      }}
  })

  // All errors in listeners are caught here. If this weren't caught, the program would terminate.
  slackEvents.on('error', (error) => {
    console.log(`error: ${error}`)
  })
}
async function welcome (channelId, userId) {
  sendWelcomeMessage(channelId, `Hi! <@${userId}>`)
}

async function sendWelcomeMessage(channel, message) {
  await web.chat.postMessage({
      channel: channel,
      text: message,
  })
}

async function respondToEvent(channelId) {
  try {
    await web.chat.postMessage({
      channel: channelId,
      text: '',
      attachments: [subjects]
    })
    console.log('Message posted!')
  } catch (error) {
    console.log(error)
  }
}

module.exports.listenForEvents = listenForEvents
module.exports.respondToEvent = respondToEvent
module.exports.welcome = welcome