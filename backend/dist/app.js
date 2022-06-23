"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const actions_1 = require("./actions");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: ["http://localhost:3000"], methods: ["GET", "POST"] },
});
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use("/storage", express_1.default.static(__dirname + "/storage"));
(0, database_1.default)();
app.use(express_1.default.json({ limit: "10mb" }));
app.use("/", routes_1.default);
const PORT = process.env.PORT || 5000;
let socketUserMapping = {};
io.on("connection", (socket) => {
    console.log("new connection", socket.id);
    socket.on(actions_1.ACTIONS.JOIN, ({ roomId, user }) => {
        socketUserMapping[socket.id] = user;
        //JS Map() to Array
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(actions_1.ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user,
            });
            socket.emit(actions_1.ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMapping[clientId],
            }); //To join self
        });
        socket.join(roomId);
    });
    //Handle relay ice
    socket.on(actions_1.ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
        io.to(peerId).emit(actions_1.ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            icecandidate,
        });
    });
    //Handle relay sdp(session description)
    socket.on(actions_1.ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(actions_1.ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        });
    });
    /**
     * *Handle mute/unmute
     */
    socket.on(actions_1.ACTIONS.MUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(actions_1.ACTIONS.MUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });
    socket.on(actions_1.ACTIONS.UNMUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(actions_1.ACTIONS.UNMUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });
    /**
     * *Handle Room Leave
     */
    const leaveRoom = ({ roomId }) => {
        const { rooms } = socket;
        Array.from(rooms).forEach((roomId) => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
            clients.forEach((clientId) => {
                var _a, _b;
                io.to(clientId).emit(actions_1.ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: (_a = socketUserMapping[socket.id]) === null || _a === void 0 ? void 0 : _a.id,
                });
                socket.emit(actions_1.ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: (_b = socketUserMapping[clientId]) === null || _b === void 0 ? void 0 : _b.id,
                });
            });
            socket.leave(roomId);
        });
        delete socketUserMapping[socket.id];
    };
    socket.on(actions_1.ACTIONS.LEAVE, leaveRoom);
    // @ts-ignore
    socket.on("disconnecting", leaveRoom);
});
server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
//# sourceMappingURL=app.js.map