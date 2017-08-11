/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const getQuoteThunk = (dispatch) => {
  axios.get(URL + 'db/get/quote')
    .then((response) => {
      dispatch({type: 'UPDATE_QUOTE', data: response.data});
    })
    .catch((err) =>{
      console.log('error in newComment', err);
      dispatch({type: 'UPDATE_QUOTE_ERROR'});
    });
};
export default getQuoteThunk;
