## 1. API user

1. Register a new user

```
// @desc: Register a new user
// @route: POST https://mindx-ecommerce-api.herokuapp.com/api/users
// @access: Public - return token
// request body:
{
    "name": "user1",
    "email": "user1@gmail.com",
    "password": "123456",
    "isAdmin": false
}
```

2. Login

```
// @desc: Log user into the system
// @route: POST https://mindx-ecommerce-api.herokuapp.com/api/users/login
// @access: Public - return token
// request body:
{
    "email": "user1@gmail.com",
    "password": "123456"
}
```

3. Get Profile user

```
// @desc: Get user profile
// @route: GET https://mindx-ecommerce-api.herokuapp.com/api/users/profile
// @access: Private - Su dung token
```

4. Update Profile user

```
// @desc: update user profile
// @route: PUT https://mindx-ecommerce-api.herokuapp.com/api/users/profile
// @access: Private
// các field cho phép update: name, email, password
// request body:
{
    "name": "new name",
    "email": "new@gmail.com",
    "password": "1234567"
}
```

5. Get all users

```
// @desc: Get all users
// @route: GET https://mindx-ecommerce-api.herokuapp.com/api/users
// @access: Private/admin
```

6. Delete user

```
// @desc: Delete user
// @route: DELETE https://mindx-ecommerce-api.herokuapp.com/api/users/:id
// ID user mẫu đã có sẵn trong DB để test: 62fcf69e6e7e3d52212f36ea
// @access: Private/admin
```

7. Get user by ID

```
// @desc: Get user by ID
// @route: GET https://mindx-ecommerce-api.herokuapp.com/api/users/:id
// @access: Private/admin
```

8. Update user by ID

```
// @desc: Update user by ID
// @route: PUT https://mindx-ecommerce-api.herokuapp.com/api/users/:id
// ID user mẫu đã có sẵn trong DB để test: 62fcf87b6e7e3d52212f36fe
// @access: Private/admin
// các field cho phép update: name, email, password
// request body:
{
    "name": "new name",
    "email": "new@gmail.com",
    "password": "1234567"
}
```

## 2. API Product

1. Get all products

```
// @desc: Get all products
// @route: GET https://mindx-ecommerce-api.herokuapp.com/api/products
// @access: Public
```

2. Get product by ID

```
// @desc: Get product by ID
// @route: GET https://mindx-ecommerce-api.herokuapp.com/api/products/:id
// ID product mẫu đã có sẵn trong DB để test: 62fcf7fd6e7e3d52212f36fa
// @access: Public
```

3. Delete product by ID

```
// @desc: Delete product by ID
// @route: DELETE https://mindx-ecommerce-api.herokuapp.com/api/products/:id
// ID product mẫu đã có sẵn trong DB để test: 62fcf89e6e7e3d52212f3701
// @access: Private/admin
```

4. Create product

```
// @desc: Create product
// @route: POST https://mindx-ecommerce-api.herokuapp.com/api/products
// @access: Private/admin
// request body:
{
    "user": "62f1207354fe63ee8bbd0869",
    "name": "product3",
    "image": "image path",
    "brand": "brand3",
    "category": "category3",
    "description": "desc3",
    "price": 200,
    "countInStock": 12
}
```

5. Update a product

```
// @desc: Update a product
// @route: PUT https://mindx-ecommerce-api.herokuapp.com/api/products/:id
// @access: Private/admin
// các field cho phép update: brand, category, description
// request body:
{
    "brand": "new brand",
    "category": "new category",
    "description": "new desc"
}
```

6. Create new review for product

```
// @desc: Create new review for product
// @route: POST https://mindx-ecommerce-api.herokuapp.com/api/products/:id/reviews
// @access: Private
// request body:
{
    "name": "Review 1",
    "rating": 2,
    "comment": "Comment for review 1"
}
```

7. Get top 5 products (top 5 sản phẩm được rating trung bình cao nhất)

```
// @desc: Get top 5 products
// @route: GET https://mindx-ecommerce-api.herokuapp.com/api/products/top
// @access: Public
```

## 3. API Order

1. Get all orders

```
// @desc: Get all orders
// @route: GET https://mindx-ecommerce-api.herokuapp.com/api/orders
// @access: Private/admin
```

2. Get my orders

```
// @desc: Get my orders
// @route: GET https://mindx-ecommerce-api.herokuapp.com/api/orders/myorders
// @access: Private
```

3. Get order by id

```
// @desc: Get order by id
// @route: GET https://mindx-ecommerce-api.herokuapp.com/api/orders/:id
// @access: Private
```

4. Create new order

```
// @desc: Create new order
// @route: POST https://mindx-ecommerce-api.herokuapp.com/api/orders
// @access: Private
// request body:
{
    "orderItems": [
        {
            "qty": 5,
            "product": "62fcf7fd6e7e3d52212f36fa"
        }
    ],
    "shippingAddress": {
        "address": "Lang Ha",
        "city": "Ha Noi",
        "postalCode": "100000",
        "country": "Viet Nam"
    },
    "paymentResult": {
        "id": "62f8f831c906ece24bb0a252",
        "status": "unpaid",
        "email": "abc@gmail.com",
        "update_time": "12/02/2022"
    },
    "paymentMethod": "cash",
    "shippingPrice": 30
}
```

5. Update Order To Paid (cập nhật order từ chưa thanh toán -> đã thanh toán)

```
// @desc: Update Order To Paid
// @route: PUT https://mindx-ecommerce-api.herokuapp.com/api/orders/:id/pay
// @access: Private/admin
// request body:
{
    "status": "paid"
}
```
