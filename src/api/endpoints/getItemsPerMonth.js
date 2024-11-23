const db = require('../config');

const getItemsPerMonth = async (req, res) => {
    try {
        const { month, year } = req.params; 

        console.log(`Received month: ${month} and year: ${year}`);


        if (isNaN(month) || parseInt(month) < 1 || parseInt(month) > 12) {
            console.error("Invalid month:", month);
            return res.status(400).json({ error: "Invalid month" });
        }


        if (isNaN(year) || parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear()) {
            console.error("Invalid year:", year);
            return res.status(400).json({ error: "Invalid year" });
        }

        const response = await db.collection("SensorData").get();
        const entriesByDay = {}; 


        response.forEach((data) => {
            try {
                const docData = data.data();
                if (!docData.date || !docData.time) {
                    console.log(`Documento ignorado por dados incompletos: ${JSON.stringify(docData)}`);
                    return; 
                }

                const [docYear, docMonth, docDay] = docData.date.split("-");

                
                if (parseInt(docMonth) === parseInt(month) && parseInt(docYear) === parseInt(year)) {

                    if (!entriesByDay[docDay] || compareTimes(docData.time, entriesByDay[docDay].time)) {
                        entriesByDay[docDay] = docData;
                    }
                }
            } catch (e) {
                console.error("Erro ao processar um documento:", e);
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
            const [docYear, docMonth, docDay] = entry.date.split("-");
            entry.date = `${docDay}/${docMonth}/${docYear}`;
            return entry;
        });


        if (formattedEntries.length > 0) {
            res.status(200).json(formattedEntries);
        } else {
            res.status(404).json({ error: 'No data found for the specified month and year' });
        }

    } catch (e) {
        console.error("Erro ao acessar o banco de dados:", e);
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

module.exports = getItemsPerMonth;
