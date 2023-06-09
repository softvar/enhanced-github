const { io } = require("socket.io-client");

const socket = io("http://localhost:4000/", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
}
  );

  module.exports = { socket }