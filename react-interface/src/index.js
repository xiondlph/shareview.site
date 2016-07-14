import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/App'
import './assets/style/index.scss'
import configureStore from './store/configureStore'


const store = configureStore()

let scriptDom = document.querySelector('script[data-id="shareview-interface"]'),
    keywordText = scriptDom.getAttribute('data-keyword-text'),
    url = scriptDom.getAttribute('data-url'),
    tegId = scriptDom.getAttribute('data-keyword-id')

keywordText = keywordText || ''
tegId = tegId || ''
url = url || ''

if ( !keywordText && tegId ) {
    let _tegId = document.getElementById(tegId)

    if ( _tegId ) {
        keywordText = document
                        .getElementById(tegId)
                        .innerText
                        .replace(/<(?:[^"'>]+|(["'])(?:\\[\s\S]|(?!\1)[\s\S])*\1)*>/g, '')
    }

}

scriptDom
    .insertAdjacentHTML(
        'beforeBegin',
        '<div id="shareview-interface">Загружается...</div>'
    )

render(
    <Provider store={store}>
        <App
            keywordText={keywordText}
            url={url}
        />
    </Provider>,
    document.getElementById('shareview-interface')
)