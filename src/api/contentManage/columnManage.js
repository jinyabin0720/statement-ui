import axios from '@/utils/axios';

//栏目新增接口
export const headingAdd = (data) => {
    return axios({
      url: '/cms/heading',
      method: 'post',
      data
    })
}
//栏目树搜索功能
export const headingSearch = (val) => {
    return axios({
      url: '/cms/heading?headingName=' + val,
      method: 'get'
    })
}
//栏目树列表 
export const headingTree = (id) => {
    if(!id){
        return axios({
            url: '/cms/heading',
            method: 'get'
        })
    }else{
        return axios({
            url: `/cms/heading?headingId=${id}`,
            method: 'get'
        })
    }
}
//栏目table列表
export const headingTable = (idTable,currentPage,pageSize,name) => {
    if(!name){
        return axios({
            url: '/cms/'+idTable+'/heading/'+currentPage+'/'+pageSize,
            method: 'get'
        })
    }else{
        return axios({
            url: '/cms/'+idTable+'/heading/'+currentPage+'/'+pageSize+'?headingName='+name,
            method: 'get'
        })
    }
}
//表格获取详情
export const getHeadingEdit = (id) => {
    return axios({
      url: `/cms/heading/${id}`,
      method: 'get'
    })
}
//表格删除
export const headingDelete = (id) => {
    return axios({
      url: `/cms/heading/${id}`,
      method: 'delete'
    })
}
//栏目新增接口
export const headingPut = (data) => {
    return axios({
      url: '/cms/heading',
      method: 'put',
      data
    })
}
//字典查询栏目内容模板
export const eosDict = (id) => {
    return axios({
      url: '/eosDict/children/'+id,
      method: 'get'
    })
}

//字典查询栏目内容模板
export const getTemplate = () => {
    return axios({
      url: '/cms/template/0/0',
      method: 'get'
    })
}