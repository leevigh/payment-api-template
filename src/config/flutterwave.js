const axios = require('axios');

async function initializePayment(data) {
    let config = {
        headers: {
            Authorization: `Bearer ${process.env.FLWSECKEY}`
        }
    }

    try {
        const response = await axios.post(`${process.env.FLWURL}`, data, config)

        return response.data
    } catch (error) {
        console.log("Initialization error", error);
        return error
    }
}

module.exports = initializePayment;
