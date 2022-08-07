const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const DBURL = "mongodb://localhost/fullstack-ecommerce";
        const connect = await mongoose.connect(DBURL);
        console.log(`Successfully connected to DB: ${connect.connection.host}`);
    } catch (e) {
        console.log(e);
    }
};

module.exports = connectDB;
