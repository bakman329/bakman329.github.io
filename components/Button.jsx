import React from 'react';
import ReactDOM from 'react-dom';
import {CreateEvent} from '../controller/databaseFunctions.js';
import  PropTypes from 'prop-types';

//Get the hashId session index.htm/:sessionid=theidisthisone

/**http://fakebook.usabart.nl/?session_id=a09eb84d555bb8d55510ef28a56a6f3d&changesub=auto&unsubstatus=auto&reportspam=auto&requestphoto=auto&timelinevisibility=auto&restrictuser=auto&blockevent=auto&chatoffline=auto&withholdcellphone=auto&withholdotherphone=auto&withholdim=auto&withholdstreet=auto&withholdinterest=auto&withholdreligion=auto&withholdpolitical=auto
*/

class Button extends React.Component {
   constructor(props,context) {
      super(props,context);
      this.onClick = this.onClick.bind(this);
    }

   onClick() {
      var state = this.props.onClick();
      if (state == null) {
         return;
      }

      var event = { action : state.action,
                    details : state.context,
                    object : state.name,
                    session_id: this.context.session
                  };
      // console.log("The Button session is", this.context.session);
      // console.log("The Button newsfeed is", this.context.NewsFeed);
      // console.log("The Button timeline is", this.context.Timeline);
       
      CreateEvent(event);
   }

   render() {
      return (<a id={this.props.id} href={this.props.href} onClick={this.onClick}>{this.props.children}</a>);
   }
}

// Helps the Button Component access the global variables
Button.contextTypes = {
    session: PropTypes.string,
    NewsFeed: PropTypes.bool,
    Timeline: PropTypes.bool
};

export default Button;