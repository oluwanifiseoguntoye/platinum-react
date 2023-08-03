const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const OrderModel = require('./models/orders'); 
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('./passwordUtils');
const { authenticateToken } = require('./authMiddleware');
dotenv.config()



const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());



mongoose.connect(
  "mongodb+srv://BePlatinum:EnergyCorporation@beplatinum.8wm4qez.mongodb.net/BePlatinum?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const adminPassword = process.env.ADMIN_PASSWORD;

(async () => {
  try {
    const hashedAdminPassword = await hashPassword(adminPassword);
    process.env.ADMIN_PASSWORD = hashedAdminPassword;
  } catch (error) {
    console.error('Error hashing admin password:', error);
    process.exit(1); 
  }
})();

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username === process.env.ADMIN_USERNAME) {
      const hashedAdminPassword = process.env.ADMIN_PASSWORD;

      const isPasswordMatch = await comparePassword(password, hashedAdminPassword);

      if (isPasswordMatch) {
        const token = jwt.sign({ username: process.env.ADMIN_USERNAME }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/getOrders', authenticateToken, async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order data:', error);
    res.status(500).json({ error: 'Error fetching order data' });
  }
});

app.post('/createOrder', async (req, res) => {
    try {
      const newOrder = new OrderModel({
        productId: req.body.productId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        aptNumber: req.body.aptNumber,
        city: req.body.city,
        postalCode: req.body.postalCode,
        province: req.body.province,
      });
  
      const savedOrder = await newOrder.save();
  
      const orderId = savedOrder._id.toString().slice(-4);
  
      savedOrder.orderId = orderId;
      await savedOrder.save();
  
      res.status(201).json({ orderId });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Error creating order' });
    }
  });
  
  app.delete('/deleteOrder/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
  
    try {
      const deletedOrder = await OrderModel.findOneAndDelete({ orderId });
  
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Error deleting order' });
    }
  });
  

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});