import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    READ_CLIENT_SUCCESS,
    REST_SCAN_SUCCESS,
    STATMENT_SUCCESS,
    SELECT_CHANGE,
    CERTIFICATE_APPLICATION,
    STATES_STATEMENT
} from '../constants/User';

const initialState = {
    isAuth: false,
    scan: false,
    restScan: false,
    statment: false,
    signature: false,
    officials: false,
    checkSelect: true,
    statesStatement: null
};

export default function user(state = initialState, action) {
    switch (action.type) {

        case STATES_STATEMENT:
            return { ...state, statesStatement: action.statesStatement};

        case LOGIN_REQUEST:
            return { ...state, data: action.payload, cert: action.cert };

        case READ_CLIENT_SUCCESS:
            return { ...state, client: action.client };

        case STATMENT_SUCCESS:
            return { ...state, statment: action.statment };

        case CERTIFICATE_APPLICATION:
            return { ...state, certApp: action.certApp };

        case REST_SCAN_SUCCESS:
            return { ...state, restScan: action.restScan };

        case SELECT_CHANGE:
            return { ...state, checkSelect: action.checkSelect };

        case LOGIN_SUCCESS:
            return { isAuth: true,
                regInfo: action.regInfo || null, certRequestsList: action.certRequestsList|| null,
                certList: action.certList|| null, note: action.note || null,
                statementsOnCreation: action.statementsOnCreation || null, clientsId: action.clientsId || null,
                templates: action.templates, opf: action.opf || null, selfRegId: action.selfRegId || null};

        case LOGIN_FAIL:
            return { note: action.note };

        case LOGOUT_SUCCESS:
            return { isAuth: false };

        case LOGOUT_FAIL:
            return { note: action.note };

        default:
            return state
    }
}