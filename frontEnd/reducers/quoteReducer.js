
const quoteReducer = (state = {
  quote: 'Stay Hungry Stay Foolish',
  createdBy: 'Steve Jobs'
}, action) => {
  const data = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_QUOTE':
      data.quote = action.data.quote;
      data.createdBy = action.data.createdBy;
      return data;
    case 'UPDATE_QUOTE_ERROR':
      return data;
    default:
      return data;
  }
};

export default quoteReducer;
