import React from 'react'
import AutocompleteInput from '../../AutocompleteInput.jsx'
import Button from '../../Button.jsx';
import {friendsList,addToLocalStorageObject,getProfilePic,getParsed,saveVisitedAdaptation} from '../../../utilities.js';
import AutomationBoilerplate from '../../../adaptations/Automation/AutomationBoilerplate.jsx'
import SuggestionBoilerplate from '../../../adaptations/Suggestion/SuggestionBoilerplate.jsx'
import {createEvent} from '../../../adaptations/Event.jsx'


class BlockEventInvites extends React.Component {
    
     constructor(props){
    super(props);
         
    let adaptation = getParsed('adaptations');
    let blockedFriends = getParsed('blockedEventInvites');     
    let adaptationVisited = getParsed("visited");
         
    let friends = friendsList();
    var friendslist = [];    
    
     friends.forEach((element, index) =>{
            friendslist.push(element.name);
        })     
      
    this.state = {  
        username: "",
        blockedFriendsList:blockedFriends,
        friendsList:friendslist,   
        
         highlight: !adaptationVisited["Block_Event"]["highlight"] && (adaptation["block_Event"] == "high")?true:false,
        suggestion: !adaptationVisited ["Block_Event"]["suggestion"]&& (adaptation["block_Event"] === "sugst"),
        automation:!adaptationVisited ["Block_Event"]["automation"]&& (adaptation["block_Event"] === "auto"),
        displayAutomationPopup:true,
        displaySuggestionPopup:true,

        action:"Block_Event Invitations",    
        context:"Block_Event",
        object:" blocking of Richard Midor", 
        objectSugst: "block Kyle Parker",    
        label_Sugst:" I think you should block \"Kyle Parker\" from sending you event invites", 
        label_Auto: "The grayed out and underlined entries were automatically blocked",  
    }
        
     this.handleChange = this.handleChange.bind(this);
     this.onEnter = this.onEnter.bind(this);
     this.showBlockedFriends = this.showBlockedFriends.bind(this);
     this.onClickUnBlock = this.onClickUnBlock.bind(this);
         
    /*Suggestion functions*/
    this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
    this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
         
    /*Automation functions*/
    this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
    this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
      
  }
    
    /*componentDidMount(){
        var blockedFriends = JSON.parse(localStorage.getItem('blockedEventInvites'))
        
        this.setState({
            blockedFriendsList:blockedFriends
        })
    }*/

    handleChange(friendname){
        
        // console.log ("Change detected" +friendname)
        this.setState({username:friendname})
        //console.log ("Change detected" +friendname.type);
    }

     setLocalStorage(){
        localStorage.setItem('blockedEventInvites',JSON.stringify(this.state.blockedFriendsList))
    }
    
    /*Methods for the Suggestion Adaptation*/
    onClickDestroySuggestion() {
        this.setState({
            displaySuggestionPopup:false
        })  
        
    }
    
    onClickOK_Suggestion(){
        //this.changeAudience("future_requests","friends")
        this.state.blockedFriendsList.push("Kyle Parker");
        
        this.setState({
             displaySuggestionPopup:false
        })  
    }
    
    
      
    onEnter(friendname){
        var event;
        
        
        this.state.blockedFriendsList.push(friendname)
        this.setLocalStorage();

        let used = JSON.parse(localStorage.featuresUsed);
        used.notifications.event = true;
        localStorage.setItem("featuresUsed", JSON.stringify(used));
 
       event = {
             action: `Block event invites`,
             object: `Pressed the Enter key`,
             context: `Block ${friendname} from sending event invites.Participant did this on their own`,
             
        };
        
       
        //When adaptation is highligh and enter is pressed
        if(this.state.highlight){
            
            this.setState({highlight:false})
            
            saveVisitedAdaptation("Block_Event","highlight");
            
        event = {
             action: `Block event invites`,
             object: `Pressed the Enter key to block friend`,
             context: `Block ${friendname} from sending event invites as highlighted by the Highlight adaptation`,
             
        };
      
        }
        
       
       createEvent(event);
       
    }
    
     onClickUnBlock(friend){
        var Index = this.state.blockedFriendsList.indexOf(friend);
        this.state.blockedFriendsList.splice(Index,1);
        this.setState({
            blockedFriendsList:this.state.blockedFriendsList
        })
        this.setLocalStorage();
        
        var event = {
           action: `Unblock Event Invites `,
           object: 'Pressed the UnBlock button to unblock friend',
           context: `Unblock ${friend} from Event Invites.Participant did this on their own`,
            
        };
        return event;
    }
    
     //Methods for the Automation Adaptation
   onClickOk_Auto(){
        this.setState({
            displayAutomationPopup:false
        })
    }
    
   onClickUndo_Auto(){
        
       
       var list_Length = this.state.blockedFriendsList.length;
       this.onClickUnBlock(this.state.blockedFriendsList[list_Length - 1]);
       
       if(this.state.blockedFriendsList.length === 0){
            this.setState({
                //blockedUserslist: unblockUsers,
                displayAutomationPopup:false
            })
       }
    }
    
     showBlockedFriends(){
        if(this.state.blockedFriendsList.length >0){
            return(
            <div>
                <ul>
                    {this.state.blockedFriendsList.map((friend,index)=>{
                        
                        if(this.state.displayAutomationPopup && this.state.automation) {
                            
                            return (<li key={index}><span className="righttop_text_onAutomation">{friend}</span> <Button href="javascript:void(0)" onClick={()=>this.onClickUnBlock(friend)}>Unblock</Button></li>)
                            
                        }else {
                        return (<li key={index}>{friend}<Button href="javascript:void(0)" onClick={()=>this.onClickUnBlock(friend)}>Unblock</Button></li>)
                     }})}
                </ul>
                
                {/*The Automation Adaptation Popup*/ 
                this.state.displayAutomationPopup && this.state.automation && <AutomationBoilerplate action = {this.state.action} context = {this.state.context} object ={this.state.object} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}/>
               }
            </div>
            )
        }
    }
    
   render(){
      //console.log("The state of highlight is "+ this.state.highlight);   
     var autocomplete = <AutocompleteInput
      className = {this.state.highlight? "block_high":null}
       commaSeperated
       onChange={(value) => this.handleChange(value)}
       defaultValue = {this.state.highlight? "Kyle Parker":""}
       placeholder = "Type the name of a friend"
       list = {this.state.friendsList}
       onEnter = {this.onEnter}
       />
            
       return (
         <div id="right_bottom">
            <span className="rightbottom_label"> Block event invitations  </span>
            <div className= "rightbottom_text">Once you've blocked event invitations from someone,
              you'll automatically ignore future event requests from that friend.
            </div>
            <div id="right_bottom_form">
              
              <label> Block invites from</label>
              {autocomplete}
              {this.showBlockedFriends()}
                <br/>
            
            </div>
            
               {/*The Suggestion Adaptation*/
                 this.state.displaySuggestionPopup && this.state.suggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} object={this.state.objectSugst} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
                }
                
          </div>
       )
   } 
}

export default BlockEventInvites;