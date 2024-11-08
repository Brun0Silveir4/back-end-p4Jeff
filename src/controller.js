const admin = require("firebase-admin");
const serviceAccount = require(`../${process.env.FIREBASE_KEY}`);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const controller = {
  // GET  getAllData
  getAllItems: async (req, res) => {
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
  },

  // GET /getItemsPerDay/:day/:month/:year
  getItemsPerDay: async (req, res) => {
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
      if (responseArr.length > 0) {
        res.status(200).json(obj);
      }
    } catch (error) {
      res.status(400).json({ error: "No data found for the specified date" });
    }
  }

};

module.exports = controller;
