"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : null;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}
exports.default = UserDto;
//# sourceMappingURL=user-dto.js.map