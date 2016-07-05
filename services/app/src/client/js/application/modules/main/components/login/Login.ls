React = require \react
log   = require \loglevel
{
  Button
  Col
  Grid
  Input
  Panel
  Row
} = require \react-bootstrap

el = React~create-element

class Login extends React.Component
  handle-form-submit: (event) ->
    log.debug \Login#handle-form-submit, event

    event.prevent-default!

    email = @refs.email.get-value!
    password = @refs.password.get-value!

    @props.handle-login email, password

  render: ->
    log.debug \Login#render, @props

    {
      is-logging-in
    } = @props.session

    el Grid,
      style:
        margin-top: \21px

      el Row, null,
        el Col,
          xs: 12,

          el Panel,
            header: 'Login'

            el 'form',
              on-submit: @~handle-form-submit,

              el Input,
                ref: 'email'
                type: 'email'
                placeholder: 'Email'
                label: 'Email'
                disabled: is-logging-in
                auto-focus: true,

              el Input,
                ref: 'password'
                type: 'password'
                placeholder: 'Password'
                label: 'Password'
                disabled: is-logging-in,

              el Button,
                ref: 'submit'
                type: 'submit'
                bs-style: 'primary'
                disabled: is-logging-in,

                'Login'

module.exports = Login
