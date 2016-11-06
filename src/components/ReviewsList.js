import React, { Component, PropTypes } from 'react'
import ReviewItem from './ReviewItem'
import ReviewPagination from './ReviewPagination'

export default class ReviewsList extends Component {
    componentWillMount() {
        const { setPagination, count, total } = this.props;

        setPagination(count, total)
    }

    render() {
        const { reviews, pagination, page, url, loadReviews, keyword, loading } = this.props;

        return (
            <div className='sry__reviews'>
                {reviews.map(review =>
                    <ReviewItem
                        key={review.id}
                        review={review}
                    />
                )}
                {pagination && page!=pagination &&
                <ReviewPagination
                    loading={loading}
                    page={page}
                    pageLoad={(pg)=>{
                        if(pg != page) loadReviews(url, keyword, pg)
                    }}
                />}
            </div>
        )
    }
}

ReviewsList.propTypes = {
    reviews:        PropTypes.array.isRequired,

    loadReviews:    PropTypes.func,
    setPagination:  PropTypes.func,

    url:            PropTypes.string,
    keyword:        PropTypes.string,

    loading:        PropTypes.bool,

    page:           PropTypes.number,
    pagination:     PropTypes.number,
    count:          PropTypes.number,
    total:          PropTypes.number
}
