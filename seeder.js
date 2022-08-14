const connectDb = require("./config/db");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const productArr = require("./data/product");

connectDb();

const importData = async () => {
    // handling logic import data into DB
    try {
        // xóa dữ liệu cũ
        // await Product.deleteMany();
        // only admin can create new product
        const userAdmin = await User.findOne({ email: "1231234@gmail.com" });
        const sampleProducts = productArr.map((product) => {
            return { ...product, user: userAdmin._id };
        });
        await Product.insertMany(sampleProducts);
        console.log("DAta imported success!!!");
    } catch (e) {
        console.log("Error importing data");
    }
};

importData();
