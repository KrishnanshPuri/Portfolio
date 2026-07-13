const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const contactRoutes = require('./Routes/contactRoutes');
const statusRoutes = require('./Routes/statusRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.use(cors({
  origin: process.env.CORS_ORIGINS,
  credentials: true,
}));

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME })
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api/status', statusRoutes);
app.use('/api/contact', contactRoutes);
app.get('/api', (req, res) => {
  res.json({ message: "Portfolio API is live", owner: "Krishnansh Puri" });
});


process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});