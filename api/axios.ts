import queryString from 'query-string';
const { default: axios } = require('axios');
const instance = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1", 
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
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