const express = require("express");
const hospitalRoute = require('./hospital');

const router = express.Router();

router.use('/hospital', hospitalRoute);

module.exports = router;
