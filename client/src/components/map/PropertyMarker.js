import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import PropertyMapCard from "./PropertyMapCard";

export default class PropertyMarker extends React.Component {

    state = {
        isOpen: false,
        activeMarker: this.props.activeMarker
    }

    toggleOpen = () => {
        this.setState({isOpen: !this.state.isOpen}, () =>{
                if (!this.state.isOpen){
                    this.setState({activeMarker: false}, () => {
                        this.props.closeMarkers(null)
                    })
                } else{
                    this.props.closeMarkers(this.props.uid)
                }
            }
        )
    }

    componentWillReceiveProps(nextProps){
        this.setState({activeMarker: nextProps.activeMarker})
    }
//                        icon={StethoscopeIcon}
    render(){
        console.log(this.props);
        return(
            <div>
                <Marker onClick={this.toggleOpen}
                        position={this.props.location}
                >
                    { this.state.isOpen && this.state.activeMarker ?
                        <InfoWindow maxWidth={800} defaultPosition={ this.props.location } onCloseClick={this.props.onToggleOpen}>
                            <PropertyMapCard pro={this.props.property}/>
                        </InfoWindow> : null
                    }
                </Marker>
            </div>
        )

    }
}