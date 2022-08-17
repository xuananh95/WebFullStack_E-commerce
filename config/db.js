const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const DBURL = "mongodb://localhost/fullstack-ecommerce";
        // const DBURL =
        //     "mongodb+srv://xuananhvo95:acidsulfuricH2SO4@cluster-mindx.0piavfz.mongodb.net/fullstack-ecommerce?retryWrites=true&w=majority";
        const connect = await mongoose.connect(DBURL);
        console.log(`Successfully connected to DB: ${connect.connection.host}`);
    } catch (e) {
        console.log(e);
    }
};

module.exports = connectDB;
