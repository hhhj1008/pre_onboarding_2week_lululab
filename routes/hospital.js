const express = require('express');
const hospitalContorller = require('../controllers/hospital');

const router = express.Router();

router.get('', hospitalContorller.getRezAbleHospitalList);
router.get('/:hospital_id', hospitalContorller.getRezAbleHospitalOne);

module.exports = router;