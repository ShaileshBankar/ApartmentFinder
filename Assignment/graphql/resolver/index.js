const userResolver = require('./user');
const apartmentResolver = require('./apartments');
const favoriteApartmentResolver = require('./favorite-apartments');

const rootResolver = {
  ...userResolver,
  ...apartmentResolver,
  ...favoriteApartmentResolver
}

module.exports = rootResolver;