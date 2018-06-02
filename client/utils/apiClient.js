const API_URL = '/api';
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
   * @return {Promise}
   */
  fetch({ path, method, requestData }) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

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
    create: ({ value, date }) => this.fetch({
      method: 'post',
      path: ['deals'],
      requestData: {
        value,
        date,
      },
    }),
    delete: ({ id }) => this.fetch({
      method: 'delete',
      path: ['deals'],
      requestData: {
        id,
      },
    }),
  }
}

export default new ApiClient();
