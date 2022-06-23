import { useCallback, useEffect, useRef } from "react";
import useStateWithCallback from "./useStateWithCallback";
import { socketInit } from "../socket";
import { ACTIONS } from "../actions";
// @ts-ignore
import freeice from "freeice";

const useWebRTC = (roomId: string, user: any) => {
  console.log("useWebRTC hook called");
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements: any = useRef({});
  const peerConnections: any = useRef({});
  const localMediaStream: any = useRef<Promise<MediaStream> | MediaStream>();
  const socket: any = useRef(null);
  const clientsRef: any = useRef([]);

  useEffect(() => {
    socket.current = socketInit();
    console.log("socket.current", socket.current);
  }, []);

  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);

  const addNewClient = useCallback(
    (newClient: any, cb: Function) => {
      const existingClient = clients.find((client: any) => client.id === newClient.id);
      if (!existingClient) {
        setClients((prevClients: any) => [...prevClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  /**
   * *Capturing Audio
   */
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      addNewClient({ ...user, muted: true }, () => {
        const localAudioElement = audioElements.current[user.id];
        if (localAudioElement) {
          localAudioElement.volume = 0; //So that users do not hear their own voice
          localAudioElement.srcObject = localMediaStream.current;
        }

        /**
         * *Emit socket events
         */
        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });

    return () => {
      localMediaStream.current.getTracks().forEach((track: any) => track.stop());
      socket.current.emit(ACTIONS.LEAVE, { roomId });
    };
  }, []);

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }: any) => {
      if (peerId in peerConnections.current) {
        return console.warn(`You are already connected with ${peerId} ${remoteUser}`);
      }

      peerConnections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      peerConnections.current[peerId].onicecandidate = (e: any) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: e.candidate,
        });
      };

      /**
       * *Handle on track on this connection
       */
      peerConnections.current[peerId].ontrack = ({ streams: [remoteStream] }: any) => {
        addNewClient({ ...remoteUser, muted: true }, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      /**
       * *Add local track to remote connection
       */
      localMediaStream.current.getTracks().forEach((track: any) => {
        peerConnections.current[peerId].addTrack(track, localMediaStream.current);
      });

      /**
       * *Create offer
       */
      if (createOffer) {
        const offer = await peerConnections.current[peerId].createOffer();

        await peerConnections.current[peerId].setLocalDescription(offer);

        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };

    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.current.off(ACTIONS.ADD_PEER);
    };
  }, []);

  /**
   * *Handle Ice Candidate
   */
  useEffect(() => {
    socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }: any) => {
      if (icecandidate) {
        peerConnections.current[peerId].addIceCandidate(icecandidate);
      }
    });

    return () => {
      socket.current.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  /**
   * *Handle Relay SDP
   */
  useEffect(() => {
    const handleRemoteSdp = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }: any) => {
      peerConnections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );

      /**
       * !If session description is of type offer then we have to send answer
       */
      if (remoteSessionDescription.type === "offer") {
        const connection = peerConnections.current[peerId];
        const answer = await connection.createAnswer();

        connection.setLocalDescription(answer);

        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };

    socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp);

    return () => {
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  /**
   * *Handle Remove Peer
   */
  useEffect(() => {
    const handleRemovePeer = async ({ peerId, userId }: any) => {
      if (peerConnections.current[peerId]) {
        peerConnections.current[peerId].close();
      }

      delete peerConnections.current[peerId];
      delete audioElements.current[peerId];

      setClients((clients: any) => clients.filter((client: any) => client.id !== userId));
    };
    socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    return () => {
      socket.current.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  /**
   * *Listen for mute/unmute
   */
  useEffect(() => {
    const setMute = (mute: boolean, userId: string) => {
      const clientIdx = clientsRef.current.map((client: any) => client.id).indexOf(userId);

      const connectedClients = JSON.parse(JSON.stringify(clientsRef.current));
      if (clientIdx > -1) {
        connectedClients[clientIdx].muted = mute;
        setClients(connectedClients);
      }
    };

    socket.current.on(ACTIONS.MUTE, ({ peerId, userId }: any) => {
      setMute(true, userId);
    });

    socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }: any) => {
      setMute(false, userId);
    });
  }, []);

  const provideRef = (instance: any, userId: string) => {
    audioElements.current[userId] = instance;
  };

  /**
   * *Handling Mute
   */
  const handleMute = (isMute: boolean, userId: string) => {
    let settled = false;
    const interval = setInterval(() => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks()[0].enabled = !isMute;
        if (isMute) {
          /**
           * *Telling other clients that this user has muted
           */
          socket.current.emit(ACTIONS.MUTE, {
            roomId,
            userId,
          });
        } else {
          socket.current.emit(ACTIONS.UNMUTE, {
            roomId,
            userId,
          });
        }
        settled = true;
      }
      if (settled) {
        clearInterval(interval);
      }
    }, 200);
  };

  return { clients, provideRef, handleMute };
};

export default useWebRTC;
