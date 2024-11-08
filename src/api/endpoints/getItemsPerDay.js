const db = require('../config')

const getItemsPerDay = async (req, res) => {
    try {
      const { day, month, year } = req.params;
      let obj = { media: "", values: "" };
      let tempValue;

      const response = await db.collection("SensorData").get();
      let responseArr = [];
      let valueArr = [];

      response.forEach((doc) => {
        const docData = doc.data();

        const [docDay, docMonth, docYear] = docData.date.split("/");

        if (docDay === day && docMonth === month && docYear === year) {
          tempValue = parseInt(docData.temp);
          valueArr.push(tempValue);
          responseArr.push(docData);
        }
      });
      let sum = valueArr.reduce((accumulator, value) => accumulator + value, 0);
      let media = sum / responseArr.length;

      obj.media = media;
      obj.values = responseArr;
      if (obj.values.length !== 0) {
        res.status(200).json(obj);
      } else {
        res.status(404).json({error: 'No data found'})
      }
    } catch (error) {
      res.status(400).json({ error: "No data found for the specified date" });
    }
  }

  module.exports = getItemsPerDay