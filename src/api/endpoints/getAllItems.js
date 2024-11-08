const db = require('../config')

const getAllItems = async (req, res) => {
    try {
      const response = await db.collection("SensorData").get();

      let responseArr = [];

      response.forEach((doc) => {
        responseArr.push(doc.data());
      });

      if (responseArr.length >= 1) {
        res.status(200).json(responseArr);
      } else {
        res.status(400).json({ error: "No data found" });
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }

module.exports = getAllItems