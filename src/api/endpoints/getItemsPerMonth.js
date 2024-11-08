const db = require('../config');

const getItemsPerMonth = async (req, res) => {
    try {
        const { month } = req.params; 

        const response = await db.collection("SensorData").get();
        let latestEntry = null;

        
        if(isNaN(month) || parseInt(month) < 1 || parseInt(month) > 12){
            return res.status(400).json({ error: "Invalid month" });
        }

        response.forEach((data) => {
            const docData = data.data();
            const docMonth = docData.date.split("/")[1]; 

            
            if (parseInt(docMonth) === parseInt(month)) {
            
                if (!latestEntry || compareTimes(docData.time, latestEntry.time)) {
                    latestEntry = docData;
                }
            }
        });

        if (latestEntry) {
            res.status(200).json(latestEntry);
        } else {
            res.status(404).json({ error: 'No data found for the specified month' });
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

module.exports = getItemsPerMonth;
