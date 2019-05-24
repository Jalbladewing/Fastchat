var express = require('express');
var router = express.Router();

var ctrlChannels = require('../controllers/channels');
var ctrlMessages = require('../controllers/messages');

/* Channels pages. */
router.get('/channels', ctrlChannels.channelsList);
router.post('/channels', ctrlChannels.channelsCreate);
router.get('/channels/:channelid', ctrlChannels.channelsFindById);
router.put('/channels/:channelid', ctrlChannels.channelsUpdate);
router.delete('/channels/:channelid', ctrlChannels.channelsDelete);

/* Reviews pages. */
router.get('/channels/:channelid/messages', ctrlMessages.messagesList);
router.get('/channels/:channelid/messages/:messageid', ctrlMessages.messagesFindById);
router.post('/channels/:channelid/messages', ctrlMessages.messagesCreate);

module.exports = router;
