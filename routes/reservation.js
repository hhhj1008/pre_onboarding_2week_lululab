const express = require('express');
const reservationContorller = require('../controllers/reservation');

const router = express.Router();

router.get('/:reservation_number', reservationContorller.getReservation);
router.post('', reservationContorller.addReservation);
router.patch('', reservationContorller.updateReservation);
router.patch('/:reservation_number', reservationContorller.checkVisit);
router.delete('/:reservation_number', reservationContorller.deleteReservation);

module.exports = router;