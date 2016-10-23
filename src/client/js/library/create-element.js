import React from 'react'
import isType from 'prelude-ls'

const isUndefined = x => isType('Undefined', x)

const isObject = x => isType('Object', x)

const isReactElement = x => (x != null ? x.$$typeof : undefined) === Symbol(React.element)

const createElement = (element) => {
  return (options, ...args) => {
    let rest = args

    if (isUndefined(options)) {
      options = {}
    } else if (isObject(options)) {
      if (isReactElement(options)) {
        rest = [options].concat(rest)
        options = {}
      }
    } else {
      rest = [options].concat(rest)
      options = {}
    }

    return React.createElement(...[element, options].concat(...rest))
  }
}

export default createElement
