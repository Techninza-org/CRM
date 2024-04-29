const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('./utils/multerConfig')
const employeeController = require('./controller/employeeAuth');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');



//Middleware setup
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.static("./uploads"));



// MongoDB setup
const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('MongoDB database connected');
});


//Route setup
app.use('/api', employeeController);
app.use('/api', projectRoutes);
app.use('/api', userRoutes);
app.use('/api', taskRoutes);



//Port setup
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

