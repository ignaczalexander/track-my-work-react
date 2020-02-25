import {
  CREATE_PERIOD,
  GET_PERIODS,
  GET_PERIOD,
  DELETE_PERIOD,
  CREATE_SHIFT,
  DELETE_SHIFT,
  PERIOD_LOADING,
  UPDATE_PERIOD
} from '../actions/types';

const initialState = {
  periods: null,
  period: {},
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PERIOD:
      return {
        ...state,
        periods: [action.payload, ...state.periods],
        period: action.payload
      };
    case GET_PERIODS:
      return {
        ...state,
        periods: action.payload,
        period: {},
        loading: false
      };
    case PERIOD_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PERIOD:
      return {
        ...state,
        period: action.payload
      };
    case DELETE_PERIOD:
      const newPeriods = state.periods.filter(
        period => period._id.toString() !== action.payload
      );
      const period = newPeriods.length === 0 ? {} : newPeriods[0];
      return {
        ...state,
        periods: newPeriods,
        period
      };
    case UPDATE_PERIOD:
      return {
        ...state,
        periods: [
          action.payload,
          state.periods.filter(
            period => period._id.toString() !== action.payload._id
          )
        ],

        period: action.payload
      };
    case CREATE_SHIFT:
      return {
        ...state,
        periods: state.periods.map(per => {
          if (per._id === action.payload._id) {
            return action.payload;
          }
          return per;
        }),
        period: action.payload
      };
    case DELETE_SHIFT:
      return {
        ...state,
        periods: state.periods.map(per => {
          if (per._id === action.payload.period_id) {
            per.shifts = per.shifts.filter(
              shift => shift._id !== action.payload.shift_id
            );
            return per;
          }
          return per;
        }),
        period: {
          ...state.period,
          shifts: state.period.shifts.filter(
            shift => shift._id !== action.payload.shift_id
          )
        }
      };
    default:
      return state;
  }
}
