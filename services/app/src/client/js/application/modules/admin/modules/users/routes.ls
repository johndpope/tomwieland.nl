React = require \react
{ Route, Index-route } = require \react-router
el = React~create-element

add = require \./components/add
container = require \./components/container
edit = require \./components/edit
list = require \./components/list
show = require \./components/show

module.exports = (context) ->
  el Route,
    path: 'users'
    component: container
    key: context.key,

    el IndexRoute,
      component: list

    el Route,
      path: 'add'
      component: add

    el Route,
      path: ':email',

      el IndexRoute,
        component: show

      el Route,
        path: \edit
        component: edit
