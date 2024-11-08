require("dotenv").config();
const express = require("express");

const app = express();
const admin = require("firebase-admin");
const serviceAccount = require(`../${process.env.FIREBASE_KEY}`);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(process.env.FIREBASE_KEY);

app.get("/getAllData", async (req, res) => {
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
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
