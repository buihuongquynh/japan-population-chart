import axios from 'axios'
import queryString from 'query-string';
const instance = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1", 
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*', 
    // 'Access-Control-Allow-Credentials': true,
    'X-API-KEY': '1xqiK5VEsE4T7PkLCPdJVhyIkfGS4JTkzuU6Vc7j'
  },
  paramsSerializer: params => {
    return queryString.stringify(params, {
      encode: false,
    });
  },
})
instance.interceptors.response.use(
  response => {
    if (response && response.data) { 
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);
export default instance