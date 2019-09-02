import * as account from './account';
import * as timesheets from './timesheets';
import * as entries from './entries';
import * as status from './status';


// Add watchers to root saga.
export default function* () {
    yield [
        // Account
        account.watch(),

        // Timesheets
        timesheets.watch(),

        // Entries
        entries.watch(),

        // Status
        status.watchShowStatus()
    ];
};
