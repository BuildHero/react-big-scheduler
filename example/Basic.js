import React, {Component} from 'react'
import {PropTypes} from 'prop-types' 
import moment from 'moment'
//import 'moment/locale/zh-cn';
import 'antd/lib/style/index.less';     //Add this code for locally example
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, DemoData} from '../src/index'
import Nav from './Nav'
import Tips from './Tips'
import ViewSrcCode from './ViewSrcCode'
// import withDnDContext from './withDnDContext'
import {DndProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './test.css';

class Basic extends Component{
    constructor(props){
        super(props);

        let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day, false, false, {
            dayMaxEvents: 1,
            minuteStep: 15,
            eventItemHeight: 44,
            eventItemLineHeight: 48,
            nonAgendaSlotMinHeight: 0,
            dayCellWidth: 20,
            schedulerMaxHeight: 300
        });
        // let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Day);
        schedulerData.localeMoment.locale('en');
        schedulerData.behaviors.getScrollSpecialMomentFunc = (schedulerData, startMoment) => {
            console.log('here');
            return moment(startMoment).add(7, 'hours');
        }
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.events);
        this.state = {
            viewModel: schedulerData
        }
    }

    render(){
        const {viewModel} = this.state;
        return (
            <div>
                <Nav />
                <div>
                    <h3 style={{textAlign: 'center'}}>Basic example<ViewSrcCode srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/Basic.js" /></h3>
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                            //    eventItemClick={this.eventClicked}
                               viewEventClick={this.ops1}
                               viewEventText="Ops 1"
                               viewEvent2Text="Ops 2"
                               viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd}
                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                               onScrollLeft={this.onScrollLeft}
                               onScrollRight={this.onScrollRight}
                               onScrollTop={this.onScrollTop}
                               onScrollBottom={this.onScrollBottom}
                               eventItemContextMenuResolver={this.eventItemContextMenuResolver}
                    />
                </div>
                <Tips />
            </div>
        )
    }

    eventItemContextMenuResolver = (schedulerData, eventItem) => {
        let menuItems = []; 
        menuItems.push({
            id: "option1",
            label: "Copy",
            onClick: data => {
                console.log(data);
                alert('Copy clicked')
            },
            data: eventItem
        });
        menuItems.push({
            id: "divider1",
            divider: true
        })
        menuItems.push({
            id: "option2",
            label: "Remove tech",
            onClick: eventItem => {
                alert(`Remove tech clicked ${eventItem.resourceId}`)
            },
            data: eventItem
        });
        return {
            hideOnLeave: true, 
            onShow: (e) => {console.log('event show')},
            onHide: (e) => {console.log('event hide')},
            style: {
                zIndex: 1000,
                width: '240px',
                padding: '16px',
                color: '#adadad',
                borderRadius: '4px',
                margin: '-12px 0 0 -15px',
                boxShadow:
                '0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14)',
                backgroundColor: '#fff',
                fontFamily: ["'Arial'", 'sans-serif'].join(','),
                fontSize: '14px',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.29,
                letterSpacing: 'normal'
            }, 
            menuItems: menuItems
        };
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        // alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        // alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        // alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        // if(confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if(item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });

            let newEvent = {
                id: newFreshId,
                title: 'New event you just created',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'purple'
            }
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })
        // s}
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if(confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.next();
            schedulerData.setEvents(DemoData.events);
            this.setState({
                viewModel: schedulerData
            });
    
            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
            schedulerData.setEvents(DemoData.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = 10;
        }
    }

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }
}

export default Basic;
