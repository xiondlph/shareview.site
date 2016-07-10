import React, { Component, PropTypes } from 'react'
import { text } from '../constants/reviews'

export default class ReviewItem extends Component {
    __gradeStars(grade) {
        let count = 5,
            stars = []

        for (let i = 0; i<count; i++) {
            stars.push(
                <i className={i<grade ? 'star star--yellow' : 'star'} />
            )
        }

        return stars
    }

    render() {
        const { review } = this.props

        let grades = review.grades

        return (
            <div className='sry__reviews-item'>
                <div className='sry__reviews-item__author'>
                    <span className='sry__reviews-item__author-name'>{review.author}</span>
                    {grades>0 &&
                    <span className='sry__reviews-item__author-grades'>{
                        grades>1 ? text.grades.replace(/\{(0)\}/i, grades) : text.gradesOne.replace(/\{(0)\}/i, grades)
                    }</span>}
                </div>
                <div className='sry__reviews-item__header'>
                    <span className='sry__reviews-item__header-assessment'>
                        {::this.__gradeStars(review.assessment).map((item)=>item)}
                    </span>
                    <span className='sry__reviews-item__header-period'>{text.experienceUse}: {review.period}</span>
                </div>
                <div className='sry__reviews-item__review'>
                    <div className='sry__reviews-item__review-title'>{text.dignity}:</div>
                    <div className='sry__reviews-item__review-description'>{review.dignity}</div>
                </div>
                <div className='sry__reviews-item__review'>
                    <div className='sry__reviews-item__review-title'>{text.disadvantages}:</div>
                    <div className='sry__reviews-item__review-description'>{review.disadvantages}</div>
                </div>
                <div className='sry__reviews-item__review'>
                    <div className='sry__reviews-item__review-title'>{text.review}:</div>
                    <div className='sry__reviews-item__review-description'>{review.review}</div>
                </div>
                <div className='sry__reviews-item__date'>{review.date}</div>
            </div>
        )
    }
}

ReviewItem.propTypes = {
    review: PropTypes.object.isRequired
}
