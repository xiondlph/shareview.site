import React, { Component, PropTypes } from 'react'


export default class ReviewPagination extends Component {
    render() {
        const { page, pageLoad, loading } = this.props;

        return (
            <div className='sry__reviews__pagination'>
                <span className='button' onClick={()=>{
                    if ( !loading ) pageLoad(page+1)
                }}>Загрузить еще отзывов</span>
                {loading &&
                <span ref='buttonLoading' className='loader-block'>
                    <span className='loader loader--middle loader--white' />
                </span>}
            </div>
        )
    }
}


ReviewPagination.propTypes = {
    page: PropTypes.number.isRequired,
    pageLoad: PropTypes.func,
    loading: PropTypes.bool
}
