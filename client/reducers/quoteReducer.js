
const quoteReducer = (state = {
  quote: 'Stay Hungry Stay Foolish',
  createdBy: 'Steve Jobs'
}, action) => {
  switch (action.type) {
    case 'UPDATE_QUOTE':
      return {
        ...state,
        quote: action.data.quote,
        createdBy: action.data.createdBy
      };
    case 'UPDATE_QUOTE_ERROR':
      return state;
    default:
      return state;
  }
};

export default quoteReducer;
