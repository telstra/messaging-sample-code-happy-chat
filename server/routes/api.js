const express = require('express');
var request = require('request');
var fs = require('fs');
var path = require('path');
var lib = require('telstra-messaging/lib');
const oAuthManager = lib.OAuthManager;
var controller = lib.MessagingController;

const router = express.Router();
const errorTitle = 'An error occured!';

// token callback
lib.Configuration.oAuthTokenUpdateCallback = (token) => {
  console.log('new token', token);
};

// message status callback route, emits the incomming message back to the client using socket.io
router.post('/messageStatus', (req, res, next) => {

  var io = req.app.get('socketio');
  io.emit('message_status', req.body);

  res.status(200).json({
    title: 'Message Received'
  });
});

// message received callback route, emits the incomming message back to the client using socket.io
router.post('/receiveMessage', (req, res, next) => {

  var io = req.app.get('socketio');
  io.emit('message_received', req.body);

  res.status(200).json({
    title: 'Message Received'
  });
});

// refresh the token on every request. If there is a current token that hasn't expired the SDK will return the same token
router.use('/', (req, res, next) => {

  //lib.Configuration.oAuthToken = {};
  lib.Configuration.oAuthClientId = process.env.CLIENT_ID;
  lib.Configuration.oAuthClientSecret = process.env.CLIENT_SECRET;

  const scopes = [lib.OAuthScopeEnum.NSMS];
  const promise = oAuthManager.authorize(scopes);
  promise.then((success) => {
    // client authorized. API calls can be made
    next();
  }, (e) => {
    // exception
    return res.status(e.errorCode || 500).json({
      code: e.errorCode || 500,
      message: e
    });
  });
});

// send an SMS
router.post('/sms', async (req, res, next) => {
  try {
    var error;
    // use the SDK to send the sms, if an error occurs assign the error variable
    var result = await controller.createSendSMS(req.body, (err) => { err ? error = err : null });

    // return the error if there was on
    if (error) {
      return res.status(error.errorCode || 500).json({
        code: error.errorCode || 500,
        message: error
      });
    }

    // SMS success
    res.status(201).json({
      title: 'Success',
      type: 'success',
      message: 'Message(s) sent!',
      obj: result
    });
  }
  catch (e) {
    // exception
    res.status(e.errorCode || 500).json({
      code: e.errorCode || 500,
      message: e
    });
  }
});

// send an MMS
router.post('/mms', async(req, res, next) => {
  try {
    var error;

    // use the SDK to send the mms, if an error occurs assign the error variable
    var result = await controller.createSendMMS(req.body, (err) => { err ? error = err : null });
  
    // return the error if there was on
    if (error) {
      return res.status(error.errorCode || 500).json({
        code: error.errorCode || 500,
        message: error
      });
    }

    // MMS success
    res.status(201).json({
      title: 'Success',
      type: 'success',
      message: 'MMS(s) sent!',
      obj: result
    });
  }
  catch(e) {
    // exception
    res.status(e.errorCode || 500).json({
      code: e.errorCode || 500,
      message: e
    });
  }
});

module.exports = router;