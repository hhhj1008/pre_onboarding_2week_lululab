const express = require("express");
const hospitalRoute = require('./hospital');
const reservationRoute = require('./reservation');

const router = express.Router();

router.use('/hospital', hospitalRoute);
router.use('/rez', reservationRoute);

module.exports = router;
