import React from 'react'
import createElement from '../../../../../../library/create-element'
el = bind$(React, 'createElement')
import log from 'loglevel'
import reactBootstrap from 'react-bootstrap'
grid = createElement(reactBootstrap.Grid)
col = createElement(reactBootstrap.Col)
row = createElement(reactBootstrap.Row)
export default (context) => {
  log.debug('modules/admin/modules/users/components/add')
  return grid(undefined, row(undefined, col({
    xs: 12
  }, 'Add!')))
}
function bind$(obj, key, target){
  return () => { return (target || obj)[key].apply(obj, arguments) }
}
