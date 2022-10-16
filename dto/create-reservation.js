
let user_name, 
user_phone, 
user_email, 
hospital_id, 
reservation_time, 
reservation_date,
reservation_type_id;

const setReservation = (body) => {
  user_name = body.user_name;
  user_phone = body.user_phone;
  user_email = body.user_email;
  hospital_id = body.hospital_id;
  reservation_time = body.reservation_time;
  reservation_date = body.reservation_date;
  reservation_type_id = body.reservation_type_id;
}

const getRezHaskey = () => {
  return {
    user_name:false, 
    hospital_id:false, 
    reservation_time:false,
    reservation_date:false,
    reservation_type_id:false
  }
}

const getReservation = () => {
  return {
    user_name, 
    user_phone, 
    user_email, 
    hospital_id, 
    reservation_time,
    reservation_date, 
    reservation_type_id
  }
}

module.exports = { setReservation, getRezHaskey, getReservation}

