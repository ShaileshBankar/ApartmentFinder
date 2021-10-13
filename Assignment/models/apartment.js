const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
    name: {
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
    monthlyPrice: { 
        type: Number, 
        required: true,
    },
    areaInSqMeter: { 
        type: Number, 
        required: true,
    },
    noOfRooms: { 
        type: Number, 
        required: true,
    },
    apartmentCode: { 
        type: String, 
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Apartment', apartmentSchema);