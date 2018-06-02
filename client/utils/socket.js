import io from 'socket.io-client';

class Socket {
  static io;
  connect() {
    this.io = io('/');
  }
}

export default new Socket();
