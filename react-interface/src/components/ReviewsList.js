import React, { Component, PropTypes } from 'react'
import ReviewItem from './ReviewItem'

export default class ReviewsList extends Component {
    render() {
        const { reviews } = this.props

        return (
            <div className='sry__reviews'>
                {reviews.map(review =>
                    <ReviewItem
                        key={review.id}
                        review={review}
                    />
                )}
            </div>
        )
    }
}

ReviewsList.propTypes = {
    reviews: PropTypes.array.isRequired
}
