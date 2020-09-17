let express = require('express');
let router = express.Router();
let DB = require('../DB/DB');

router.get('/', (req, res) => {
    DB.connectDB()
    .then(x => DB.createRecord())
    .then(res.send('tmam'))
});

module.exports = router;