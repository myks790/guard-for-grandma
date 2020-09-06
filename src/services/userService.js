import bcrypt from 'bcrypt';
import User from '../models/User';

const saltRounds = 12;

export default {
  async verify(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (user !== null) {
        const match = await bcrypt.compare(`${password}`, user.password);
        if (match) {
          return true;
        }
      }
    } catch (error) {
      return false;
    }
    return false;
  },

  async signUp() {
    const email = '';
    const password = '';
    try {
      const hashedPw = await bcrypt.hash(`${password}`, saltRounds);
      User.create({ email, password: hashedPw });
    } catch (error) {
      return false;
    }
    return true;
  },
};
