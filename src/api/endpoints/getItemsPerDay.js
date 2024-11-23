const db = require("../config");

const getItemsPerDay = async (req, res) => {
  try {
    const { day, month, year } = req.params; 
    let tempValue;

    const response = await db.collection("SensorData").get();
    let responseArr = [];
    let valueArr = [];

    if (isNaN(day) || parseInt(day) < 1 || parseInt(day) > 31) {
      console.error("Invalid day:", day);
      return res.status(400).json({ error: "Invalid day" });
  }

    if (isNaN(month) || parseInt(month) < 1 || parseInt(month) > 12) {
      console.error("Invalid month:", month);
      return res.status(400).json({ error: "Invalid month" });
  }


  if (isNaN(year) || parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear()) {
      console.error("Invalid year:", year);
      return res.status(400).json({ error: "Invalid year" });
  }


    response.forEach((doc) => {
      const docData = doc.data();

      if (!docData.date || !docData.time) {
        console.log(`Documento ignorado por dados incompletos: ${JSON.stringify(docData)}`);
        return; // Ignorar o documento
      }

      const [docYear, docMonth, docDay] = docData.date.split("-");


      if (docDay === day && docMonth === month && docYear === year) {
        tempValue = parseInt(docData.temp);
        valueArr.push(tempValue);
        responseArr.push(docData);
      }
    });

 
    responseArr.sort((a, b) => {
      const [aHour, aMinute, aSecond] = a.time.split(":").map(Number);
      const [bHour, bMinute, bSecond] = b.time.split(":").map(Number);

      if (aHour !== bHour) {
        return bHour - aHour; 
      } else if (aMinute !== bMinute) {
        return bMinute - aMinute; 
      } else {
        return bSecond - aSecond;  
      }
    });
    

    // Calcular a média
    let sum = valueArr.reduce((accumulator, value) => accumulator + value, 0);
    let media = parseFloat((sum / responseArr.length).toFixed(1));


    const formattedEntries = responseArr.map(entry => {
      const [docYear, docMonth, docDay] = entry.date.split("-");
      entry.date = `${docDay}/${docMonth}/${docYear}`;
      return entry;
    });

    const quantity = formattedEntries.length


    const obj = {
      media: media,
      quantity: quantity,
      values: formattedEntries,
    };

    if (obj.values.length !== 0) {
      res.status(200).json(obj);
    } else {
      res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    res.status(400).json({ error: "No data found for the specified date" });
  }
};

module.exports = getItemsPerDay;
