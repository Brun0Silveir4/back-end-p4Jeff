const db = require('../config');

const getAllItems = async (req, res) => {
    try {
        const response = await db.collection("SensorData").get();
        const entriesByDay = {};

        response.forEach((data) => {
            const docData = data.data();
            const docDate = docData.date; 
            
            if (!entriesByDay[docDate] || compareTimes(docData.time, entriesByDay[docDate].time)) {
                entriesByDay[docDate] = docData; 
                console.log(entriesByDay[docDate])
            }
        });

        const sortedEntries = Object.values(entriesByDay).sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split("/").map(Number);
            const [dayB, monthB, yearB] = b.date.split("/").map(Number);

            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);

            return dateB - dateA; 
        });

        console.log(sortedEntries)

        if (sortedEntries.length > 0) {
            res.status(200).json(sortedEntries);
        } else {
            res.status(404).json({ error: 'No data found' });
        }
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

function compareTimes(time1, time2) {
    const [hour1, minute1] = time1.split(":").map(Number);
    const [hour2, minute2] = time2.split(":").map(Number);

    if (hour1 !== hour2) {
        return hour1 > hour2; 
    }
    return minute1 > minute2; 
}

module.exports = getAllItems;
