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

/**
 * @description: 语录分组
 * @param {*} params
 * @return {*}
 */
export const groupSaying = () => {
    return request({
        url: 'groupSaying',
        // params
    })
}

/**
 * @description: 语录总数
 * @return {*}
 */
export const totalSaying = () => {
    return request({
        url: 'totalSaying',
        // params
    })
}