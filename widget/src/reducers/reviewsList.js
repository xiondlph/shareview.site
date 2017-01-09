import { LOAD_REVIEWS, SET_META_DATA, SET_PAGINATION, UPDATE_LOADING, NOT_REVIEWS } from '../constants/reviews'

const initialState = {
    page: 1,
    pagination: 0,
    count: 0,
    total: 0,
    keyword: '',
    url: '',
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
            };

        case SET_META_DATA:
            return {...state,
                keyword: action.payload.keyword ? action.payload.keyword : action.keyword,
                url: action.payload.url ? action.payload.url : action.url};

        case SET_PAGINATION:
            return {...state, pagination: action.payload};

        case UPDATE_LOADING:
            return {...state, loading: action.payload};

        case NOT_REVIEWS:
            return {...state, loaded: true, reviews: []};

        default:
            return state;
    }
}