import React from 'react'
import UploadPopup from "../../UploadPopup.jsx";
import {linkToName} from "../../../utilities.js";

class PhotosView extends React.Component {
  constructor(props) {
    super(props);

    let photos = JSON.parse(localStorage.getItem('photos'));
    let user_photos = photos[linkToName(this.props.match.params.user)] || {};
    let album_photos = user_photos[this.props.album] || user_photos['all_photos'] || [];
    this.state = {renderUploadPopup: false, photos: album_photos};

    this.onClickPhoto = this.onClickPhoto.bind(this);
  }

  onClickPhoto(photo) {
    let photos = JSON.parse(localStorage.getItem('photos'));
    let user_photos = photos[linkToName(this.props.match.params.user)] || {};
    let all_photos = user_photos['all_photos'] || [];

    all_photos.push(photo);

    let album_photos = user_photos[this.props.album] || [];
    if (this.props.album) {
        album_photos.push(photo);
        user_photos[this.props.album] = album_photos;
    }

    user_photos['all_photos'] = all_photos;
    photos[linkToName(this.props.match.params.user)] = user_photos;
    localStorage.setItem('photos', JSON.stringify(photos));

    this.setState({renderUploadPopup: false, photos: album_photos});
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
        {this.props.album ? <h1 className="album-title">{this.props.album}</h1> : null}
        {this.props.album ? <p className="album-size">{this.state.photos.length} posts</p> : null}
        {(this.props.album)
          ? add_photo : null}
        {this.state.photos.slice(0).reverse().map((photo, index) => {
          return <img src={photo} key={index} />;
        })}

        {this.state.renderUploadPopup ? upload_popup : null}
      </div>
    );
  }
}

export default PhotosView;
