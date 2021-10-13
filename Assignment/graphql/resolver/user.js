
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  user: async () => {
    try {
      const users = await User.find();
      return users.map(user => {
        return {
          ...user._doc,
          _id: user.id,
        };
      });
    } catch (err) {
      throw err;
    }
  },

  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email })
      if (existingUser) {
        throw new Error('User exists already');
      }
      const hashedPasswod = await bcrypt.hash(args.userInput.password, 12)

      const user = new User({
        email: args.userInput.email,
        password: hashedPasswod,
        fName: args.userInput.fName,
        lName: args.userInput.lName,
        city: args.userInput.city,
        country: args.userInput.country,
        phone: args.userInput.phone,
      });

      const result = await user.save();

      return { ...result._doc, password: null };
    } catch (error) {
      throw error;
    }
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error('User not found');
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Incorrect credentials');
    }

    const token = jwt.sign({ userId: user.id, userEmail: user.email }, 'secretkeyToHash',
      {
        expiresIn: '1h'
      }
    );

    return { userId: user.id, token: token }
  }

};