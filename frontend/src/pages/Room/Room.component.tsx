import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import useWebRTC from "../../hooks/useWebRTC";
import { getRoom } from "../../http";
import styles from "./Room.module.css";

const Room = () => {
  const history = useHistory();
  const { id: roomId } = useParams<any>();
  const user = useSelector((state: any) => state.auth.user);

  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);

  const [room, setRoom] = useState<any>();
  const [isMute, setIsMute] = useState(true);

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute]);

  const handleAllRoomsBack = () => {
    history.goBack();
  };

  useEffect(() => {
    (async () => {
      const { data } = await getRoom(roomId);
      console.log(`[DEBUG] room data`, data);
      setRoom(data);
    })();
  }, []);

  const handleMuteClick = (clientId: string) => {
    if (clientId !== user.id) {
      return;
    }
    setIsMute((prev) => !prev);
  };

  return (
    <div>
      <div className="container">
        <button onClick={handleAllRoomsBack} className={styles.goBack}>
          <img src="/images/arrow-left.png" alt="arrow-left" />
          <span>All voice rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src="/images/palm.png" alt="palm-icon" />
            </button>
            <button onClick={handleAllRoomsBack} className={styles.actionBtn}>
              <img src="/images/win.png" alt="win-icon" />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client: any) => {
            return (
              <div className={styles.client} key={client.id}>
                <div className={styles.userHead}>
                  <audio ref={(instance) => provideRef(instance, client.id)} autoPlay></audio>
                  <img className={styles.userAvatar} src={client.avatar} alt="avatar" />

                  <button className={styles.micBtn} onClick={() => handleMuteClick(client.id)}>
                    {client.muted ? (
                      <img src="/images/mic-mute.png" alt="mic-mute-icon" />
                    ) : (
                      <img src="/images/mic.png" alt="mic-icon" />
                    )}
                  </button>
                </div>
                <h4>{client.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
