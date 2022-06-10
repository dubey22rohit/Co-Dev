import User from "../models/User";
class UserService {
  public async findUser(filter) {
    const user = await User.findOne(filter);
    return user;
  }

  public async createUser(data) {
    const user = await User.create(data);
    return user;
  }
}

export default new UserService();
