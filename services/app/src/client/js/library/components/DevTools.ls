React = require \react
el = React~create-element

{ create-dev-tools } = require \redux-devtools

# Chart-monitor = require \redux-devtools-chart-monitor-immutable
dock-monitor = (require \redux-devtools-dock-monitor).default
# Inspector = require \redux-devtools-inspector
# Diff-monitor = require \redux-devtools-diff-monitor
log-monitor = (require \redux-devtools-log-monitor).default

module.exports = create-dev-tools(
  el dock-monitor,
    toggle-visibility-key: \ctrl-i
    change-position-key: \ctrl-y,

    el log-monitor
)
