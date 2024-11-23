const db = require('../config');

const getAllItems = async (req, res) => {
    try {
        const response = await db.collection("SensorData").get();
        const entriesByDay = {};

        response.forEach((data) => {
            const docData = data.data();


            if (!docData.date || !docData.time) {
                return; 
            }


            if (!entriesByDay[docData.date] || compareTimes(docData.time, entriesByDay[docData.date].time)) {
                entriesByDay[docData.date] = docData;
            }
        });


        const sortedEntries = Object.values(entriesByDay).sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split("-").map(Number);
            const [dayB, monthB, yearB] = b.date.split("-").map(Number);

            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);

            return dateB - dateA;
        });


        const formattedEntries = sortedEntries.map(entry => {
            const [year, month, day] = entry.date.split("-").map(Number);
            entry.date = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
            return entry;
        });

        if (formattedEntries.length > 0) {
            res.json(formattedEntries);
        } else {
            res.json({ error: 'No valid data found' });
        }
    } catch (e) {
        console.log(e);
        res.json({ error: "Internal Server Error" });
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
