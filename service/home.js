import request from './network.js';

export function getMultidata() {
  return request({
    url: '/home/multidata'
  })
}