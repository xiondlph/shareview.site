import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/App'
import './assets/style/index.scss'
import configureStore from './store/configureStore'


const store = configureStore()

let scriptDom = document.querySelector('script[data-id="shareview-interface"]'),
    keywordText = scriptDom.getAttribute('data-keyword-text'),
    tegId = scriptDom.getAttribute('data-keyword-id')

keywordText = keywordText || ''
tegId = tegId || ''

scriptDom
    .insertAdjacentHTML(
        'beforeBegin',
        '<div id="shareview-interface">Загружается...</div>'
    )

render(
    <Provider store={store}>
        <App
            keywordText={keywordText}
            tegName={tegId}
        />
    </Provider>,
    document.getElementById('shareview-interface')
)