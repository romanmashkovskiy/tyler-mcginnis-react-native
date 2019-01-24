import {RECEIVE_ENTRIES, ADD_ENTRY} from '../actions/index';

export const entries = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTRIES:
        case ADD_ENTRY:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};