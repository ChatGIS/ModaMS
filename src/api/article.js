import request from "./request";

export const getArticle = (params) => {
    return request({
        url: 'article',
        params
    })
}

export const addArticle = (data) => {
    return request({
        url: 'article',
        method: 'post',
        data
    })
}

export const editArticle = (data) => {
    return request({
        url: `article/${data.id}`,
        method: 'put',
        data
    })
}

export const deleteArticle = (id) => {
    return request({
        url: `article/${id}`,
        method: 'delete'
    })
}

export const changeArticleState = (id, state) => {
    return request({
        url: `article/${id}/${state}`,
        method: 'put'
    })
}