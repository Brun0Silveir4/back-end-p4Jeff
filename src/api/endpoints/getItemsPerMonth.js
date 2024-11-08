const db = require('../config');

const getItemsPerMonth = async (req, res) => {
    try {
        const { month } = req.params; // Mês como string diretamente da URL

        const response = await db.collection("SensorData").get();
        const responseArr = [];

        if(isNaN(month) ||parseInt(month) < 1 || parseInt(month) > 12){
            throw new Error
        }

        response.forEach((data) => {
            const docData = data.data();
            const docMonth = docData.date.split("/")[1]; // Pegando o mês do formato dd/mm/yyyy

            // Comparação direta sem padStart, convertendo para números
            if (parseInt(docMonth) === parseInt(month) && month >= 1 && month <= 12) {
                responseArr.push(docData);
            } 
        });

        if (responseArr.length > 0) {
            res.status(200).json(responseArr);
        } else {
            res.status(404).json({ error: 'No data found for the specified month' });
        }
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = getItemsPerMonth;
