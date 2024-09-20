# Clubhouse-like Chat Application

Welcome to the **Clubhouse-like Chat Application**, a real-time communication platform where multiple users can join a chat room and interact via voice and text. This application is built using **WebRTC** for peer-to-peer communication, **Node.js** for the backend server, and **React** for the frontend user interface.

## Features

- **Real-time Communication**: Users can join chat rooms and engage in voice chats with other participants.
- **Multiple Rooms**: Multiple chat rooms can be created, and users can easily switch between them.
- **Peer-to-Peer (P2P) Connections**: Powered by WebRTC, the app uses P2P technology for low-latency audio streaming.
- **Scalable Backend**: The backend server is built using Node.js, which supports real-time communication and scalability with WebSockets.
- **Cross-Browser Compatibility**: Works across modern browsers that support WebRTC technology.

## Tech Stack

### Frontend:
- **React.js**: The user interface is built with React to handle dynamic updates and provide a smooth user experience.
- **WebRTC**: Real-time peer-to-peer communication framework enabling voice chat between users.
- **Socket.IO**: Used for signaling between clients and the server, facilitating the connection setup process in WebRTC.

### Backend:
- **Node.js**: The backend is a lightweight and efficient server running on Node.js.
- **Express**: The application is powered by Express, providing routing and middleware for the server-side logic.
- **Socket.IO**: For real-time bi-directional communication between clients and the server to manage chat room events and signaling for WebRTC.
