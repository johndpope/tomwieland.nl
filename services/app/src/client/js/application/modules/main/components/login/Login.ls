React     = require \react
log       = require \loglevel
react-dom = require \react-dom
{
  Button
  Col
  ControlLabel
  FormControl
  FormGroup
  Grid
  Panel
  Row
} = require \react-bootstrap

el = React~create-element

class Login extends React.Component
  handle-form-submit: (event) ->
    log.debug \modules/main/components/login/Login#handle-form-submit, event

    event.prevent-default!

    email    = (react-dom.findDOMNode @refs.email).value
    password = (react-dom.findDOMNode @refs.password).value

    log.debug \modules/main/components/login/Login#handle-form-submit:email, email
    log.debug \modules/main/components/login/Login#handle-form-submit:password, password

    @props.handle-login email, password

  render: ->
    log.debug \modules/main/components/login/Login#render, @props

    {
      is-logging-in
    } = @props.session

    el Grid,
      style:
        margin-top: \21px

      el Row, void
        el Col,
          xs: 12

          el Panel,
            header: 'Login'

            el 'form',
              on-submit: @~handle-form-submit

              el FormGroup,
                control-id: \email

                el ControlLabel, void
                  'Email'

                el FormControl,
                  ref: 'email'
                  type: 'email'
                  placeholder: 'Email'
                  disabled: is-logging-in
                  auto-focus: true

              el FormGroup,
                control-id: \password

                el ControlLabel, void
                  'Password'

                el FormControl,
                  ref: 'password'
                  type: 'password'
                  placeholder: 'Password'
                  disabled: is-logging-in

              el Button,
                ref: 'submit'
                type: 'submit'
                bs-style: 'primary'
                disabled: is-logging-in

                'Login'

module.exports = Login
