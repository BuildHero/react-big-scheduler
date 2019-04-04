import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  popoverStyle: {
    // width: '240px',
    zIndex: 1000,
    borderRadius: '4px',
    // padding: '16px',
    margin: '-12px 0 0 -15px',
    boxShadow:
      '0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14)',
    backgroundColor: '#fff',
    fontFamily: ["'Lato'", 'sans-serif'].join(','),
    fontSize: '14px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.29,
    letterSpacing: 'normal'
  }
});

class EventContextMenu extends React.Component {
  onShow = e => {
    const { event } = this.props;
    event.showPopover = false;
  };

  render() {
    const { classes } = this.props;
    return (
      <ContextMenu id="eventitem_identifier" className={classes.popoverStyle} onShow={this.onShow}>
        <MenuItem data={{ action: 'newJob' }}>Copy</MenuItem>
        <MenuItem divider />
        <MenuItem data={{ action: 'timeOff' }} onClick={this.handleClick}>
          Remove tech from visit
        </MenuItem>
      </ContextMenu>
    );
  }
}

export default withStyles(styles)(EventContextMenu);