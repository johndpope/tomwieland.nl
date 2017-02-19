import React from 'react'
import Halogen from 'halogen'

export default class Spinner extends React.Component {
  render() {
    return (
      <center><Halogen.ClipLoader color="#000000" /></center>
    )
  }
}
