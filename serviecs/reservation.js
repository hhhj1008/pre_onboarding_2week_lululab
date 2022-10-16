const reservationUserModel = require("../models/reservation_user");
const reservationInfoModel = require("../models/reservation_info");
const hospitalModel = require("../models/hospital");
const noShowModel = require("../models/noshow");
const { throwErrorMsg } = require("./throwError");

// 예약 조회
const getReservation = async (reservation_number) => {
  const datas = await reservationInfoModel.selectReservationInfo(reservation_number);

  if (datas.length == 0) 
    throwErrorMsg("예약 정보가 없습니다.");

  return datas;
}

// 병원 예약
const addReservation = async (params) => {
  const date = new Date();

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateStr = year + month + day;

  // 예약 번호 생성
  let reservation_number = await reservationInfoModel.CheckReservationNumber(dateStr);

  if (reservation_number) {
    reservation_number = Number(reservation_number[0].reservation_number) + 1;
  } else {
    reservation_number = dateStr + 000001;
  }

  // 예약 시간 체크
  const hospitals = await hospitalModel.selectHospital(params);

  if (hospitals.length == 0) {
    throwErrorMsg("올바른 데이터를 입력하였는지 확인해주세요.");
  }

  let reservation_interval = hospitals[0].reservation_interval;
  let open_time = hospitals[0].open_time;
  let close_time = hospitals[0].close_time;
  let lunch_start = hospitals[0].lunch_start;
  let lunch_end = hospitals[0].lunch_end;

  let times = [];

  for (y = open_time; y < close_time; y++) {
    if (lunch_start != 0) {
      if (y == lunch_start || y == lunch_end) {
        continue;
      }
    }
    times.push(y + ":00");
    if (reservation_interval != 0) {
      for (let x = reservation_interval; x < 60; x += reservation_interval) {
        times.push(y + ":" + x);
      }
    }
  }

  const checkReservation = await reservationInfoModel.checkReservationInfo(params.reservation_date,params.hospital_id,params.reservation_time);
  if (checkReservation.length == 1) {
    if (checkReservation[0].reservation_time === params.reservation_time) {
      throwErrorMsg("해당 시간은 예약이 불가능 합니다.");
    }
  }

  const check_noshow = await noShowModel.CheckNoShowUser(params.user_name,params.user_phone,params.user_email);

  let user_id = "";
  if (check_noshow == 0) {
    user_id = await reservationUserModel.insertReservationUser(params.user_name,params.user_phone,params.user_email);
    if (!user_id) 
      throwErrorMsg("예약을 하는 중 문제가 발생했습니다.");
  } else {
    throwErrorMsg(
      "이전 예약 시 방문을 하지 않은 기록이 있습니다. 병원과 상의 바랍니다."
    );
  }

  const values = {
    reservation_number: reservation_number,
    hospital_id: params.hospital_id,
    user_id: user_id,
    reservation_time: params.reservation_time,
    reservation_date: params.reservation_date,
    reservation_type_id: params.reservation_type_id,
  };

  // 예약 정보 입력
  const result = await reservationInfoModel.insertReservationInfo(values);

  if (!result) {
    throwErrorMsg("예약을 하는 중 문제가 발생했습니다.");
    await reservationUserModel.deleteReservationUser(user_id);
  }
};

// 병원 예약 변경
const updateReservation = async (params) => {
  const reservation_info = await reservationInfoModel.selectReservationInfo(
    params.reservation_number
  );

  if (reservation_info.length == 0) throwErrorMsg("예약 정보가 없습니다.");
  else {
    let hospital_id = reservation_info[0].hospital_id;

    params = {
      reservation_number: params.reservation_number,
      user_name: params.user_name,
      user_phone: params.user_phone,
      user_email: params.user_email,
      reservation_time: params.reservation_time,
      reservation_date: params.reservation_date,
      reservation_type_id: params.reservation_type_id,
      hospital_id: hospital_id,
    };

    let reservation_info_id = reservation_info[0].reservation_info_id;
    let user_id = reservation_info[0].user_id;
    let reservation_time = reservation_info[0].reservation_time;

    // 예약자 정보 변경
    await reservationUserModel.updateReservationUser(params.user_name, params.user_phone, params.user_email, user_id);

    // 예약 시간 체크
    if (reservation_time != params.reservation_time) {
      const hospitals = await hospitalModel.selectHospital(params);

      if (hospitals.length == 0)
        throwErrorMsg("올바른 데이터를 입력하였는지 확인해주세요.");

      let reservation_interval = hospitals[0].reservation_interval;
      let open_time = hospitals[0].open_time;
      let close_time = hospitals[0].close_time;
      let lunch_start = hospitals[0].lunch_start;
      let lunch_end = hospitals[0].lunch_end;

      let times = [];

      for (y = open_time; y < close_time; y++) {
        if (lunch_start != 0) {
          if (y == lunch_start || y == lunch_end) {
            continue;
          }
        }
        times.push(y + ":00");
        if (reservation_interval != 0) {
          for (let x = reservation_interval; x < 60; x += reservation_interval) {
            times.push(y + ":" + x);
          }
        }
      }

      const checkReservation = await reservationInfoModel.checkReservationInfo(params.reservation_date, params.hospital_id, params.reservation_time);
      if (checkReservation.length == 1) {
        if (checkReservation[0].reservation_time === params.reservation_time) {
          throwErrorMsg("해당 시간은 예약이 불가능 합니다.");
        }
      }
    } 

    // 예약 정보 수정
    await reservationInfoModel.updateReservationInfo(params.reservation_time, params.reservation_date, params.reservation_type_id, reservation_info_id);
  }
};

// 예약 취소
const deleteReservation = async (reservation_number) => {
  await reservationInfoModel.deleteReservationInfo(reservation_number);
}

// 방문여부 확인
const checkVisit = async (reservation_number, is_visit) => {
  await reservationInfoModel.checkVisit(reservation_number, is_visit);

  if(is_visit == 2) {
    const datas = await reservationInfoModel.selectReservationInfo(reservation_number);

    await noShowModel.insertNoShow(datas[0].user_id, datas[0].reservation_info_id);
  }
}

module.exports = { getReservation, addReservation, updateReservation, deleteReservation, checkVisit };
