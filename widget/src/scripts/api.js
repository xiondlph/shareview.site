import { text } from '../constants/reviews'

export function getGetUrl(url, text, page) {
    page = +page || 0;
    text = encodeURIComponent(text);

    return url + '?text=' + text + '&page=' + page;
}

export function generateReviewsFromJSON(object) {
    if ( !Object.keys(object).length || Object.keys(object).length && !object.hasOwnProperty('opinion-list') ) {
        console.info('generateReviewsFromJSON - bad data from SERVER', generateReviewsFromJSON);
        return Object;
    }

    let obj = object['opinion-list'],
        newObj = {
            reviews: []
        };

    if ( obj.hasOwnProperty('page') ) newObj['page'] = obj.page;
    if ( obj.hasOwnProperty('total') ) newObj['total'] = obj.total;
    if ( obj.hasOwnProperty('count') ) newObj['count'] = obj.count;

    if ( obj.hasOwnProperty('opinion') ) {
        if ( obj.opinion.length ) {
            newObj.reviews = obj.opinion.map((item) => {
                let newItem = {};

                if ( item.hasOwnProperty('id') ) newItem['id'] = item.id;
                if ( item.hasOwnProperty('author') ) newItem['author'] = item.author;
                if ( item.hasOwnProperty('date') ) newItem['date'] = dateParse(item.date);
                if ( item.hasOwnProperty('grade') ) newItem['assessment'] = +item.grade + 3;
                if ( item.hasOwnProperty('author-info') && item['author-info'].hasOwnProperty('grades') ) newItem['grades'] = item['author-info'].grades;
                if ( item.hasOwnProperty('pro') ) newItem['dignity'] = item.pro;
                if ( item.hasOwnProperty('contra') ) newItem['disadvantages'] = item.contra;
                if ( item.hasOwnProperty('text') ) newItem['review'] = item.text;
                if ( item.hasOwnProperty('usage-time') ) newItem['period'] = text['usage-time'][item['usage-time']];

                return newItem;
            });
        } else {
            let newItem = {},
                opinionObj = obj.opinion;

            if ( opinionObj.hasOwnProperty('id') ) newItem['id'] = opinionObj.id;
            if ( opinionObj.hasOwnProperty('author') ) newItem['author'] = opinionObj.author;
            if ( opinionObj.hasOwnProperty('date') ) newItem['date'] = dateParse(opinionObj.date);
            if ( opinionObj.hasOwnProperty('grade') ) newItem['assessment'] = +opinionObj.grade + 3;
            if ( opinionObj.hasOwnProperty('author-info') && opinionObj['author-info'].hasOwnProperty('grades') ) newItem['grades'] = opinionObj['author-info'].grades;
            if ( opinionObj.hasOwnProperty('pro') ) newItem['dignity'] = opinionObj.pro;
            if ( opinionObj.hasOwnProperty('contra') ) newItem['disadvantages'] = opinionObj.contra;
            if ( opinionObj.hasOwnProperty('text') ) newItem['review'] = opinionObj.text;
            if ( opinionObj.hasOwnProperty('usage-time') ) newItem['period'] = text['usage-time'][opinionObj['usage-time']];

            newObj.reviews = [newItem];
        }
    }

    return newObj;
}

export function dateParse(data) {
    let _humanMonth = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декобря'
        ],
        _current    = new Date(),
        _date       = new Date(data),
        _year       = '',
        _month      = '',
        _day        = '';

    _year = ' ' + _date.getFullYear();

    if (_current.getMonth() !== _date.getMonth()) {
        _month = ' ' + _humanMonth[_date.getMonth()];
    }

    if (_current.getDate() - _date.getDate() > 1 || _month.length > 0 || _year.length > 0) {
        _month = _month.length > 0 ? _month : ' ' + _humanMonth[_date.getMonth()];
        _day = _date.getDate();
    } else if (_current.getDate() - _date.getDate() > 0) {
        _day = 'Вчера';
    } else {
        _day = 'Сегодня';
    }

    return _day + _month + _year;
}