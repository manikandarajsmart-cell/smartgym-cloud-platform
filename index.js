global.WebSocket = require('ws');
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Premium Enquiry Endpoint - Form Data Pipeline
app.post('/users', async (req, res) => {
  const { fullName, mobileNumber, profession, packageInterest, goals } = req.body;
  
  // Validation Check
  if (!fullName || !mobileNumber) {
    return res.status(400).json({ error: 'Name and WhatsApp number are required' });
  }

  try {
    // 1. Forwarding to Make.com Lead Automation Workflow
    fetch('https://hook.eu1.make.com/jvo42bimjpf0ffg8p4641y43y4rgh4a8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        phone: mobileNumber,
        profession: profession || 'Not Specified',
        package: packageInterest || 'Not Specified',
        goals: goals || 'Not Specified',
        time: new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"})
      })
    });

    // 2. Inserting data into Supabase Master Layer
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        name: fullName, 
        phone: mobileNumber,
        profession: profession,
        package: packageInterest,
        goals: goals
      }]);

    if (error) throw error;

    res.status(200).json({ message: 'Request submitted successfully!' });
  } catch (error) {
    console.error('Backend Pipeline Error:', error);
    res.status(500).json({ error: 'Server error. Processing failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SmartGym Premium API running on port ${PORT}`);
});
