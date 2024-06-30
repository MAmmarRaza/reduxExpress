const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const cors = require('cors');

const app = express();
app.use(express.json());
// Middleware
app.use(cors());
app.use(session({
    secret: "sessionSecret",
    resave: false,
    saveUninitialized: true
  }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://20ntucs1120:WU6TAoQiyFljPJxO@blog-cluster.bvblv9k.mongodb.net/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple route
app.use("/auth", require('./Routes/AuthRoute'));
app.use("/test", require('./Routes/TestRoute'));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
