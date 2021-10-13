const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fName: { 
        type: String, 
        required: true,
    },
    lName: { 
        type: String, 
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: { 
        type: Number, 
        required: true,
    },
    createdApartments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Apartment'
        }
      ]
});

module.exports = mongoose.model('User', userSchema);