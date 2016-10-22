import 'whatwg-fetch'

import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'

import App from './App'

const rootElement = document.querySelector('#root')

function renderApp() {
  render(<AppContainer><App /></AppContainer>, rootElement)
}

if (module.hot) {
  module.hot.accept('./App', renderApp)
}

renderApp()

