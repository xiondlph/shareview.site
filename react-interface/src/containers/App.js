import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../components/Header'

import * as headerActions from '../actions/HeaderActions'

class App extends Component {
    render() {
        const {
            header
        } = this.props;

        return (
            <div className='shareview-interface'>
                <Header
                    shopInfo={header.shopInfo}
                    paymoLogo={header.paymoLogo}
                    price={header.price}
                    currencyText={header.currencyText}
                />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        header: state.header
    }
}

function mapDispatchToProps(dispatch) {
    return {
        headerActions: bindActionCreators(headerActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)