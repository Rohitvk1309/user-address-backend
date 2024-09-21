const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  addressLine: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
