import { LOAD_REVIEWS, SET_KEYWORD, SET_PAGINATION } from '../constants/reviews'
import { getGetUrl, generateReviewsFromJSON } from '../scripts/api'

export function setKeyword(text) {
    return {
        type: SET_KEYWORD,
        payload: text
    }
}

export function setPagination(count, total) {
    let pagination = 0

    if ( total < count ) {
        pagination = 1
    } else if ( total > count ) {
        pagination = Math.ceil(total/count)
    }

    return {
        type: SET_PAGINATION,
        payload: pagination
    }
}

export function loadReviews(url, keyword, page) {
    let urlGET = getGetUrl(url, keyword, page);

    return (dispatch) => {
        fetch(urlGET, {
                method: 'get',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then((response)=>response.json())
            .then(json => {
                console.log(json);

                dispatch({
                    type: LOAD_REVIEWS,
                    payload: generateReviewsFromJSON(json)
                })
            });
    }
}