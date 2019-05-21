var express = require('express');
var router = express.Router();
var ctrlChannels = require('../controllers/channels');
var ctrlOthers = require('../controllers/others');

/* Channel GET pages. */
router.get('/', ctrlChannels.homelist);
router.get('/channel/:channelid', ctrlChannels.enterChannel);
router.get('/messages', ctrlChannels.channelMessages);
router.get('/newChannel', ctrlChannels.newChannel);
router.get('/editChannel/:channelid', ctrlChannels.editChannel);

/* Channel POST pages. */
router.post('/channel/:channelid', ctrlChannels.addMessage);

/* Other pages */
router.get('/about', ctrlOthers.about);


module.exports = router;
