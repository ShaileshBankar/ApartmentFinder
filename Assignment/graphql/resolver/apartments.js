const Apartment = require('../../models/apartment');
const User = require('../../models/user');
const { transformApartments } = require('./merge')

//this is for searching apartments
const SearchBy = {
  City: 'city',
  Country: 'country',
  NoOfRooms: 'noOfRooms',
};

module.exports = {

  //query
  apartment: async () => {
    try {
      const apartments = await Apartment.find();
      return apartments.map(apartment => {
        return transformApartments(apartment);
      });
    } catch (err) {
      throw err;
    }
  },

  //query
  searchApartments: async ({ searchBy, searchValue }) => {
    let searchedApartments;
    try {
      switch (searchBy) {
        case SearchBy.City:
          searchedApartments = await Apartment.find({ city: searchValue });
          break;

        case SearchBy.Country:
          searchedApartments = await Apartment.find({ country: searchValue });
          break;

        case SearchBy.NoOfRooms:
          searchedApartments = await Apartment.find({ noOfRooms: parseInt(searchValue) });
          break;

        default:
          searchedApartments = await Apartment.find();
          break;
      }

      return searchedApartments.map(apartment => {
        return transformApartments(apartment);
      });
    } catch (err) {
      throw err;
    }
  },

  //Mutation
  createApartment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const existingApartment = await Apartment.findOne({ apartmentCode: args.apartmentInput.apartmentCode })
      if (existingApartment) {
        throw new Error('This apartment is already created!');
      }
    } catch (error) {
      throw error;
    }

    const apartment = new Apartment({
      name: args.apartmentInput.name,
      city: args.apartmentInput.city,
      country: args.apartmentInput.country,
      monthlyPrice: args.apartmentInput.monthlyPrice,
      areaInSqMeter: args.apartmentInput.areaInSqMeter,
      noOfRooms: args.apartmentInput.noOfRooms,
      apartmentCode: args.apartmentInput.apartmentCode,
      creator: req.userId
    });

    let createdApartment;
    try {
      const result = await apartment.save();
      createdApartment = transformApartments(result);

      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }

      creator.createdApartments.push(apartment);
      await creator.save();

      return createdApartment;
    } catch (error) {
      throw error;
    }
  }
};