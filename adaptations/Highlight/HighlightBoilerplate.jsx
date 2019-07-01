import React from 'react';
import {CreateEvent} from '../../controller/databaseFunctions.js';
import {saveVisitedAdaptation} from '../../utilities.js'


export function HighlightBoilerplate (props) {
   
    // alert("I am here in HighlighBoilerplate")
    
   var event = { 
       action:`User concurs with the Highlight for ${props}`,
        details:props,
        object:'Alex Doe',
        session:localStorage.session_id
   }
      
    saveVisitedAdaptation(props,"highlight");
        
    CreateEvent(event);
   
    
   /// return event;

}