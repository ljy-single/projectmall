import axios from 'axios'
export function request(config) {
  // 创建实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/mn',
    timeout: 10000
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    // Do something before request is sent
    return config;
  }, error => {
    // Do something with request error
    return Promise.reject(error);
  });

  // 响应拦截
  instance.interceptors.response.use(res => {
    // Do something before response is sent
    return res;
  }, error => {
    // Do something with response error
    return Promise.reject(error);
  });
  return instance(config)
}
