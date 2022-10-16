const reservationService = require("../serviecs/reservation");
const { validatorValues } = require("./validation");
const createReservationDto = require("../dto/create-reservation");
const updateReservationDto = require("../dto/update-reservation");

const getReservation = async (req, res) => {
  const { reservation_number } = req.params;
  try {
    const datas = await reservationService.getReservation(reservation_number);

    return res.status(200).json({datas});
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
}

const addReservation = async (req, res) => {
  createReservationDto.setReservation(req.body);
  const params = createReservationDto.getReservation();

  let err = validatorValues(params, createReservationDto.getRezHaskey());

  if(err) {
    return res.status(403).json({message: err});
  }

  if(!params.user_email && !params.user_phone) {
    return res.status(403).json({message: "이메일과 핸드폰 번호 중 하나는 필수로 입력되어야 합니다."});
  }
  
  try {
    await reservationService.addReservation(params);

    return res.status(201).json({message: "예약이 완료되었습니다."});
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
}

const updateReservation = async (req, res) => {
  updateReservationDto.setReservation(req.body);
  const params = updateReservationDto.getReservation();

  let err = validatorValues(params, updateReservationDto.getRezHaskey());

  if(err) {
    return res.status(403).json({message: err});
  }

  if(!params.user_email && !params.user_phone) {
    return res.status(403).json({message: "이메일과 핸드폰 번호 중 하나는 필수로 입력되어야 합니다."});
  }

  try {
    await reservationService.updateReservation(params);

    return res.status(200).json({message: "예약이 수정이 완료되었습니다."});
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
}

const deleteReservation = async (req, res) => {
  const { reservation_number } = req.params;
  try {
    await reservationService.deleteReservation(reservation_number);

    return res.status(200).json({message: "예약이 취소되었습니다."});
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
}

const checkVisit = async (req, res) => {
  const { reservation_number } = req.params;
  const { is_visit } = req.body;
  try {
    await reservationService.checkVisit(reservation_number, is_visit);

    return res.status(200).json({message: "방문여부가 반영되었습니다."});
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
}

module.exports = { getReservation, addReservation, updateReservation, deleteReservation, checkVisit }