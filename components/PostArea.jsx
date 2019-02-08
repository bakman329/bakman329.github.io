import React from 'react';
import ReactDOM from 'react-dom';

import Post from './Post.jsx'
import NewPostArea from './NewPostArea.jsx'

import {resetPosts} from '../utilities.js'

class PostArea extends React.Component {
   constructor(props) {
      super(props);

      // If null, init to 1's
      if (localStorage.getItem('posts') == 'null') {
         resetPosts();
      }

      // TODO: Attempt to get rid of duplicate code
      var out = [];

      var count = JSON.parse(localStorage.posts).length;
      JSON.parse(localStorage.getItem('posts')).forEach((post, index, array) => {
         // Create posts for rendering
         // Key and count are in reverse order, hence subtracting from count
          //
          let render = true;
          if (this.props.name) {
            render = (post.name === this.props.name);
            console.log(render)
          }
         out[index] = React.createElement(Post,
          {name: post.name,
           key: count -  index - 1,
           index: count - index - 1,
           original_poster: post.original_poster,
           adapt:this.props.toAdapt,
           photos: post.photos,
           displayContactInfoSuggestion: this.props.displayContactInfoSuggestion,
           render: render,
           audience: post.audience}, post.content);
      });
 
      //console.log("Post Area "+this.props.toAdapt)
      this.state = {posts: out};

      this.update = this.update.bind(this);
      this.getPosts = this.getPosts.bind(this);
   }

   onComponentDidMount() {
      this.getPosts();
   }

   getPosts() {
      var out = [];

      var count = JSON.parse(localStorage.posts).length;
      JSON.parse(localStorage.getItem('posts')).forEach((post, index, array) => {
         // Create posts for rendering
         // Key and count are in reverse order, hence subtracting from count
          //
          let render = true;
          if (this.props.name) {
            render = (post.name === this.props.name);
            console.log(render)
          }
         out[index] = React.createElement(Post,
          {name: post.name,
           key: count -  index - 1,
           index: count - index - 1,
           original_poster: post.original_poster,
           adapt:this.props.toAdapt,
           photos: post.photos,
           displayContactInfoSuggestion: this.props.displayContactInfoSuggestion,
           render: render,
           audience: post.audience}, post.content);
      });
 
      //console.log("Post Area "+this.props.toAdapt)
      this.setState({posts: out});
   }
     

   update() {
    console.log(this.getPosts());
    // this.forceUpdate();
   }

   render() {
       //console.log("PostArea: The suggestion is"+ this.props.displayContactInfoSuggestion);
      return (
         <div id='post-area'>
            <NewPostArea postarea={this}/>
            {this.state.posts}
         </div>);
   }
}

export default PostArea;