const admin = require("firebase-admin");
const serviceAccount = require(`../${process.env.FIREBASE_KEY}`);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();


const controller = {
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
      }
}

module.exports = controller