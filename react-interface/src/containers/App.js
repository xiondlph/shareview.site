import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ReviewsList from '../components/ReviewsList'
import * as reviewsListActions from '../actions/ReviewsListActions'
import { text } from '../constants/reviews'


class App extends Component {
    componentDidMount() {
        const { reviewsListActions, keywordText, reviewsList, url } = this.props
        const { setMetaData, loadReviews, notReviews } = reviewsListActions

        setMetaData({
            keyword: keywordText,
            url: url
        });

        if ( !keywordText || !url ) {
            notReviews()
        } else {
            loadReviews(url, keywordText, reviewsList.page)
        }


    }

    render() {
        const {
            reviewsList,
            reviewsListActions
        } = this.props;

        const {
            reviews,
            loaded,
            page,
            count,
            total,
            pagination,
            url,
            keyword,
            loading
        } = reviewsList;

        const {
            loadReviews,
            setPagination
        } = reviewsListActions;

        return (
            <div className='shareview-interface sry'>
                {loaded &&
                <div className='sry'>
                    {reviews.length &&
                    <ReviewsList
                        loading={loading}
                        keyword={keyword}
                        url={url}
                        reviews={reviews}
                        page={page}
                        count={count}
                        total={total}
                        pagination={pagination}
                        loadReviews={loadReviews}
                        setPagination={setPagination}
                    />}
                    {!reviews.length &&
                    <div className='shareview-interface__not-reviews'>{text.notReviews}</div>}
                </div>}
                {!loaded && <div className='sry__loaded'><span className='loader' /></div>}
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