import React, { Component, PropTypes } from 'react'
import {main} from '../scripts/text'


export default class ReviewPagination extends Component {
    render() {
        const { page, pageLoad, loading } = this.props;

        return (
            <div className='sry__reviews__pagination'>
                <span className='button' onClick={()=>{
                    if ( !loading ) pageLoad(parseInt(page)+1)
                }}>{ main['more'] }</span>
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
