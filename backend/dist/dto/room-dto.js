"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoomDto {
    constructor(room) {
        this.id = room.id;
        this.topic = room.topic;
        this.roomType = room.roomType;
        this.ownerId = room.ownerId;
        this.speakers = room.speakers;
        this.createdAt = room.createdAt;
    }
}
exports.default = RoomDto;
//# sourceMappingURL=room-dto.js.map