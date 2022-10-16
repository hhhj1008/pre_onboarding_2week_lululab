const { myDataSource } = require('./typeorm_connection');

const CheckNoShowUser = async (user_name, phone, email) => {
  return await myDataSource.query(
    `SELECT
    ri.reservation_number,
    ru.user_name,
    ru.phone,
    ru.email
    FROM noshow n
    LEFT JOIN reservation_user ru ON n.user_id = ru.id
    LEFT JOIN reservation_info ri ON n.reservation_id = ri.id
    WHERE ru.user_name = ?
    AND ru.phone = ?
    OR ru.email = ?`
    , [user_name, phone, email]
  );
}

const insertNoShow = async (user_id, reservation_info_id) => {
  await myDataSource.query(
    `INSERT INTO noshow(user_id, reservation_id) VALUES(?, ?)`
    , [user_id, reservation_info_id]
  )
}

module.exports = { CheckNoShowUser, insertNoShow }