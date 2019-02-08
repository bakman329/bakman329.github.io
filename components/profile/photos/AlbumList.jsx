import React from 'react'
import UploadPopup from "../../uploadPopup.jsx";
import {Link} from "react-router-dom";

class AlbumList extends React.Component {
  constructor(props) {
    super(props);

    let albums = JSON.parse(localStorage.getItem('photos'));
    let your_albums = albums['Alex Doe'] || {};
    delete your_albums['all_photos'];
    this.state = {renderUploadPopup: false, albums: Object.keys(your_albums) || []};

    this.onClickPhoto = this.onClickPhoto.bind(this);
  }

  onClickPhoto(photo) {
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

    let create_album = (
      <div className="create-album" onClick={() => {this.setState({renderUploadPopup: true})}}>
        <img src="/assets/profile_img.jpg" />
        <div className="create-album-text">
          <h2>+</h2>
          <p>Create Album</p>
        </div>
      </div>
    );

    return (
      <div className="photos-view">
        {create_album}
        {this.state.albums.map((title, index) => {
          return (
            <Link to={'/profile/' + this.props.match.params.user + '/photos/albums' + title}>
              <p>{title}</p>
              <img src="/assets/profile_img.jpg" key={index} />
            </Link>
          );
        })}
        {this.state.renderUploadPopup ? upload_popup : null}
      </div>
    );
  }
}

export default AlbumList;