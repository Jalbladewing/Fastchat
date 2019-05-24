var express = require('express');
var router = express.Router();
var ctrlChannels = require('../controllers/channels');

/* Channel GET pages. */
router.get('/', ctrlChannels.homelist);
router.get('/channel/:channelid', ctrlChannels.enterChannel);
router.get('/channel/:channelid/messages', ctrlChannels.channelMessages);
router.get('/newChannel', ctrlChannels.newChannel);
router.get('/editChannel/:channelid', ctrlChannels.editChannel);

/* Channel POST pages. */
router.post('/channel/:channelid', ctrlChannels.addMessage);
router.post('/newChannel', ctrlChannels.createChannel);

/* Channel PUT pages. */
router.put('/modifyChannel/:channelid', ctrlChannels.modifyChannel);
router.put('/editChannel/:channelid', ctrlChannels.editChannel);//This is for redirection

/* Channel DELETE pages. */
router.delete('/channel/:channelid', ctrlChannels.deleteChannel);
router.delete('/', ctrlChannels.homelist); //This is for redirection

module.exports = router;
