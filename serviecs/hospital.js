const hospitalModel = require("../models/hospital");
const reservationInfoModel = require("../models/reservation_info");
const { throwErrorMsg } = require("./throwErrorMsg");

const getRezAbleHospitalList = async (params) => {
  const hospitals = await hospitalModel.selectHospital(params);

  if(hospitals.length == 0) {
    throwErrorMsg("올바른 데이터를 입력하였는지 확인해주세요.")
  }

  let datas = [];

  for (i = 0; i <= hospitals.length - 1; i++) {
    let reservation_interval = hospitals[i].reservation_interval;
    let open_time = hospitals[i].open_time;
    let close_time = hospitals[i].close_time;
    let lunch_start = hospitals[i].lunch_start;
    let lunch_end = hospitals[i].lunch_end;

    let hospital_name = hospitals[i].name;
    let hospital_id = hospitals[i].id;
    let hospital_tel = hospitals[i].tel;
    let hospital_addr = hospitals[i].addr;
    let business_hours = open_time + ":00" + " ~ " + close_time + ":00";
    let lunch_hours = lunch_start + ":00" + " ~ " + lunch_end + ":00";

    let reservation_total = 0;
    let times = [];

    for (y = open_time; y < close_time; y++) {
      // 영업 시작시간 마감시간으로 예약가능한 시간 목록 만듦

      if (lunch_start != 0) {
        // 점심시간이 없을 경우에는 0으로 설정
        if (y == lunch_start || y == lunch_end) {
          // 점심시간일 경우 제외
          continue;
        }
      }
      reservation_total++;
      times.push(y + ":00");
      if (reservation_interval != 0) {
        // 예약 간격이 없을 경우 한시간씩
        for (let x = reservation_interval; x < 60; x += reservation_interval) {
          // 예약 간격 ex) reservation_interval이 30일 경우 9시, 9시 30분, 10시, 10시 30분 ...
          reservation_total++;
          times.push(y + ":" + x);
        }
      }
    }

    let reservation_check = 0;

    for (z = 0; z <= times.length - 1; z++) {
      const checkReservation = await reservationInfoModel.checkReservationInfo(
        params.date,
        hospital_id,
        times[z]
      );

      if (checkReservation.length == 1) {
        reservation_check++;
      }
    }

    let is_reservation = "";
    if (reservation_total - reservation_check == 0) {
      is_reservation = "예약 불가능";
    } else {
      is_reservation = "예약 가능";
    }

    datas.push({
      hospital_name: hospital_name,
      hospital_tel: hospital_tel,
      hospital_addr: hospital_addr,
      business_hours: business_hours,
      lunch_hours: lunch_hours,
      is_reservation: is_reservation,
    });
  }

  return datas;
};

const getRezAbleHospitalOne = async (params) => {
  const hospitals = await hospitalModel.selectHospital(params);

  if(hospitals.length == 0) {
    throwErrorMsg("올바른 데이터를 입력하였는지 확인해주세요.")
  }

  let datas = [];

  let reservation_interval = hospitals[0].reservation_interval;
  let open_time = hospitals[0].open_time;
  let close_time = hospitals[0].close_time;
  let lunch_start = hospitals[0].lunch_start;
  let lunch_end = hospitals[0].lunch_end;

  let hospital_name = hospitals[0].name;
  let hospital_id = hospitals[0].id;

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

  let check_times = [];
  for (z = 0; z <= times.length - 1; z++) {
    const checkReservation = await reservationInfoModel.checkReservationInfo(params.date,hospital_id,times[z]);
    if (checkReservation.length == 1) {
      check_times.push(times[z]);
    }
  }
  times = times.filter(x => !check_times.includes(x));
  
  datas.push({ hospital_name: hospital_name, reservation_time: times});
  return datas;
};

module.exports = { getRezAbleHospitalList, getRezAbleHospitalOne };
