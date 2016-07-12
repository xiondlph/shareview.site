import { text } from '../constants/reviews'

export function getGetUrl(url, text, page) {
    page = +page || 0
    text = encodeURIComponent(text)

    return url + '?text=' + text + '&page=' + page
}

export function generateReviewsFromJSON(object) {
    if ( !Object.keys(object).length || Object.keys(object).length && !object.hasOwnProperty('modelOpinions') ) {
        console.log('generateReviewsFromJSON - bad data from SERVER', generateReviewsFromJSON);
        return Object;
    }

    let obj = object['modelOpinions'],
        newObj = {
            reviews: []
        };

    if ( obj.hasOwnProperty('page') ) newObj['page'] = obj.page;
    if ( obj.hasOwnProperty('total') ) newObj['total'] = obj.total;
    if ( obj.hasOwnProperty('count') ) newObj['count'] = obj.count;

    if ( obj.hasOwnProperty('opinion') ) {
        newObj.reviews = obj.opinion.map((item) => {
            let newItem = {};

            if ( item.hasOwnProperty('id') ) newItem['id'] = item.id;
            if ( item.hasOwnProperty('author') ) newItem['author'] = item.author;
            if ( item.hasOwnProperty('date') ) newItem['date'] = dateParse(item.date);
            if ( item.hasOwnProperty('grade') ) newItem['assessment'] = +item.grade + 3;
            if ( item.hasOwnProperty('authorInfo') && item.authorInfo.hasOwnProperty('grades') ) newItem['grades'] = item.authorInfo.grades;
            if ( item.hasOwnProperty('pro') ) newItem['dignity'] = item.pro;
            if ( item.hasOwnProperty('contra') ) newItem['disadvantages'] = item.contra;
            if ( item.hasOwnProperty('text') ) newItem['review'] = item.text;
            if ( item.hasOwnProperty('usageTime') ) newItem['period'] = text.usageTime[item.usageTime];

            return newItem;
        });
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