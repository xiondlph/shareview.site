import React, { Component, PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import MaskedInput from 'react-maskedinput'
// import fetch from 'isomorphic-fetch'

import { FILDES } from '../constants/fields'
import { buildCardSavedDom, setMyCartsDom } from './methods/CardPayMethods'
import { MyCardsList } from './MyCardsList'

export const fields = [
    'phoneNumber',
    'email',
    'cardNumber',
    'cardHolder',
    'cvv',
    'expireDateMonth',
    'expireDateYear'
]

const validate = values => {
    const errors = {}

    if ( !values.phoneNumber ) {
        errors.phoneNumber = FILDES.requiredText
    } else if ( !FILDES.regx.phone.test(values.phoneNumber) ) {
        errors.phoneNumber = FILDES.error.phoneNumber
    }

    if ( values.email && !FILDES.regx.email.test(values.email) ) {
        errors.email = FILDES.error.email
    }

    if ( !values.cardNumber || !FILDES.regx.cart.test(values.cardNumber.replace(' ', '')) ) {
        errors.cardNumber = FILDES.error.cart
    }

    return errors
}

class CartPay extends Component {
    _onChange(e) {
        let stateChange = {}
        stateChange[e.target.name] = e.target.value
        this.setState(stateChange)
    }

    _onChangeCartHolder(e) {
        e.target.value = e.target.value.toUpperCase()
        let stateChange = {}
        stateChange[e.target.name] = e.target.value
        this.setState(stateChange)
    }

    getMyCarts(phone) {
        const { getMyCartList } = this.props

        getMyCartList(phone)
    }

    _showHideMyListCarts(bool) {
        const { showHideMyCarts, myCarts } = this.props

        if ( typeof bool == 'boolean' && myCarts.length) {
            showHideMyCarts(bool)
        } else {
            showHideMyCarts(false)
        }
    }

    _setCardSaved(id, active) {
        const { setCardSaved } = this.props

        if ( active ) setCardSaved(id)
    }

    _clearCardSaved(func) {
        const { clearCardSaved } = this.props

        clearCardSaved()
        if ( typeof func === 'function' ) func()
    }

    render() {
        const {
            fields: {
                phoneNumber,
                email,
                cardNumber,
                cardHolder,
                cvv,
                expireDateMonth,
                expireDateYear
            },
            visible,
            myCartsVisible,
            myCarts,
            personInfo,
            loaders,
            cardSaved,
            changeAgreement,
            agreementStatus
        } = this.props

        if ( !phoneNumber.invalid && phoneNumber.active ) {
            if ( personInfo.tell != phoneNumber.value ) {
                personInfo.tell = phoneNumber.value;
                this.getMyCarts(phoneNumber.value)
            }
        }

        if ( !email.invalid && email.active ) {
            if ( personInfo.email != email.value ) {
                personInfo.email = email.value;
            }
        }

        let myCartsLenght,
            myCartList,
            myCartsClass,
            myCartsLoader,
            paymentCardsClasses = 'payment-cards payment-cards__new',
            cardSavedDom,
            submitButton;

        if ( agreementStatus ) {
            submitButton = (
                    <div className='button-wrapper animated bounceIn'>
                        <input type='submit' value='Оплатить' className='button' />
                    </div>
                )
        } else {
            submitButton = (
                <div className='button-wrapper animated bounceIn disabled'>
                    <input type='submit' value='Оплатить' disabled='true' className='button' />
                </div>
            )
        }

        if ( myCarts.length ) {
            myCartsLenght = <i className='my-carts-length animated bounceIn'>{myCarts.length}</i>

            myCartList = myCarts.map((item, index)=>setMyCartsDom(item, index, ::this._setCardSaved))
        }

        if ( loaders.myCarts ) {
            myCartsLoader = <l className='loader-block animated bounceIn'><i className='loader' /></l>
        }

        if ( myCartsVisible ) {
            paymentCardsClasses += ' bluring'

            myCartsClass = 'user-cards animated animated-fast bounceInRight'
/*
            if ( myCarts.length > 4 ) {
                myCartsClass += ' user-cards--more-four '
            }*/
        } else {
            myCartsClass = 'pm-hidden'
        }

        if ( Object.keys(cardSaved).length ) {
            cardSavedDom = buildCardSavedDom(cardSaved)
        } else {
            cardSavedDom = ''
        }

        return (
            <form action='' id='main_form' method='POST' className={visible?'':'pm-hidden'}>
                <div className='payment-form'>
                    <div className='common-form'>
                        <div className='payment-details'>
                            <div className='payment-details-item'>
                                <div className='payment-details-item_title'>Сумма платежа</div>
                                <div className='payment-details-item_value'>15000 Р</div>
                            </div>
                            <div className='payment-details-item'>
                                <div className='payment-details-item_title'>Комиссия (2%):</div>
                                <div className='payment-details-item_value'>300Р</div>
                            </div>
                            <div className='payment-details-item payment-details-item__total'>
                                <div className='payment-details-item_title'>Итого:</div>
                                <div className='payment-details-item_value'>15300Р</div>
                            </div>
                        </div>
                        <div className={
                            phoneNumber.invalid && phoneNumber.touched && phoneNumber.error ?
                                'field field__phone field__invalid' : phoneNumber.touched && phoneNumber.visited ?
                                    'field field__phone field__valid': 'field field__phone'
                        }>
                            <label htmlFor='phoneNumber'>*Ваш номер телефона:</label>
                            <div className='field-input'>
                                <MaskedInput mask='+7 (111) 111-11-11' type='tel' onChange={this._onChange} {...phoneNumber} />
                            </div>
                            <div className='field-error'>
                                {phoneNumber.touched && phoneNumber.error && <span className='field__invalid'>{phoneNumber.error}</span>}
                            </div>
                        </div>
                        <div className={
                            email.invalid && email.touched && email.error ?
                                'field field__phone field__invalid' : email.touched && email.visited ?
                                    'field field__phone field__valid': 'field field__phone'
                        }>
                            <label htmlFor='email'>Ваш email:</label>
                            <div className='field-input'>
                                <input
                                    type='text'
                                    placeholder='ivanpetrov@gmail.com'
                                    {...email}
                                />
                            </div>
                            <div className='field-error'>
                                {email.value && email.touched && email.error && <span className='field__invalid'>{email.error}</span>}
                            </div>
                            <div className='field-description'>
                                На этот адрес мы отправим вам информацию об оплате
                            </div>
                        </div>
                        <div className={agreementStatus?'payment-agreement':'payment-agreement payment-agreement--error'}>
                            <div className='field field__checkbox'>
                                <input
                                    id='agreement'
                                    type='checkbox'
                                    defaultChecked={agreementStatus?'checked':''}
                                    name='agreement'
                                />
                                <label htmlFor='agreement' onClick={()=>changeAgreement(!agreementStatus)}>
                                    Я согласен с <a target='_blank' href='#'>условиями использования</a> сервиса
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='payment-method-form'>
                        <div className={paymentCardsClasses}>
                            <p>Данные Вашей банковской карты передаются по защищенному протоколу <br/> в банк-эквайер в зашифрованном виде</p>

                            <div className='payment-cards-buttons'>
                                <div className={myCartsLenght?'payment-cards-button payment-cards-button__my payment-cards-button__my--active':'payment-cards-button payment-cards-button__my'}
                                     onClick={()=>::this._showHideMyListCarts(true)}
                                >
                                    Мои карты
                                    {myCartsLenght}
                                    {myCartsLoader}
                                </div>
                                <div className={
                                        cardSavedDom?'payment-cards-button payment-cards-button__new payment-cards-button__new--active':'payment-cards-button payment-cards-button__new'
                                    }
                                    onClick={()=>::this._clearCardSaved()}
                                >Новая карта</div>
                            </div>

                            <div className='payment-card payment-card__face'>
                                {cardSavedDom}
                                <div className={cardSavedDom?'payment-card_form payment-card_form--hidden':'payment-card_form'}>
                                    <div className='field field__card-number'>
                                        <label htmlFor='cardNumber'>Номер карты:</label>
                                        <div className='field-input'>
                                            <MaskedInput mask='1111 1111 1111 1111 11' type='tel' name='cardNumber' onChange={this._onChange} {...cardNumber} />
                                        </div>
                                    </div>

                                    <div className='field field__card-holder'>
                                        <label htmlFor='cardHolder'>Имя и фамилия (как указано на карте):</label>
                                        <div className='field-input'>
                                            <input type='text' placeholder='VALERIAN ANTONOV' name='cardHolder' onChange={this._onChangeCartHolder}  {...cardHolder} />
                                        </div>
                                    </div>

                                    <div className='field field__inline field__expiredate'>
                                        <label>Срок действия:</label>
                                        <div className='field-input'>
                                            <div className='field field__expiredate-month'>
                                                <div className='fit-width ahr-select'>
                                                    <select className='expire' id='month' title='Месяц' name='expireDateMonth' {...expireDateMonth}>
                                                        <option className='bs-title-option' value=''>Месяц</option>
                                                        <option value='01'>Январь</option>
                                                        <option value='02'>Февраль</option>
                                                        <option value='03'>Март</option>
                                                        <option value='04'>Апрель</option>
                                                        <option value='05'>Май</option>
                                                        <option value='06'>Июнь</option>
                                                        <option value='07'>Июль</option>
                                                        <option value='08'>Август</option>
                                                        <option value='09'>Сентябрь</option>
                                                        <option value='10'>Октябрь</option>
                                                        <option value='11'>Ноябрь</option>
                                                        <option value='12'>Декабрь</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='field field__expiredate-year '>
                                                <div className='fit-width ahr-select'>
                                                    <select className='expire' id='year' title='Год' name='expireDateYear' {...expireDateYear}>
                                                        <option value=''>Год</option>
                                                        <option value='26'>2026</option>
                                                        <option value='25'>2025</option>
                                                        <option value='24'>2024</option>
                                                        <option value='23'>2023</option>
                                                        <option value='22'>2022</option>
                                                        <option value='21'>2021</option>
                                                        <option value='20'>2020</option>
                                                        <option value='19'>2019</option>
                                                        <option value='18'>2018</option>
                                                        <option value='17'>2017</option>
                                                        <option value='16'>2016</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className={
                                    cardSavedDom ?
                                        'payment-card payment-card__reverse payment-card__reverse--hidden' :
                                        'payment-card payment-card__reverse'
                                    }>
                                <div className='field'>
                                    <div className='field-wrapper'>
                                        <label htmlFor='cvv'>CVC/CVV2:</label>
                                        <div className='field-input'>
                                            <MaskedInput mask='111' type='password' placeholder='•••' disabled={cardSavedDom?'disabled=true':''}  id='cvv' name='cvv' onChange={this._onChange} {...cvv} />
                                        </div>
                                    </div>
                                    <div className='field-description'>3 последние цифры на оборотной стороне карты</div>
                                </div>
                            </div>

                            <div className='payment-card_description'>Вы будете перенаправлены на страницу банка, <br /> который выпустил вашу карту, чтобы ввести одноразовый пароль.</div>
                        </div>
                        <div className={myCartsClass}>
                            <div className='user-cards__close-button'  onClick={()=>::this._showHideMyListCarts(false)}></div>
                            <MyCardsList
                                myCardsLength={myCarts.length}
                                myCartList={myCartList}
                                newFunc={()=>::this._clearCardSaved(()=>::this._showHideMyListCarts(false))}
                            />
                        </div>
                    </div>
                </div>
                <div className='button-panel'>
                    {submitButton}
                </div>
                <div className='payment-timelimit'>
                    <div className='payment-timelimit_countdown'>00:00</div>
                </div>
            </form>
        )
    }
}

CartPay.propTypes = {
    fields:             PropTypes.object.isRequired,
    personInfo:         PropTypes.object,
    cardSaved:          PropTypes.object,
    loaders:            PropTypes.object,

    visible:            PropTypes.bool,
    myCartsVisible:     PropTypes.bool,
    newCart:            PropTypes.bool,
    agreementStatus:    PropTypes.bool,

    getMyCartList:      PropTypes.func,
    showHideMyCarts:    PropTypes.func,
    setCardSaved:       PropTypes.func,
    clearCardSaved:     PropTypes.func,
    changeAgreement:    PropTypes.func,

    myCarts:            PropTypes.array
}

export default CartPay = reduxForm({
    form: 'cart-pay',
    fields,
    validate
})(CartPay);
