const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require('./routes/auth.routes');
const { connectDB } = require("./lib/db");

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
