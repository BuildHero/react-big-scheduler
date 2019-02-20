import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import moment from 'moment';

class PresentTime extends Component {
    constructor(props) {
        super(props);
        this.cellWidth = this.props.cellWidth;
        this.minuteStep = this.props.minuteStep;

        let mmtMidnight = moment().clone().startOf('day');
        let minutesSinceStartOfDay = moment().diff(mmtMidnight, 'minutes');
        this.minuteWidth = this.cellWidth / 15;
        let presentTimeLocation = minutesSinceStartOfDay * this.minuteWidth;
        this.state = {
          presentTime: minutesSinceStartOfDay,
          presentTimeLocation: presentTimeLocation
        }
        setInterval(this.tick, 60000)
    }

    tick = () => {
      let mmtMidnight = moment().clone().startOf('day');
      let minutesSinceStartOfDay = moment().diff(mmtMidnight, 'minutes');
      let ptime = minutesSinceStartOfDay <= 1440 ? minutesSinceStartOfDay : 0; 
      let location = ptime * this.minuteWidth;
      this.setState({presentTime: ptime, presentTimeLocation: location});
    }

    render() {
        const {shouldDisplay, color } = this.props;
        if(shouldDisplay) {
          return (
            <div style={{display: 'flex', flexFlow: 'column', float: 'right', height: '100%', width: '100%'}}>
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

export default PresentTime;