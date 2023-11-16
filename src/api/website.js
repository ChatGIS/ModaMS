import request from "./request";

export const getWebsite = (params) => {
    return request({
        url: 'websites',
        params
    })
}

export const addWebsite = (data) => {
    return request({
        url: 'websites',
        method: 'post',
        data
    })
}

export const editWebsite = (data) => {
    return request({
        url: `websites/${data.id}`,
        method: 'put',
        data
    })
}

export const deleteWebsite = (id) => {
    return request({
        url: `websites/${id}`,
        method: 'delete'
    })
}
/**
 * @description: 网站总数
 * @return {*}
 */
export const totalWeb = () => {
    return request({
        url: 'totalWeb',
        // params
    })
}
/**
 * @description: 网站分组
 * @return {*}
 */
export const groupWeb = () => {
    return request({
        url: 'groupWeb',
        // params
    })
}