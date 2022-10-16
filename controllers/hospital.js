const hospitalService = require('../serviecs/hospital');

const getRezAbleHospitalList = async (req, res) => {
  const { name, date, type_id } = req.query;

  if(!date) {
    return res.status(403).json({ message: '날짜를 선택해주세요!'});
  }

  try {
    const params = { name, date, type_id };
    const data = await hospitalService.getRezAbleHospitalList(params);

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
}

const getRezAbleHospitalOne = async (req, res) => {
  const { date } = req.query;
  const { hospital_id } = req.params;

  if(!date) {
    return res.status(403).json({ message: '날짜를 선택해주세요!'});
  }

  try {
    const params = { hospital_id, date };
    const data = await hospitalService.getRezAbleHospitalOne(params);

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
}

module.exports = { getRezAbleHospitalList, getRezAbleHospitalOne }