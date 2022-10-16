const { myDataSource } = require('./typeorm_connection');

const insertReservationUser = async (user_name, user_phone, user_email) => {
  const result = await myDataSource.query(`INSERT INTO reservation_user(user_name, phone, email) VALUES (?, ?, ?);`
  ,[user_name, user_phone, user_email]);

  return result.insertId;
}

const deleteReservationUser = async (user_id) => {
  await myDataSource.query(`DELETE FROM reservation_user WHERE id = ?`
  ,[user_id])
}

const updateReservationUser = async (user_name, user_phone, user_email, user_id) => {
  await myDataSource.query(`UPDATE reservation_user SET user_name = ?, phone = ?, email = ? WHERE id = ?`
  , [user_name, user_phone, user_email, user_id])
}

module.exports = { insertReservationUser, deleteReservationUser, updateReservationUser }