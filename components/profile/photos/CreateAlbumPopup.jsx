import React from 'react'
import Popup from "../../Popup.jsx";

class CreateAlbumPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Popup title="Create Album" grayHeader
                destroy={this.props.destroy}
                okay={this.props.okay}
                width={1000} height={500}>

            </Popup>
        );
    }
}

export default CreateAlbumPopup;
