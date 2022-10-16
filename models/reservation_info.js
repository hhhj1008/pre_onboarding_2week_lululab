const { myDataSource } = require('./typeorm_connection');

const checkReservationInfo = async (date, hospital_id, reservation_time) => {
  return await myDataSource.query(
    `select id FROM reservation_info
    WHERE DATE(create_at)=?
    AND hospital_id = ?
    AND reservation_time = ?`
  , [date, hospital_id, reservation_time]);
}

module.exports = { checkReservationInfo }