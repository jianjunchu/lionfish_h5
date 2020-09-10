import request from '@/lionfish_comshop/utils/request'

export function http(params) {
  return request({
    url: '/wxapp.php',
    changeOrigin: true,
    method: 'get',
    params

  })
}
export function http_post(params) {
  return request({
    url: '/wxapp.php',
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
    url: '/wxapp.php',
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
    url: '/wxapp.php',
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
    url: '/wxapp.php',
    changeOrigin: true,
    method: 'get',
    params

  })
}
export function get_tabbar() {
  const params = {}
  params.controller = 'index.get_tabbar'
  return request({
    url: '/wxapp.php',
    changeOrigin: true,
    method: 'get',
    params

  })
}
