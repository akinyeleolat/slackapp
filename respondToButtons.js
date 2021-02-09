function response(payload, respond) {
    console.log('selectedOption: ', payload.actions[0].value)
  
    switch (payload.callback_id) {
      case 'react_context_article_book':
        respondToReactButton(payload.actions[0].value, respond)
        break
      case 'redux_article_book':
        respondToReduxButton(payload.actions[0].value, respond)
        break
      case 'dialog_flow_article_book':
        respondToDialogButton(payload.actions[0].value, respond)
        break
      case 'mongodb_article_book':
        respondToMongoButton(payload.actions[0].value, respond)
        break
    }
    // Return a replacement message
    return { text: 'Processing...' }
  }
  
  function respondToReactButton(selectedOption, respond) {
    const reactArticle = require('./resources/sampleArticle.json')
    const reactBook = require('./resources/sampleBook.json')
  
    if (selectedOption == 'article') {
      respond({
        blocks: reactArticle,
        replace_original: true
      })
    }
    else {
      respond({
        blocks: reactBook,
        replace_original: true
      })
    }
  }

  function respondToReduxButton(selectedOption, respond) {
    const reduxArticle = require('./resources/sampleArticle.json')
    const reduxBook = require('./resources/sampleBook.json')
  
    if (selectedOption == 'article') {
      respond({
        blocks: reduxArticle,
        replace_original: true
      })
    }
    else {
      respond({
        blocks: reduxBook,
        replace_original: true
      })
    }
  }
  
  function respondToDialogButton(selectedOption, respond) {
    const dialogArticle = require('./resources/sampleArticle.json')
    const dialogBook = require('./resources/sampleBook.json')
  
    if (selectedOption == 'article') {
      respond({
        blocks: dialogArticle,
        replace_original: true
      })
    }
    else {
      respond({
        blocks: dialogBook,
        replace_original: true
      })
    }
  }

  function respondToMongoButton(selectedOption, respond) {
    const mongoArticle = require('./resources/antiRacismArticle.json')
    const mongoBook = require('./resources/antiRacismBook.json')
  
    if (selectedOption == 'article') {
      respond({
        blocks: mongoArticle,
        replace_original: true
      })
    }
    else {
      respond({
        blocks: mongoBook,
        replace_original: true
      })
    }
  }

  
  module.exports.respond = response