React           = require \react
create-element  = require \../../../../../library/create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap
react-dom       = require \react-dom

button        = create-element react-bootstrap.Button
col           = create-element react-bootstrap.Col
control-label = create-element react-bootstrap.ControlLabel
form          = create-element \form
form-control  = create-element react-bootstrap.FormControl
form-group    = create-element react-bootstrap.FormGroup
grid          = create-element react-bootstrap.Grid
panel         = create-element react-bootstrap.Panel
row           = create-element react-bootstrap.Row

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

    { is-logging-in } = @props.session

    grid style: margin-top: \21px,
      row, void,
        col xs: 12,
          panel header: \Login,
            form on-submit: @~handle-form-submit,
              form-group control-id: \email
                control-label, void, \Email
                form-control do
                  ref:          \email
                  type:         \email
                  disabled:     is-logging-in
                  placeholder:  \Email
                  auto-focus:   true

              form-group control-id: \password,
                control-label, void, \Password
                form-control do
                  ref:          \password
                  type:         \password
                  disabled:     is-logging-in
                  placeholder:  \Password

              button ref: \submit, type: \submit, bs-style: \primary, disabled: is-logging-in,
                \Login

module.exports = Login
