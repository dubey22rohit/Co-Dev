import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWebRTC from "../../hooks/useWebRTC";
import styles from "./Room.module.css";

const Room = () => {
  const { id: roomId } = useParams<any>();
  const user = useSelector((state: any) => state.auth.user);

  const { clients, provideRef } = useWebRTC(roomId, user);
  return (
    <div>
      <h1>All connected clients</h1>
      {clients.map((client: any) => {
        return (
          <div key={client.id} className={styles.userHead}>
            <audio src="" autoPlay ref={(instance) => provideRef(instance, client.id)}></audio>
            <img src={client.avatar} alt={client.username} className={styles.userAvatar} />
            <h4>{client.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
