const productArr = [];
for (let i = 1; i <= 100; i++) {
    const productObj = {
        name: `product number ${i}`,
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/SADF_emblem.svg/1200px-SADF_emblem.svg.png",
        description: `${i} SOME DESCRIPTION`,
        brand: `brand ${i}`,
        category: "Electronics",
        price: 930.0,
        countInStock: 10,
        rating: 0,
        numReviews: 0,
    };
    productArr.push(productObj);
}

module.exports = productArr;
