const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/submit-form', async (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const goal = req.body.goal;

    try {
        await axios.post('https://hook.eu1.make.com/jvo42bimjpf0ffg0l45pky5ecz7p7xhf', {
            name: name,
            phone: phone,
            goal: goal
        });
        console.log('Data successfully sent to Make.com');
        res.status(200).send('Success: Data sent to Make.com');
    } catch (error) {
        console.error('Error sending data:', error.message);
        res.status(500).send('Error: Failed to send data to Make.com');
    }
});

app.listen(3000, () => {
    console.log('SmartGym Premium API running on port 3000');
});
