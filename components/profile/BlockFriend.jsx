import React from 'react'
import ReactDOM from 'react-dom'
import {getParsed,blockFriend,linkToName} from '../../utilities.js'
import {highLight,highLightExtended,No_highLight} from '../../adaptations/Highlight.js';
import {HighlightBoilerplate} from '../../adaptations/Highlight/HighlightBoilerplate.jsx';
import classNames from 'classnames'
import Button from '../Button.jsx'
import Popup from '../Popup.jsx'
import BlockUsers from '../settings_general/blocking_features/blockUsers.jsx'

class BlockFriend extends React.Component {
    constructor(props) {
        super(props);
        
       let adaptation = getParsed('adaptations');
       let adaptationVisited = getParsed("visited");
        
        this.state = {
             adaptationVisited:adaptationVisited,
            highlight1: !adaptationVisited["Block_User"]["highlight"] && (adaptation["block_User"] == "high")? true:false,
            context:"Block_User",
            renderDropdown:true,
            renderPopup:false,
            renderBlockConfirmation:false,
        }
        
         this.handleClick = this.handleClick.bind(this);
         this.agreeToBlock = this.agreeToBlock.bind(this);
         this.cancelBlock = this.cancelBlock.bind(this);
    }
    
    handleClick(){
        
        /*TODO: Add user to block list */
        this.setState({
            renderPopup:true,
            renderDropdown:false,
        })
        
        
        
        if(!this.state.adaptationVisited["Block_User"]['highlight'] && (this.props.friendName === "ira_slipan") ) {
            
            this.setState({
                highlight1: false,    
                
            })
            
          HighlightBoilerplate(this.state.context);
        }
    }
    
    agreeToBlock(){
        
        blockFriend(this.props.friendName);
        
        this.setState({
           renderBlockConfirmation: true,
             renderPopup:false,
            
        })
    }
    
    cancelBlock(what) {
        
       if(what === 'first') { 
        this.setState({
            renderPopup:false,
            renderDropdown:true,
        })
       }
        
        if(what === 'second') {
            this.setState({
                renderBlockConfirmation:false,
                renderDropdown:true,
            })
            
            
            
        }
            
    }
    
    //Say "yes" tp cancel
    FriendBlocked(){
        return (
         <Popup title="User Blocked" cancel={()=> this.cancelBlock('second')} closeButton={true} closeButtonName="OK" grayHeader={true} content_style={true} destroy={() => {null}} noFooter={false} height={30} routeTo={"/settings_general/blocking"}  >
                
            <div className="popup_content">
               
                <p> You've blocked {linkToName(this.props.friendName)}. We're sorry that you've had this experience.</p>
                
            </div> 
                
                
            </Popup>
        
        )
    }
    
  
    
    BlockPopup() {
        return(
        <Popup title="Confirm Block" okay={this.agreeToBlock} okButtonName="Confirm" cancel={() => this.cancelBlock('first')} grayHeader={true} content_style={true} destroy={() => {null}} noFooter={false} height={30} >
                
            <div className="popup_content">
                <p> Are you sure you want to block {linkToName(this.props.friendName)}</p>
                <p>{linkToName(this.props.friendName)} will no longer be able to:</p>

                   <ul >   
                        <li> See things you post on your timeline</li>
                        
                        <li> Tag you</li>
                           
                        <li> Invite you to events or groups</li>
                           
                        <li> Start a converstation with you</li>
                           
                        <li> Add you as a friend</li>
                    </ul>
                    
                <p>If you're friends, blocking {linkToName(this.props.friendName)} will also unfriend him </p>
                <p> If you want to limit what you share with {linkToName(this.props.friendName).split(" ")[0]} or see less of him on FriendBook, you can take a break from him instead.</p>
            </div> 
                
                
            </Popup>
        )
    }
   
    render(){
        //There are 2 dialog boxes and then it brings you to the privacy settings page.
        
         var dropbtn_style = classNames({
             'dropbtn_1':!this.state.highlight1 || (this.props.friendName !== "ira_slipan") && this.state.highlight1,
             'dropbtn_1_highlight':(this.props.friendName === "ira_slipan") && this.state.highlight1,
         })
        
        return ( 
        <div className = "dropdown_2">
                 <button className={dropbtn_style}>...</button>
                 
                {this.state.renderDropdown? <div className="dropdown_content_1">
                     <a href="#">See friendship</a>
                     <a href="#">Invite Jack to like your pages</a>
                     <a href="#">Find Support or report profile </a>
                     <span className={(this.props.friendName === "ira_slipan") && this.state.highlight1?"high1":null}><Button onClick={this.handleClick}> Block </Button></span>
                 </div>:null}
                 
                 {this.state.renderPopup?this.BlockPopup():null}
                  {this.state.renderBlockConfirmation?this.FriendBlocked():null}
             </div>
             
        );
    }
    
}

export default BlockFriend;