import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Entries from 'comps/entries';

import './styles';


const S = state => state.comps.timesheets;
import * as A from './actions';


export default connect(S, A)(class Timesheets extends React.Component {
    componentWillMount = () => this.props.getTimesheets();

    render = () => <div id='timesheets'>
        <TimesheetsList />
        <Timesheet />
        <NewTimesheet />
    </div>;
});


const TimesheetsList = connect(S, A)($ => {
    if (!$.entities) return null;

    const timesheets = Object.keys($.entities).map(id => $.entities[id]);

    if (!$.listOpen) return <div className='list'>
        <div className='header' onClick={ $.toggleTimesheetsList }>
            Timesheets ({ timesheets.length })
            <button>
                <i className='fa fa-expand'/>
            </button>
        </div>
    </div>;

    return <div className='list expanded'>
        <div className='header'>
            Timesheets ({ timesheets.length })
            <button onClick={ $.toggleTimesheetsList }>
                <i className='fa fa-minus'/>
            </button>
        </div>

        { !timesheets.length && <div className='no-content'>
            No timesheets :(
        </div> }

        { timesheets.map(timesheet =>
            <div
                className='timesheet-item'
                onClick={ () => $.selectTimesheet(timesheet) }
                key={ timesheet.id }
            >
                <div className='header'>
                    timesheet { moment(timesheet.date).format('YYYY/MM/DD') }
                </div>
            </div>
        ) }

        <div
            className='timesheet-item add'
            onClick={ $.toggleNewTimesheet }
        >
            <div className='header'>
                New timesheet
                <button><i className='fa fa-plus-circle'/></button>
            </div>
        </div>
    </div>;
});


const Timesheet = connect(S, A)($ => {
    if (!$.selected) return null;

    if (!$.selected.id) return null;

    const timesheet = $.entities[$.selected.id];

    return <div className='overlay'>
        <div className='timesheet selected'>
            <div className='header'>
                timesheet { moment(timesheet.date).format('YYYY/MM/DD') }
                <button onClick={ () => $.selectTimesheet({}) }>
                    <i className='fa fa-minus'/>
                </button>
            </div>

            <Entries { ...{ timesheet } } />

            <button
                className='action delete'
                onClick={ () => $.deleteTimesheet(timesheet) }
            >
                Delete timesheet
                <i className='fa fa-trash'/>
            </button>
        </div>
    </div>;
});


const NewTimesheet = connect(S, A)($ => {
    if (!$.new) return null;

    return <div className='new-timesheet expanded'>
        <div className='header'>
            New timesheet
            <button onClick={ $.toggleNewTimesheet }>
                <i className='fa fa-times-circle'/>
            </button>
        </div>

        <div className='inline-input'>
            <label>Week of:</label>
            <input
                onChange={ e => $.setDate(e.target.value) }
                type='date'
                value={ $.date || '' }
            />
        </div>

        { $.date && <button
            className='action submit'
            onClick={ () => $.submitTimesheet({
                date: $.date
            }) }
        >
            Submit
            <i className='fa fa-thumbs-up'/>
        </button> }
    </div>;
});
