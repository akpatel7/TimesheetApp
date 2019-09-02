import React from 'react';
import { connect } from 'react-redux';


const S = state => state.comps.entries;
import * as A from './actions';


export default connect(S, A)($ => {
    const totalHours = $.timesheet.entries.reduce((sum, entry) => sum + entry.duration, 0)

    return <div className='entries'>
        { $.timesheet.entries.length < 1 && <div className='no-content'>
            No entries <i className='fa fa-frown-o'/>
        </div> }

        <div className='labels'>
            <div className='number'></div>
            <div className='duration'>Duration</div>
            <div className='task'>Task</div>
        </div>

        { $.timesheet.entries.map((entry, i) =>
            <div className='entry' key={ i }>
                <div className='value number'><i className='fa fa-hashtag'/>{ i+1 }</div>
                <div className='value duration'>{ entry.duration } hours</div>
                <div className='value task'>{ entry.task }</div>
            </div>
        )}

        <div className='summary'>
            Hours: { totalHours }
        </div>

        <NewEntry { ...{ timesheet: $.timesheet } } />
    </div>;
});


const NewEntry = connect(S, A)($ => {
    if (!$.newEntry) return (
        <button
            className='action open-new-entry'
            onClick={ $.newEntryToggle }
        >
            New entry <i className='fa fa-plus-circle'/>
        </button>
    );

    return <div className='new-entry'>
        <div className='header'>
            New entry
            <button onClick={ $.newEntryToggle }>
               <i className='fa fa-times-circle'/>
            </button>
        </div>

        <div className='inline-input'>
            <label>Worked on:</label>
            <input
                onChange={ e => $.setTask(e.target.value) }
                type='text'
                value={ $.task }
            />
        </div>

        <div className='inline-input'>
            <label>Duration (hours):</label>
            <input
                onChange={ e => $.setDuration(e.target.value) }
                type='number'
                value={ $.duration }
            />
        </div>

        { !!($.task && $.duration) && <button
            className='action submit'
            onClick={ () => $.submitEntry({
                timesheetId: $.timesheet.id,
                duration: $.duration,
                task: $.task
            }) }
        >
            Save entry
            <i className='fa fa-thumbs-up'/>
        </button> }
    </div>;
});
