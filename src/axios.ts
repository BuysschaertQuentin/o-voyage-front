import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

class Client {
  axios: Axios;

  private static client: Client;

  static get api() {
    if (Client.client) {
      return Client.client;
    }
    return new Client();
  }

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://sea-turtle-app-8gaer.ondigitalocean.app/graphql',
    });
    this.intercept();
  }

  public async refreshToken(token: string) {
    const query = `
        mutation Mutation {
          refreshToken(refreshToken: "${token}" ) {
          accessToken
          refreshToken
        }
      }
        `;
    const { data } = await this.axios.post('', {
      query,
    });
    this.setAutorization(data.data.refreshToken.accessToken);
    return data.data.refreshToken;
  }

  private intercept() {
    this.axios.interceptors.response.use(async (response: AxiosResponse) => {
      if (response.data.errors) {
        if (response.data.errors[0].message === 'jwt expired') {
          const refreshToken = Cookies.get('refreshToken');
          await this.refreshToken(refreshToken!);
          return axios(response.config);
        }
        return Promise.reject(
          /**
           * En renvoyant une instance AxiosError on garde la logique d'axios pour les erreurs
           * cela vous permet d'utiliser axios de la même manière que la doc pour gérer les erreurs
           * et il fonctionnera également parfaitement avec les réponse du back.
           * @see {@link https://axios-http.com/docs/handling_errors}
           */
          new AxiosError(
            'Apollo Error',
            undefined,
            undefined,
            undefined,
            response
          )
        );
      }
      return response;
    });
  }

  public setAutorization(token: string) {
    this.axios.defaults.headers.common.Authorization = token;
  }

  public removeAuthorization() {
    this.axios.defaults.headers.common.Authorization = '';
  }
}

export default Client.api;
