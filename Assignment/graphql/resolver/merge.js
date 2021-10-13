const Apartment = require('../../models/apartment')
const User = require('../../models/user')

const transformApartments = apartment => {
    return {
      ...apartment._doc,
      _id: apartment.id,
      creator: user.bind(this, apartment.creator)
    };
  };

const transformFavApartments = favoriteApartment => {
    return {
      ...favoriteApartment._doc, _id: favoriteApartment.id,
      users: user.bind(this, favoriteApartment._doc.users),
      apartment: singleApartment.bind(this, favoriteApartment._doc.apartment),
    };
  };  

const user = async userId => {
    try {
      const user = await User.findById(userId)
  
      return {
        ...user._doc,
        _id: user._id,
        createdApartments: apartments.bind(this, user._doc.createdApartments)
      };
    } catch (error) {
      throw error;
    }
  };
  
  const apartments = async apartmentIds => {
    try {
      const apartments = await Apartment.find({ _id: { $in: apartmentIds } });
      return apartments.map(apartment => {
        return transformApartments(apartment);
      });
    } catch (err) {
      throw err;
    }
  };
  
  const singleApartment = async apartmentId => {
    try {
      const apartment = await Apartment.findById(apartmentId);
      return transformApartments(apartment);
    } catch (error) {
      throw error;
    }
  };

  exports.transformApartments = transformApartments;
  exports.transformFavApartments = transformFavApartments;


//   exports.user = user;
//   exports.apartments = apartments;
//   exports.singleApartment = singleApartment;