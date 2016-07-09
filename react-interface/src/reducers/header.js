const initialState = {
    paymoLogo: 'icon__paymo-logo-150',
    shopInfo: {
        name: '',
        product: 'Оплата заказа №665428 в магазине',
        url: 'http://www.tehnosila.ru/',
        logo: 'http://www.tehnosila.ru/res/base/img/main-logo.png'
    },
    price: 15000.39,
    currencyText: 'P'
};


export default function header(state=initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}