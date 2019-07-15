import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import moment from 'moment';

class PresentHour extends Component {
    constructor(props) {
        super(props);
        this.cellWidth = this.props.cellWidth;
        this.minuteStep = this.props.minuteStep;
        this.mounted = true;
        let mmtMidnight = moment().clone().startOf('day');
        let minutesSinceStartOfDay = moment().diff(mmtMidnight, 'minutes');
        this.minuteWidth = this.cellWidth / 15;
        let presentTimeLocation = minutesSinceStartOfDay * this.minuteWidth;
        this.state = {
          presentTime: minutesSinceStartOfDay,
          presentTimeLocation: presentTimeLocation,
          hour:moment().format('hh:mm')
        }
        
    }

    componentDidUpdate() {
      if(this.timer){
        clearInterval(this.timer);
      }
      if(this.props.shouldDisplay && this.mounted){
        this.timer = setInterval(this.tick, 60000);
      } 
    }

    componentDidMount() {
      if(this.props.shouldDisplay && this.mounted){
        this.timer = setInterval(this.tick, 60000);
      }
    }

    componentWillUnmount() {
      this.mounted = false;
      if(this.timer){
        clearInterval(this.timer);
      }
    }

    tick = () => {
      let mmtMidnight = moment().clone().startOf('day');
      let minutesSinceStartOfDay = moment().diff(mmtMidnight, 'minutes');
      let ptime = minutesSinceStartOfDay <= 1440 ? minutesSinceStartOfDay : 0; 
      let location = ptime * this.minuteWidth;
      this.setState({presentTime: ptime, presentTimeLocation: location,hour:moment().format('hh:mm')});
    }

    render() {
        const {shouldDisplay, color } = this.props;
        if(shouldDisplay) {
          return (
            <div style={{display: 'flex', flexFlow: 'column', float: 'right', height: '100%', width: '100%'}}>
            <div style={{position:'relative',color: 'white',width: '51px',height: '17px',borderRadius: '6px',backgroundColor: `${color}`,fontSize: '10px',padding: '2px 10px',marginLeft: `calc(${this.state.presentTimeLocation}px - 25px)`,zIndex: 2}}>
              {this.state.hour}
            </div>
            {this.props.children}
            <div 
              id="present-time" 
              style={{position: 'absolute', float: 'left', height: '100%', width: '1px', marginLeft: `${this.state.presentTimeLocation}px`, borderRight: `1px dotted ${color}`}}
            >
            </div>
            </div>
          );
        } else {
          return this.props.children;
        }

    }
}

export default PresentHour;