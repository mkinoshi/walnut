/**
 * Created by ebadgio on 8/15/17.
 */
import axios from 'axios';
import URL from '../../info';

const getMyConvosThunk = (convos) => (dispatch) => {
  const param = convos.join('+');
  console.log('params frontend', param);
  axios.get(URL + 'db/get/myconversations/' + param)
    .then((response) => {
      console.log(response, response.data.posts);
      dispatch({type: 'GET_MY_CONVOS_DONE', posts: response.data.posts });
    })
    .catch((error) => {
      console.log('get my convos error', error);
    });
};
export default getMyConvosThunk;
