import { LOAD_REVIEWS, SET_KEYWORD, SET_PAGINATION } from '../constants/reviews'

const initialState = {
    page: 1,
    pagination: 0,
    count: 0,
    total: 0,
    keyword: '',
    url: 'https://www.shareview.ru/review',
    loaded: false,
    reviews: []
};


export default function header(state=initialState, action) {
    switch (action.type) {
        case LOAD_REVIEWS:
            return {...state,
                page: action.payload.page ? action.payload.page : state.page,
                total: action.payload.total ? action.payload.total : state.total,
                reviews: action.payload.reviews ? action.payload.reviews : state.reviews,
                count: action.payload.count ? action.payload.count : state.count,
                loaded: true
            }

        case SET_KEYWORD:
            return {...state, keyword: action.payload}

        case SET_PAGINATION:
            return {...state, pagination: action.payload}

        default:
            return state
    }
}

/*{
 id: 1,
 author: 'Елисеева Ирина',
 grades: 1,
 date: '22 Января 2016',
 assessment: '4',
 period: 'несколько месяцев',
 dignity: 'Все, что хотелось от велотренажера - есть в этой модели. Соотношение цена-качество - хорошее. Не слишком тяжел для перемещения . Устойчив, седло удобное, визуализация показаний понятная и вроде не врет.',
 disadvantages: 'Не найдено',
 review: 'Для не очень спортивных людей можно выбрать модель с меньшим весом диска - в этой не удается использовать положения больше 4.'
 },
 {
 id: 2,
 author: 'гумеров Рамиль',
 grades: 3,
 date: '23 Января 2016',
 assessment: '4',
 period: 'несколько месяцев',
 dignity: 'Все, что хотелось от велотренажера - есть в этой модели. Соотношение цена-качество - хорошее. Не слишком тяжел для перемещения . Устойчив, седло удобное, визуализация показаний понятная и вроде не врет.',
 disadvantages: 'Не найдено',
 review: 'Для не очень спортивных людей можно выбрать модель с меньшим весом диска - в этой не удается использовать положения больше 4.'
 },
 {
 id: 3,
 author: 'Ирина',
 grades: 15,
 date: '24 Января 2016',
 assessment: '4',
 period: 'несколько месяцев',
 dignity: 'Все, что хотелось от велотренажера - есть в этой модели. Соотношение цена-качество - хорошее. Не слишком тяжел для перемещения . Устойчив, седло удобное, визуализация показаний понятная и вроде не врет.',
 disadvantages: 'Не найдено',
 review: 'Для не очень спортивных людей можно выбрать модель с меньшим весом диска - в этой не удается использовать положения больше 4.'
 }*/