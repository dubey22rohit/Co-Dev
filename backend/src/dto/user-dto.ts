class UserDto {
  id;
  phone;
  name;
  avatar;
  activated;
  createdAt;
  constructor(user) {
    this.id = user._id;
    this.name = user.username;
    this.avatar = user.avatar;
    this.phone = user.phone;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

export default UserDto;
