import React from 'react'
import Button from './Button.jsx'

class UploadedPhoto extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {hover: false};
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  onClickRemove() {
    this.props.onClickRemove();
  }

  render() {
    return (
      <div className="uploaded-photo">
        <div className="uploaded-photo-overlay"><Button onClick={this.onClickRemove}>X</Button></div>
        <img className="uploaded-photo-img"
          src={this.props.photo}
          style={{width: 60, height: 60}}
          onMouseEnter={() => {this.setState({hover: true})}}
          onMouseLeave={() => {this.setState({hover: true})}} />
      </div>
    );
  }
}

export default UploadedPhoto;