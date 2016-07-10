import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ReviewsList from '../components/ReviewsList'
import * as reviewsListActions from '../actions/ReviewsListActions'
import { text } from '../constants/reviews'

class App extends Component {
    render() {
        const { reviewsList } = this.props
        const { reviews } = reviewsList

        return (
            <div className='shareview-interface sry'>
                {reviews.length &&
                <ReviewsList
                    reviews={reviews}
                />}
                {!reviews.length &&
                <div className='shareview-interface__not-reviews'>{text.notReviews}</div>}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        reviewsList: state.reviewsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reviewsListActions: bindActionCreators(reviewsListActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)