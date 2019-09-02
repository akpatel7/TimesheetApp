import moment from 'moment';
import { range } from 'utilities/helpers';

export const getDaysContentOfPresentMonth = date => {
    const daysInMonth = moment(date).daysInMonth();
    return range(1, daysInMonth + 1);
};

export const getDaysContentOfLastMonth = date => {
    const lastDayOfPreviousMonth = moment(date).subtract(1, 'month').endOf('month').date();
    const firstday = moment(date).startOf('month').format('e');
    return range(lastDayOfPreviousMonth - firstday + 1,
        lastDayOfPreviousMonth + 1);
};

export const getDaysContentOfNexMonth = date => {
    return range(1,  7 - moment(date).endOf('month').format('e'));
};
// return true if the firstDate and secondDate have the same year and month
export const isSameYearMonth = (firstDate, secondDate) => {
    return moment(firstDate).isSame(secondDate, 'month');
};

export const getPositionForDate = (originDate, date) => {
    const daysPastOrigin = moment(date).diff(moment(originDate), 'days');
    const row = Math.floor(daysPastOrigin / 7);
    const col = daysPastOrigin % 7;
    return { row, col };
};

export const getOriginDate = date => moment(date).startOf('month').startOf('week');

