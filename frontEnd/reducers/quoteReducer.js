
const quoteReducer = (state = {
  quote: '',
  createdBy: ''
}, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_QUOTE':
      return {
        ...state,
        quote: action.data.quote,
        createdBy: action.data.createdBy
      };
    case 'UPDATE_QUOTE_ERROR':
      return newState;
    default:
      return newState;
  }
};

export default quoteReducer;
