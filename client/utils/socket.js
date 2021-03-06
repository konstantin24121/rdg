import io from 'socket.io-client';

class Socket {
  static io;
  checkSocketDate = webSocketId => this.io.id !== webSocketId;

  static handlers;
  /**
   * Start listen socet.io event
   * @param  {string}   event    Event name
   * @param  {Function} callback
   * @param  {Object}   options
   * @return {void}
   */
  listen = ({ event, callback, options }) => {
    if (this.handlers.includes(event)) return;
    this.handlers.push(event);
    this.io.on(event, ({ webSocketId, ...response }) => {
      if (options.broadcast) {
        if (this.checkSocketDate(webSocketId)) {
          callback(response);
        }
      } else {
        callback(response);
      }
    });
  }

  /**
   * Someone create new deal
   */
  onNewDeal = (callback, options) => this.listen({
    event: 'new_deal',
    callback,
    options,
  })

  /**
   * Someone remove deal
   */
  onRemoveDeal= (callback, options) => this.listen({
    event: 'remove_deal',
    callback,
    options,
  })

  /**
   * Connect to server
   */
  connect() {
    this.handlers = [];
    this.io = io('/');
  }
}

export default new Socket();
