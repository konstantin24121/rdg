const API_URL = '/api';
import Socket from 'utils/socket';

class ApiClient {
  /**
   * Return url for fetching from API
   * @param  {string} path        url path to method after version
   */
  createFetchUrl = ({ path }) => {
    const pathArray = [
      API_URL,
    ].concat(path);
    return pathArray.join('/');
  }

  /**
   * Create fetch request to backend
   * @param  {string} path        url path to method after version
   * @param  {string} method      request method (GET, POST, e.g)
   * @param  {object} requestData
   * @param  {boolean} withSocketId flag for adding webSocketId header at headers
   * @return {Promise}
   */
  fetch({ path, method, requestData, withSocketId }) {
    const commonHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (withSocketId) {
      commonHeaders.socketId = Socket.io.id;
    }

    const headers = new Headers(commonHeaders);
    const url = this.createFetchUrl({ path });
    const request = new Request(url, {
      method,
      headers,
      body: JSON.stringify(requestData),
    });
    return fetch(request)
      .catch(() => { throw new Error('FETCH_FAILED'); })
      .then((res) => {
        switch (res.status) {
          case 500:
          case 401: {
            throw Error(res.status);
          }
          case 404: {
            if (method === 'GET') {
              throw Error(res.status);
            }
            return res.json();
          }
          case 400: // Bad Requiest - error in response body
          case 201: // Created
          case 200: // Ok
          default: return res.json();
        }
      })
      .then((response) => {
        if (!response.success) throw Error(response.error);
        if (response.data) return response.data;
        return response;
      });
  }

  /**
   * Deals API methods
   */
  deals = {
    get: requestData => this.fetch({
      method: 'get',
      path: ['deals', requestData.id],
    }),
    list: () => this.fetch({
      method: 'get',
      path: ['deals'],
    }),
    create: ({ value, date, socketId }) => this.fetch({
      method: 'post',
      path: ['deals'],
      requestData: {
        value,
        date,
        clientId: socketId,
      },
      withSocketId: true,
    }),
    delete: ({ id, socketId }) => this.fetch({
      method: 'delete',
      path: ['deals'],
      requestData: {
        id,
        clientId: socketId,
      },
      withSocketId: true,
    }),
  }
}

export default new ApiClient();
