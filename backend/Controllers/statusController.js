const StatusCheck = require('../Models/statusModel');

const getStatusChecks = async (req, res) => {
  try {
    const statusChecks = await StatusCheck.find().limit(1000);
    res.json(statusChecks);
  } catch (error) {
    console.error('Error fetching status checks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createStatusCheck = async (req, res) => {
  try {
    const { client_name } = req.body;
    
    if (!client_name) {
      return res.status(400).json({ error: "client_name is required" });
    }

    const newStatus = new StatusCheck({ client_name });
    await newStatus.save();

    res.status(201).json(newStatus);
  } catch (error) {
    console.error('Error creating status check:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getStatusChecks,
  createStatusCheck
};