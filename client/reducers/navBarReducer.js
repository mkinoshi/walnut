const navBarReducer = (state = {
}, action) => {
  switch (action.type) {
    case 'CHANGE_NAVBAR_TAB':
      localStorage.setItem('tab', JSON.stringify(action.tab));
      return {
        tab: action.tab
      };
    default:
      if(localStorage.getItem('tab')) {
        return {
          tab: Number(localStorage.getItem('tab'))
        };
      }
      return {
        tab: 1
      };
  }
};

export default navBarReducer;
