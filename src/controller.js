const admin = require("firebase-admin");
const serviceAccount = require(`../${process.env.FIREBASE_KEY}`);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const controller = {
  // getAllData
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

  getItemsPerDay: async (req, res) => {
    try {
      const { day, month, year } = req.params;
      console.log(`Dia: ${day}, Mês: ${month}, Ano: ${year}`);

      const response = await db.collection("SensorData").get();
      let responseArr = [];

      response.forEach((doc) => {
        const docData = doc.data();

        const [docDay, docMonth, docYear] = docData.date.split("/");

        if (docDay === day && docMonth === month && docYear === year) {
          responseArr.push(docData);
        }
      });

      if (responseArr.length > 0) {
        res.status(200).json(responseArr);
      }
    } catch (error) {
        res.status(400).json({ error: "No data found for the specified date" });
    }
  },
};

module.exports = controller;
