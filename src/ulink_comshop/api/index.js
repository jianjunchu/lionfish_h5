import request from '@/ulink_comshop/utils/request'

export function http(params, method = 'get') {
  if (!params.hasOwnProperty('controller')) {
    // eslint-disable-next-line no-debugger
    debugger
  }
  return request({
    changeOrigin: true,
    method: method,
    params

  })
}
export function http_post(params) {
  return request({
    changeOrigin: true,
    method: 'post',
    params

  })
}
export function index_info() {
  // eslint-disable-next-line no-new-object
  const params = new Object()
  params.controller = 'index.index_info'
  params.communityId = 4559

  return request({
    changeOrigin: true,
    method: 'get',
    params

  })
}



export function get_navigat(gid, pageNum) {
  // eslint-disable-next-line no-new-object
  const params = new Object()
  params.controller = 'index.get_navigat'

  return request({
    changeOrigin: true,
    method: 'get',
    params

  })
}

export function load_gps_goodslist(gid, pageNum) {
// eslint-disable-next-line no-new-object
  const params = new Object()
  params.controller = 'index.load_gps_goodslist'
  params.gid = gid
  params.pageNum = pageNum
  params.head_id = 4559
  params.per_page = 12
  return request({
    changeOrigin: true,
    method: 'get',
    params

  })
}
export function get_tabbar() {
  const params = {}
  params.controller = 'index.get_tabbar'
  return request({
    changeOrigin: true,
    method: 'get',
    params

  })
}
