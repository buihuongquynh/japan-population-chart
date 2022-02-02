import queryString from 'query-string';
import * as axios from 'axios'
declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }

  export function create(arg0: {
    baseURL: string; headers: {
      'content-type': string; Accept: string;
      // 'Access-Control-Allow-Origin': '*', 
      // 'Access-Control-Allow-Credentials': true,
      'X-API-KEY': string;
    }; paramsSerializer: (params: Record<string, any>) => string;
  }) {
    throw new Error('Function not implemented.');
  }
}
const instance = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1", 
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*', 
    // 'Access-Control-Allow-Credentials': true,
    'X-API-KEY': '1xqiK5VEsE4T7PkLCPdJVhyIkfGS4JTkzuU6Vc7j'
  },
  paramsSerializer: (params: Record<string, any>) => {
    return queryString.stringify(params, {
      encode: false,
    });
  },
})
instance.interceptors.response.use(
  (  response: { data: any; }) => {
    if (response && response.data) { 
      return response.data;
    }
    return response;
  },
  (  error: any) => {
    throw error;
  },
);
export default instance