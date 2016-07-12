import { LOAD_REVIEWS, SET_KEYWORD, SET_PAGINATION, UPDATE_LOADING } from '../constants/reviews'

const initialState = {
    page: 1,
    pagination: 0,
    count: 0,
    total: 0,
    keyword: '',
    url: 'https://www.shareview.ru/review',
    loaded: false,
    loading: false,
    reviews: []
};


export default function header(state=initialState, action) {
    switch (action.type) {
        case LOAD_REVIEWS:
            return {...state,
                page: action.payload.page ? action.payload.page : state.page,
                total: action.payload.total ? action.payload.total : state.total,
                reviews: action.payload.reviews ? state.reviews.concat(action.payload.reviews) : state.reviews,
                count: action.payload.count ? action.payload.count : state.count,
                loaded: true,
                loading: false
            }

        case SET_KEYWORD:
            return {...state, keyword: action.payload}

        case SET_PAGINATION:
            return {...state, pagination: action.payload}

        case UPDATE_LOADING:
            return {...state, loading: action.payload}

        default:
            return state
    }
}