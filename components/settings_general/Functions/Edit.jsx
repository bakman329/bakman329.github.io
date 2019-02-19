import React from 'react';
import Button from '../../Button.jsx';
import {getParsed} from '../../../utilities.js'
import classNames from 'classnames'

class Edit extends React.Component{
    
    constructor(props){
        super(props)
        
        this.state = {
            edit:false,
            adaptationVisited:getParsed('visited'),
        }
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onAudienceChange= this.onAudienceChange.bind(this);
        
        
    }
    
    //enable change of audience(cf:https://stackoverflow.com/questions/40795906/onchange-event-for-react-child-component-to-update-state )
    
    onAudienceChange(audience){
        //Include the action to be taken when the audience is selected.
        //console.log("The audience has been selected")
        this.props.changeAudience(this.props.audienceType,audience)
    }
    
    //Open the edit dialog
    onClickEdit(){
       this.setState({edit:true}) 
    }
    
    //Close the edit dialog
    onClose(){
        this.setState({
            edit:false,
            adaptationVisited:getParsed('visited'),
             })
        
        // if(!this.props.adaptationVisited["Privacy_futureRequest"]["highlight"] && this.props.adapt === "high" ){
      // this.visitedAdaptation("highlight")
             
             
   // }
    }
    
    //The normal display
    renderNormal(){
        
        //console.log(this.state.adaptationVisited["Privacy_futureRequests"]["highlight"])
        //&& (this.props.description =="Who can see your future requests?"),
        
        var righttop_text_style = classNames({
            'righttop_text':true,
            'righttop_text_onAutomation':this.props.automate ,
        })
        
        return(
            <div>
                 <div className="right_link">
                    <Button href="javascript:void(0)" onClick={this.onClickEdit} adapt={!this.state.adaptationVisited["Privacy_futureRequests"]["highlight"]&&this.props.adapt} width={true}>Edit</Button>
                    
                    </div>
                    <div className="edit_audience_selected automatic_style">{this.props.audience}</div>
                    <div className = {righttop_text_style} >{this.props.description}</div>
                    
            </div>
        )
    }
    
    //The edit dialog
    renderEditForm(){
        return(
            <div>
                {this.props.renderEditForm(this.props.audienceType,this.props.description,this.props.edit_description,this.onAudienceChange,this.onClose,this.props.adapt)}
           </div>
        )
    }
    

    render(){
       //Renders either the normal view or editDialog based on activation
        return(
            <div>
                {this.state.edit?this.renderEditForm():this.renderNormal()}
            </div>
            )
       }

   
}


export default Edit;