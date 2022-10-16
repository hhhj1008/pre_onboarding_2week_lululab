const { myDataSource } = require('./typeorm_connection');

const checkReservationInfo = async (date, hospital_id, reservation_time) => {
  return await myDataSource.query(
    `select id, reservation_time FROM reservation_info
    WHERE reservation_date = ?
    AND hospital_id = ?
    AND reservation_time = ?`
  , [date, hospital_id, reservation_time]);
}

const CheckReservationNumber = async (dateStr) => {
  return await myDataSource.query(
    `SELECT reservation_number FROM reservation_info
    WHERE reservation_number LIKE CONCAT('%', ?, '%')
    ORDER BY reservation_number DESC
    LIMIT 1`
    , [dateStr]
  )
}

const insertReservationInfo = async (values) => {
  const result = await myDataSource.query(
    `INSERT INTO reservation_info (reservation_number, hospital_id, user_id, reservation_time, reservation_date, reservation_type_id) VALUES (?, ?, ?, ?, ?, ?)`
    , [values.reservation_number,
       values.hospital_id,
       values.user_id,
       values.reservation_time,
       values.reservation_date,
       values.reservation_type_id]
  )

  return result.insertId;
}

const selectReservationInfo = async (reservation_number) => {
  console.log('test>>>>> ', reservation_number);
  return await myDataSource.query(
    `SELECT
    ri.id AS reservation_info_id, 
    ri.reservation_number,
    h.id AS hospital_id,
    h.name,
    ri.reservation_type_id,
    rt.type_name,
    ru.id AS user_id,
    ru.user_name,
    ru.phone,
    ru.email,
    ri.reservation_time,
    ri.reservation_date,
    ri.create_at
    FROM reservation_info ri
    LEFT JOIN reservation_user ru ON ri.user_id = ru.id
    LEFT JOIN reservation_type rt ON ri.reservation_type_id = rt.id
    LEFT JOIN hospital h ON ri.hospital_id = h.id
    LEFT JOIN hospital_type ht ON h.type_id = ht.id
    WHERE ri.reservation_number = ?`
    ,[reservation_number]
  )
}

const updateReservationInfo = async (reservation_time, reservation_date, reservation_type_id, reservation_info_id) => {
  await myDataSource.query(
    `UPDATE reservation_info SET reservation_time = ?, reservation_date = ?, reservation_type_id = ? WHERE id = ?`
    ,[reservation_time, reservation_date, reservation_type_id, reservation_info_id]
  )
}

const deleteReservationInfo = async (reservation_number) => {
  await myDataSource.query(
    `DELETE FROM reservation_info WHERE reservation_number = ?`
    , [reservation_number]
  )
}

const checkVisit = async (reservation_number, is_visit) => {
  await myDataSource.query(
    `UPDATE reservation_info SET is_visit = ? WHERE reservation_number = ?`
    , [is_visit, reservation_number]
  )
}

module.exports = { 
  checkReservationInfo, 
  CheckReservationNumber, 
  insertReservationInfo, 
  selectReservationInfo, 
  updateReservationInfo, 
  deleteReservationInfo, 
  checkVisit }