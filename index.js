const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Address = require('./models/address');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/user_address_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


app.post('/register', async (req, res) => {
  console.log('Incoming request:', req.body);
  const { name, addressLine, city, zipCode } = req.body;

  try {
    
    const user = new User({ name });
    await user.save();
    console.log('User created:', user);

   
    const address = new Address({
      addressLine,
      city,
      zipCode,
      userId: user._id, 
    });
    await address.save();
    console.log('Address created:', address);

    user.addresses.push(address._id);
    await user.save();

    res.status(201).json({ message: 'User and Address saved!', user, address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// API to get all users and their associated addresses via GET request show we can see the data in our chrome if u want u can use otherwise comment out this
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('addresses').exec();
    res.status(200).json(users);  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
