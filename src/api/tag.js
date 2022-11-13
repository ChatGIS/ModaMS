import request from "./request";

export const getTags = (params) => {
    return request({
        url: 'tag',
        params
    })
}