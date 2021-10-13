const FavoriteApartment = require('../../models/favoriteapartment');
const Apartment = require('../../models/apartment');
const { transformFavApartments } = require('./merge');

module.exports = {

    favoriteApartment: async (args, req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
    try {
      const favoriteApartments = await FavoriteApartment.find({users: req.userId});
      return favoriteApartments.map(favoriteApartment => {
        return transformFavApartments(favoriteApartment);
      })
    } catch (error) {
      throw error;
    }
  },

  createFavoriteApartment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedApartment = await Apartment.findOne({ _id: args.apartmentId });

    const favoriteApartment = new FavoriteApartment({
      users: req.userId,
      apartment: fetchedApartment,
    });
    const result = await favoriteApartment.save();
    return transformFavApartments(result);
  }
};