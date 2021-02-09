  const { createMessageAdapter } = require('@slack/interactive-messages')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackInteractions = createMessageAdapter(slackSigningSecret)
const articleOrBookButton = require('./elements/articleOrBookButton.json')
const respondToButtons = require('./respondToButtons')

module.exports.listenForInteractions = function (app) {
  app.use('/interactions', slackInteractions.requestListener())
}

slackInteractions.action({ type: 'select' }, (payload, respond) => {
  respondToSelectDropdown(payload, respond)
})

slackInteractions.action({ type: 'button' }, (payload, respond) => {
  respondToButtons.respond(payload, respond)
})

function respondToSelectDropdown(payload, respond) {
  const selectedOption = payload.actions[0].selected_options[0].value

  if (payload.callback_id == 'subjects') {
    let text;
    let callbackId;
    switch (selectedOption) {
      case 'react_context':
        text = 'You selected React Context API.'
        callbackId = 'react_context_article_book'
        respondWithArticleOrBookNoButton(text, callbackId, respond)
        break
      case 'redux':
        text = 'You selected Redux.'
        callbackId = 'redux_article_book'
        respondWithArticleOrBookNoButton(text, callbackId, respond)
        break
      case 'dialog_flow':
        text = 'You selected Dialog Flow.'
        callbackId = 'dialog_flow_article_book'
        respondWithArticleOrBookNoButton(text, callbackId, respond)
        break
      case 'mongodb':
        text = 'You selected Mongodb.'
        callbackId = 'mongodb_article_book'
        respondWithArticleOrBookNoButton(text, callbackId, respond)
        break
    }
  }
  // Return a replacement message
  return { text: 'Processing...' }
}

function respondWithArticleOrBookNoButton(text, callbackId, respond) {
  articleOrBookButton.callback_id = callbackId
  articleOrBookButton.text = 'Do you prefer an article or a book?'
  respond({
    text: text,
    attachments: [articleOrBookButton],
    replace_original: true
  })
}