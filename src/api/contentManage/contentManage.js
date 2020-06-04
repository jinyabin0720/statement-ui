import axios from '@/utils/axios';

//内容table列表
export const articleTable = (idTable,currentPage,pageSize,name) => {
    if(!name){
        return axios({
            url: '/cms/heading/article/'+idTable+'/'+currentPage+'/'+pageSize,
            method: 'get'
        })
    }else{
        return axios({
            url: '/cms/heading/article/'+idTable+'/'+currentPage+'/'+pageSize+'?articleTitle='+name,
            method: 'get'
        })
    }
}
//删除 置顶
export const articleD = (id,status) => {
    return axios({
        url: '/cms/article/'+id+'/'+status,
        method: 'put'
    })
}
//高级查询
export const articleS = (idTable,currentPage,pageSize,data) => {
    return axios({
        url: '/cms/heading/article/'+idTable+'/'+currentPage+'/'+pageSize+'?articleSubTitle='+data.articleSubTitle+'&articleStatus='+data.articleStatus+'&author='+data.author+'&headingId='+data.headingId+'&issueDate='+data.issueDate,
        method: 'get'
    })
}
//内容获取详情
export const getArticleData = (id) => {
    return axios({
        url: `/cms/article/${id}`,
        method: 'get'
    })
}
//内容新增预览
export const articleAdd = (data) => {
    return axios({
        url: '/cms/article',
        method: 'post',
        data
    })
}
//内容新增预览
export const articleUpdata = (data) => {
    return axios({
        url: '/cms/article',
        method: 'put',
        data
    })
}