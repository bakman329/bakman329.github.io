import React from 'react'
import {indexPosts} from '../utilities.js'

import Button from './Button.jsx'
import AudienceMenu from './AudienceMenu.jsx'
import PostArea from './PostArea.jsx'
import UploadPopup from './UploadPopup.jsx'
import UploadedPhoto from './UploadedPhoto.jsx'

class NewPostArea extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {value: '',
                    photos: [],
                    audience: 'public',
                    renderUploadPopup: false};
      this.onChange = this.onChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onClickPhoto = this.onClickPhoto.bind(this);
      this.onClickRemove = this.onClickRemove.bind(this);
      this.onChangeAudience = this.onChangeAudience.bind(this);
   }

  onClickPhoto(photo) {
    let photos = this.state.photos;
    photos.push(photo);
    this.setState({photos: photos, renderUploadPopup: false});
  }

  onClickRemove(index) {
    let photos = this.state.photos;
    photos.splice(index, 1);
    this.setState({photos: photos});
  }

  onClick() {
      var event = {
         action: 'Post Created',
         context: 'From NewsFeed',
         name: 'Alex Doe'
     };

     if (this.state.value === '' && this.state.photos.length === 0) {
         return null;
     }

     var posts = JSON.parse(localStorage.getItem('posts'));
       
     var post = {name: 'Alex Doe',
                 img: './assets/users/alex_profile_img.jpg',
                 content: this.state.value,
                 photos: this.state.photos,
                 key: posts.length,
                 comments: [],
                 audience: this.state.audience};
       
     localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
     indexPosts();
     this.props.postarea.update();

     var photos = JSON.parse(localStorage.getItem('photos'));
     var your_photos = photos['Alex Doe'] || {};
     var all_your_photos = your_photos['all_photos'] || [];
     all_your_photos = all_your_photos.concat(this.state.photos);
     console.log(all_your_photos);
     your_photos['all_photos'] = all_your_photos;
     console.log(your_photos);
     photos['Alex Doe'] = your_photos;
     console.log(photos);
     localStorage.setItem('photos', JSON.stringify(photos));

    this.setState({value: '', photos: [], renderUploadPopup: false});

    return event;
   }

   onChange(e) {
      this.setState({value: e.target.value});
   }

   onChangeAudience(audience) {
      this.setState({audience: audience});
   }

   render() {
     let upload_popup = <UploadPopup
       onClickPhoto={this.onClickPhoto}
       destroy={() => {this.setState({renderUploadPopup: false})}} />;

      let photos = this.state.photos.map((photo, index) => {
        return <UploadedPhoto key={index} photo={photo} onClickRemove={() => {this.onClickRemove(index)}} />
      });

      return (
         <div id='new-post-area'>
            <div id='new-post-area-content'>
              <textarea rows='6' placeholder="What's on your mind, Alex?" value={this.state.value} onChange={this.onChange} />
              {photos}
              <hr />
               <div id='actions'>
                  <Button type="confirm" onClick={this.onClick}>Post</Button>
                  <Button type="cancel" onClick={() => {this.setState({renderUploadPopup: true})}}>Photo/Video</Button>
                  <AudienceMenu onChange={this.onChangeAudience} className="new-post-menu"
                    options={["public", "friends", "friends_except", "only_me", "more"]}
                    more={["specific_friends", "see_all"]}
                    see_all={["custom"]}
                    title="Who should see this?" />
               </div>
               {this.state.renderUploadPopup ? upload_popup : null}
            </div>
         </div>);
   }
}

export default NewPostArea;