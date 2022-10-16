const { myDataSource } = require('./typeorm_connection');

const selectHospital = async params =>{
  let value = [];
  let query = `SELECT 
  h.id,
  h.name,
  h.tel,
  h.addr,
  h.reservation_interval,
  h.open_time,
  h.close_time,
  h.lunch_start,
  h.lunch_end,
  t.type_name
  FROM hospital h
  LEFT JOIN hospital_type t ON h.type_id = t.id`;
  let where = ``;

  if(params.name) {
    if(!where) {
      where = ` WHERE h.name LIKE CONCAT('%', ?, '%')`;
    } else {
      where = where + ` AND h.name LIKE CONCAT('%', ?, '%')`
    }

    value.push(params.name);
  }

  if(params.type_id) {
    if(!where) {
      where = ` WHERE t.id = ?`;
    } else {
      where = where + ` AND t.id = ?`
    }
    value.push(type_id);
  }

  if(params.hospital_id) {
    where = ` WHERE h.id = ?`;
    value.push(params.hospital_id);
  }

  query = query + where;

  return await myDataSource.query(query, value);
}
module.exports = { selectHospital }