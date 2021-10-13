const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteApartmentSchema = new Schema({
    apartment: {
        type: Schema.Types.ObjectId,
        ref: 'Apartment'
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
});

module.exports = mongoose.model('FavoriteApartment', favoriteApartmentSchema);