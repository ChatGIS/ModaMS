import request from "./request";

export const getSaying = (params) => {
    return request({
        url: 'saying',
        params
    })
}

export const addSaying = (data) => {
    return request({
        url: 'saying',
        method: 'post',
        data
    })
}

export const editSaying = (data) => {
    return request({
        url: `saying/${data.id}`,
        method: 'put',
        data
    })
}

export const deleteSaying = (id) => {
    return request({
        url: `saying/${id}`,
        method: 'delete'
    })
}