const axios = require('axios');

const getUsers = async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        if (response.status === 200) {
            const data = response.data;
            res.json(data);
        } else {
            res.status(response.status).json({ error: `Failed to fetch data from the API. Status Code: ${response.status}` });
        }
    } catch (error) {
        console.error('Error while fetching data from the API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (response.status === 200) {
            const data = response.data;
            res.json(data);
        } else {
            res.status(response.status).json({ error: `Failed to fetch user data from the API. Status Code: ${response.status}` });
        }
    } catch (error) {
        console.error(`Error while fetching user data for ID ${userId} from the API:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getUsers,
    getUserById
};