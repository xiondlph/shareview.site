import { LOAD_REVIEWS, SET_KEYWORD, SET_PAGINATION, UPDATE_LOADING } from '../constants/reviews'
import { getGetUrl, generateReviewsFromJSON } from '../scripts/api'


export function updateLoading(bool) {
    return {
        type: UPDATE_LOADING,
        payload: bool
    }
}

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
        dispatch({
            type: UPDATE_LOADING,
            payload: true
        })

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