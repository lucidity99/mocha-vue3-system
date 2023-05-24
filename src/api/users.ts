import request from '~/utils/http'

interface OrgTree {
  id: string
  name: string
  parentId: string
  type: string
  children: OrgTree[]
}

export default {
  getStaffList(params: {}) {
    return request({
      url: '/staff',
      params: params
    })
  },

  updateAccess2PC(params: { staffId: string; status: string }) {
    return request({
      url: `/staff/enablePassport?staffId${params.staffId}&enableStatus${params.status}`,
      params: params,
      method: 'post'
    })
  },

  fetchOrgTreeData() {
    return request({
      url: `/org/tree?orgType=VAZYME`
    })
  }
}
