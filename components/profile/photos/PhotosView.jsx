import React from 'react'
import UploadPopup from "../../UploadPopup.jsx";

class PhotosView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {renderUploadPopup: false};

    this.onClickPhoto = this.onClickPhoto.bind(this);
  }

  onClickPhoto(photo) {
    // TODO: replace with state
    let photos = JSON.parse(localStorage.getItem('photos'));
    let your_photos = photos['Alex Doe'] || {};
    let album_photos = your_photos[this.props.album] || [];
    let all_photos = your_photos['all_photos'] || [];

    album_photos.push(photo);
    all_photos.push(photo);
    your_photos[this.props.album] = album_photos;
    your_photos['all_photos'] = all_photos;
    photos['Alex Doe'] = your_photos;
    localStorage.setItem('photos', JSON.stringify(photos));
  }

  render() {
    let upload_popup = <UploadPopup
      onClickPhoto={this.onClickPhoto}
      destroy={() => {this.setState({renderUploadPopup: false})}} />;

    let add_photo = (
      <div className="add-photo" onClick={() => {this.setState({renderUploadPopup: true})}}>
        <div className="add-photo-overlay" />
        <img src="/assets/add_photo.png" className="add-photo"/>
      </div>
    );

    return (
      <div className="photos-view">
        {(this.props.album)
          ? add_photo : null}
        {this.props.photos.map((photo, index) => {
          return <img src={photo} key={index} />;
        })}

        {this.state.renderUploadPopup ? upload_popup : null}
      </div>
    );
  }
}

export default PhotosView;
