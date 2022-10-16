
let 
reservation_number,
user_name, 
user_phone, 
user_email,  
reservation_time, 
reservation_date,
reservation_type_id;

const setReservation = (body) => {
  reservation_number = body.reservation_number;
  user_name = body.user_name;
  user_phone = body.user_phone;
  user_email = body.user_email;
  reservation_time = body.reservation_time;
  reservation_date = body.reservation_date;
  reservation_type_id = body.reservation_type_id;
}

const getRezHaskey = () => {
  return {
    reservation_number:false,
    user_name:false, 
    reservation_time:false,
    reservation_date:false,
    reservation_type_id:false
  }
}

const getReservation = () => {
  return {
    reservation_number,
    user_name, 
    user_phone, 
    user_email, 
    reservation_time,
    reservation_date, 
    reservation_type_id
  }
}

module.exports = { setReservation, getRezHaskey, getReservation}

