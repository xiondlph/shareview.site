import React, { Component, PropTypes } from 'react'

export default class Header extends Component {
    render() {
        const { shopInfo, price, currencyText, paymoLogo } = this.props

        return (
            <div className='paymo-widget__header'>
                <div className='pay-info pay-info_adapt-center'>
                    <div className='pay-info__number'>
                        <span className='pay-info__min-text'>{shopInfo.product}</span>
                        <span className='pay-info__big-text'>{shopInfo.name}</span>
                    </div>
                    <div className='pay-info__price'>
                        <span className='pay-info__min-text'>Сумма:</span>
                        <span className='pay-info__big-text'>{price}{currencyText}</span>
                    </div>
                </div>
                <div className='shop-info shop-info_left'>
                    {shopInfo.logo &&
                    <a href={shopInfo.url} className='logo'><img src={shopInfo.logo} alt={shopInfo.name} /></a>}
                    {shopInfo.url &&
                    <a href={shopInfo.url} className='back-shop'>назад в магазин</a>}
                </div>
                <div className='paymo-logo'><span className={'icon '+paymoLogo} /></div>
            </div>
        )
    }
}

Header.propTypes = {
    currencyText: PropTypes.string.isRequired,
    paymoLogo: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shopInfo: PropTypes.object.isRequired
}