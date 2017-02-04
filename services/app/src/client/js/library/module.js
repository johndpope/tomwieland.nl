import log from 'loglevel'
import React from 'react'
import _ from 'lodash'
import { combineReducers } from 'redux'

export function hasSubmodules(module) {
  return module.modules && module.modules.length
}

export function hasReducers(module) {
  return module.reducers && _.keys(module.reducers).length
}

export function hasRoutes(module) {
  return module.routes && module.routes.length
}

export function getReducers(module) {
  const moduleReducers = module.reducers

  _.each(module.modules, (subModule) => {
    const subModuleReducers = getReducers(subModule)

    if (subModuleReducers) {
      moduleReducers[subModule.name] = subModuleReducers
    }
  })

  if (_.keys(moduleReducers).length) {
    return combineReducers(moduleReducers)
  }

  return null
}

export function getSubmoduleRoutes(module, store) {
  if (!hasSubmodules(module)) {
    return null
  }

  return _.map(module.modules, (subModule, i) => {
    const subModuleRoutes = getRoutes(subModule, store)

    return (
      <div key={i}>
        {subModuleRoutes}
      </div>
    )
  })
}

export function getRoutes(module, store) {
  return module.routes({
    routes: getSubmoduleRoutes(module, store),
    store,
  })
}
