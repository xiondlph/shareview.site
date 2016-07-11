import React, { Component, PropTypes } from 'react'


export default class ReviewPagination extends Component {
    __setLi(numb, page, pageLoad) {
        let cl = numb==page?'active':''

        return (
            <li className={cl} onClick={()=>pageLoad()}>{numb}</li>
        )
    }

    render() {
        const { pagination, page, pageLoad } = this.props

        let liArr = []

        for (let i=0; i<pagination; i++) liArr.push(::this.__setLi(i+1, page, ()=>pageLoad(i+1)))

        return (
            <div className='sry__reviews__pagination'>
                <ul>
                    {liArr.map(item=>item)}
                </ul>
            </div>
        )
    }
}


ReviewPagination.propTypes = {
    pagination: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    pageLoad: PropTypes.func
}
