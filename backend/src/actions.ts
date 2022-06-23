export const ACTIONS = {
  JOIN: "join",
  LEAVE: "leave",
  ADD_PEER: "add-peer",
  RELAY_ICE: "relay-ice", //from  client to server
  RELAY_SDP: "relay-sdp", //from  client to server
  ICE_CANDIDATE: "ice-candidate", //from server to client
  SESSION_DESCRIPTION: "session-description", //from server to client
  REMOVE_PEER: "remove-peer",
  MUTE: "mute",
  UNMUTE: "unmute",
};
