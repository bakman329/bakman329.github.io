//destroy 

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import SuggestionPopupBox from '../SuggestionPopupBox.jsx'
import {saveVisitedAdaptation} from '../../utilities.js'


class SuggestionBoilerplate extends Component{
    constructor(props){
        super(props);
        
        this.okay = this.okay.bind(this);
        this.destroy = this.destroy.bind(this);
        this.label = this.label.bind(this);
        this.visited = this.visited.bind(this);
    }
    visited(feature,name){
        saveVisitedAdaptation(feature,name)
        this.props.destroy();
    }
    
    okay(){
        var event={
            action: `Participant followed and agreed with the Suggestion for ${this.props.action}`,
            context: this.props.context,
            object: `Agreed with the suggestion to ${(this.props.object !=undefined?this.props.object:'Alex Doe')}`
        };
        
        this.props.agree();
        this.visited(this.props.context, "suggestion");
        return event;
    }
    
    destroy(){
        var event = {
            action:`Participant refused to follow the Suggestion for ${this.props.context}`,
            context:this.props.context,
            object: `Disagreed with the suggestion to ${(this.props.object !=undefined?this.props.object:'Alex Doe')}`
        };
        
        this.visited(this.props.context, "suggestion");
        return event;
    }
    
    label(){
        return(
            <label>
                {this.props.label}
            </label>
        )
    }
    
    
    render(){
        return(
            <SuggestionPopupBox okay={this.okay} destroy={this.destroy} routeTo= {this.props.routeTo != undefined?this.props.routeTo:null} label = {this.label()} />
        )
    }

}
export default SuggestionBoilerplate;