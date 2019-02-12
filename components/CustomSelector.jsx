import React from 'react'
import {getProfilePic, containsIgnoreCase} from '../utilities.js'

import Popup from './Popup.jsx'
import AutocompleteInput from './AutocompleteInput.jsx'

class CustomSelector extends React.Component {
  constructor(props) {
    super(props);

    let share = "";
    let dont = "";
    JSON.parse(localStorage.getItem('users')).forEach((user, index, array) => {
      if (!user.friend) {
        return;
      }
      var settings = JSON.parse(localStorage.getItem('settings'));
      
      var audience_settings = settings["post_audience_settings"][3];
      share = (audience_settings[0]) ? audience_settings[0].join(", ") : "";
      dont = (audience_settings[1]) ? audience_settings[1].join(", ") : "";
    });

    this.state = {share_value: share, dont_share_value: dont}
  }

  parseText(str) {
    if (!str) return;
    var raw_list = str.split(",").map(function(item) {
      return item.trim();
    });

    var friends = JSON.parse(localStorage.getItem('users')).filter((user) => {
      return user.friend;
    }).map((item) => {
      return item.name;
    });

    return raw_list.filter((item) => {
      return containsIgnoreCase(friends, item) || containsIgnoreCase(["Friends", "Friends of friends"], item);
    });
  }

  newAudience() {
    let share = this.parseText(this.state.share_value) || [];
    let dont = this.parseText(this.state.dont_share_value) || [];

    var settings = JSON.parse(localStorage.getItem('settings'));
    if (share.includes("Friends") && !share.includes("Friends of friends")) {
      if (dont.length !== 0) {
        settings["post_audience_settings"][1] = dont;
        localStorage.setItem("settings", JSON.stringify(settings));
        return "friends_except";
      }

      return "friends";
    }
    else if (!share.includes("Friends")
      && !share.includes("Friends of friends")
      && share.length !== 0
      && dont.length === 0) {
      settings["post_audience_settings"][2] = share;
      localStorage.setItem("settings", JSON.stringify(settings));
      return "specific_friends";
    }
    else {
      return "custom";
    }
  }

  render() {
    return (
      <Popup saveChanges title="Custom Privacy"
        destroy={this.props.destroy}
        okay={() => {
          var settings = JSON.parse(localStorage.getItem('settings'));
          var audience_settings = settings["post_audience_settings"][3];
          audience_settings[0] = this.parseText(this.state.share_value) || [];
          audience_settings[1]= this.parseText(this.state.dont_share_value) || [];
          if (audience_settings[0].length === 0 && audience_settings[1].length === 0) return;
          localStorage.setItem('settings', JSON.stringify(settings));
          this.setState({share: audience_settings[0], dont: audience_settings[1]});
          this.props.okay(this.newAudience());
        }}
        cancel={() => {return;}}
        confirmDisabled={() => {return (this.state.dont_share_value === "" && this.state.share_value === "");}}
        noPadding grayHeader dismissButton>
        <div id="custom-popup-container">
          <div id="custom-popup-share-container">
            {'+ '}<strong>Share with</strong><br />
            <label>
              <span>These people or lists{' '}</span>
              <AutocompleteInput
                commaSeperated
                onChange={(value) => this.setState({share_value: value})}
                defaultValue={this.state.share_value}
                placeholder='Required: Enter names or lists'
                list={["Jack Roe", "Jim Mend", "Friends", "Friends of friends"]} />
            </label>
            <label>
              <span>Friends of tagged{' '}</span>
              <input type="checkbox"></input>
            </label>
          </div>
          <hr />
          <div id="custom-popup-dont-container">
            {'X '}<strong>Don't share with</strong><br />
            <label>
              <span>These people or lists{' '}</span>
              <AutocompleteInput
                commaSeperated
                onChange={(value) => this.setState({dont_share_value: value})}
                defaultValue={this.state.dont_share_value}
                placeholder='Required: Enter names or lists'
                list={["Jack Roe", "Jim Mend", "Friends", "Friends of friends"]} />
            </label>
          </div>
        </div>
      </Popup>
    );
  }
}

export default CustomSelector;