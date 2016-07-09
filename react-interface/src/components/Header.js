import React, { Component, PropTypes } from 'react'

export default class Header extends Component {
    render() {
        const { shopInfo, price, currencyText, paymoLogo } = this.props

        return (
            <div className='paymo-widget__header'>
                <h1>React shareview interface</h1>
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