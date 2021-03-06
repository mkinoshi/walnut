// TODO: not sure this is necessary as all of the logic is done off of window url
const navBarReducer = (state = {
}, action) => {
  switch (action.type) {
    case 'CHANGE_NAVBAR_TAB':
      sessionStorage.setItem('tab', JSON.stringify(action.tab));
      return {
        tab: action.tab
      };
    default:
      if(sessionStorage.getItem('tab')) {
        return {
          tab: Number(sessionStorage.getItem('tab'))
        };
      }
      return {
        tab: 1
      };
  }
};

export default navBarReducer;
