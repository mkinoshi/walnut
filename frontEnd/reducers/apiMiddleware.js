import axios from 'axios';
const URL = 'http://localhost:3000/';

export const apiMiddleware = store => next => action => {
  next(action);
  switch(action.type) {
    case 'GET_USER_DATA':
      axios.get(URL + 'db/user')
       .then((response) => {
         store.dispatch({type: 'GET_USER_DATA_DONE', data: response.data.data});
       })
       .catch((err) => {
         console.log('getting error in login', err);
         store.dispatch({type: 'GET_USER_DATA_ERROR'});
       });
      break;
    case 'NEW_COMMENT':
      axios.post(URL + 'db/save/comment', {
        commentBody: action.commentBody,
        postId: action.postId
      })
      .then(() => {
        next(action(store.dispatch({type: 'GET_DISCOVER_INFO'})));
        next(action);
      })
      .catch((err) =>{
        console.log('error in newComment', err);
      });
      break;
    case 'NEW_POST':
      axios.post(URL + 'db/save/post', {
        postBody: action.postBody,
        postTags: action.postTags
      })
      .then(() => {
        next(action(store.dispatch({type: 'GET_DISCOVER_INFO'})));
        next(action);
      })
      .catch((err) =>{
        console.log('error in newComment', err);
      });
      break;
    case 'TOGGLE_FILTER_CHECKED':
      store.dispatch({type: 'TOGGLE_FILTER_FRONT', index: action.index});
      axios.post(URL + 'db/toggle/checked', {
        tagName: action.name
      })
      .catch((err) =>{
        console.log('error in toggleFilterPref', err);
      });
      break;
    case 'GET_QUOTE':
      axios.get(URL + 'db/get/quote')
      .then((response) => {
        store.dispatch({type: 'UPDATE_QUOTE', data: response.data});
      })
      .catch((err) =>{
        console.log('error in newComment', err);
        store.dispatch({type: 'UPDATE_QUOTE_ERROR'});
      });
      break;
    case 'NEW_LIKE':
      axios.post(URL + 'db/save/postlike', {
        postId: action.postId,
      })
      .then(() => {
        next(action(store.dispatch({type: 'GET_DISCOVER_INFO'})));
        next(action);
      });
      break;
    case 'NEW_COMMENT_LIKE':
      axios.post(URL + 'db/save/commentlike', {
        postId: action.postId,
        commentId: action.commentId
      })
      .then(() => {
        next(action(store.dispatch({type: 'GET_DISCOVER_INFO'})));
        next(action);
      });
      break;
    case 'SAVE_BLURB':
      axios.post(URL + 'db/save/blurb', {
        blurbBody: action.blurb
      })
      .catch((err) =>{
        console.log('error in saving blurb', err);
      });
      break;
    case 'SAVE_TAGS':
      axios.post(URL + 'db/save/tags', {
        tagsArray: action.tags
      })
      .then((success) => {
        console.log('success in save', success);
      })
      .catch((err) =>{
        console.log('error in saving tags', err);
      });
      break;
    case 'SAVE_INTERESTS':
      axios.post(URL + 'db/save/interests', {
        interestsArray: action.interests
      })
      .then((success) => {
        console.log('success in save', success);
      })
      .catch((err) =>{
        console.log('error in saving interests', err);
      });
      break;
    case 'SAVE_ABOUT':
      axios.post(URL + 'db/save/about', {
        education: action.about.education,
        majors: action.about.majors,
        currentOccupation: action.about.currentOccupation,
        currentOccupationCity: action.about.currentOccupationCity,
        pastOccupations: action.about.pastOccupations
      })
      .then((success) => {
        console.log('success in save', success);
        next(action(store.dispatch({type: 'GET_PROFILE_INFO'})));
        next(action);
      })
      .catch((err) =>{
        console.log('error in saving about', err);
      });
      break;
    case 'SAVE_CONTACT':
      axios.post(URL + 'db/save/contact', {
        email: action.contact.email,
        address: action.contact.address,
        phone: action.contact.phone
      })
      .then((success) => {
        console.log('success in save', success);
        next(action(store.dispatch({type: 'GET_PROFILE_INFO'})));
        next(action);
      })
      .catch((err) =>{
        console.log('error in saving contact', err);
      });
      break;
    case 'SAVE_LINKS':
      axios.post(URL + 'db/save/links', {
        linksArray: action.links
      })
      .then((success) => {
        console.log('success in save', success);
        next(action(store.dispatch({type: 'GET_PROFILE_INFO'})));
        next(action);
      })
      .catch((err) =>{
        console.log('error in saving links', err);
      });
      break;
    case 'SAVE_PROJECTS':
      axios.post(URL + 'db/save/projects', {
        // TODO: PROJECTS
      })
      .catch((err) =>{
        console.log('error in saving projects', err);
      });
      break;
    case 'SAVE_STORY':
      axios.post(URL + 'db/save/story', {
        // TODO: STORY
      })
      .catch((err) =>{
        console.log('error in saving story', err);
      });
      break;
    case 'CREATE_PROFILE':
      axios.post(URL + 'db/save/iscreated')
      .then((response) => {
        console.log('response', response);
        store.dispatch({type: 'GET_PROFILE_DATA_DONE', data: response.data.data});
      })
      .catch((err) =>{
        console.log('error in creating profile', err);
        store.dispatch({type: 'GET_PROFILE_DATA_ERROR'});
      });
      break;
    case 'GET_PROFILE_INFO':
      axios.get(URL + 'db/get/profileinfo')
      .then((response) => {
        store.dispatch({type: 'GET_PROFILE_DATA_DONE', data: response.data.data});
      })
      .catch((err) =>{
        console.log('error in getting profile data', err);
        store.dispatch({type: 'GET_PROFILE_DATA_ERROR'});
      });
      break;
    case 'GET_DISCOVER_INFO':
      axios.get(URL + 'db/get/discoverinfo')
      .then((response) => {
        console.log('discover', response);
        store.dispatch({type: 'GET_DISCOVER_DATA_DONE', data: response.data});
        store.dispatch({type: 'STATE_FILLED', isLoaded: {isLoaded: true}});
      })
      .catch((err) =>{
        console.log('error in newComment', err);
        store.dispatch({type: 'GET_DISCOVER_DATA_ERROR'});
        store.dispatch({type: 'STATE_FILLED_ERROR'});
      });
      break;
    case 'GET_ALL_USERS':
      axios.get(URL + 'db/get/allusers')
      .then((response) => {
        store.dispatch({type: 'GET_ALL_USERS_DONE', data: response.data});
      })
      .catch((err) =>{
        console.log('error in getting users', err);
        store.dispatch({type: 'GET_ALL_USERS_ERROR'});
      });
      break;
    case 'GET_ONE_PROFILE':
      axios.get(URL + 'db/get/specprofile', {
        owner: action.id
      })
      .then((response) => {
        console.log('in one profile get', response);
        store.dispatch({type: 'GET_PROFILE_DATA_DONE', data: response.data});
      })
      .catch((err) =>{
        console.log('error in getting profile data', err);
        store.dispatch({type: 'GET_PROFILE_DATA_ERROR'});
      });
      break;
    case 'GET_ALL_PROFILES':
      axios.get(URL + 'db/get/allprofiles')
      .then((response) => {
        console.log('deck middleware', response);
        store.dispatch({type: 'GET_ALL_PROFILES_DONE', data: response.data});
      })
      .catch((err) =>{
        console.log('error in getting users', err);
        store.dispatch({type: 'GET_ALL_PROFILES_ERROR'});
      });
      break;
    default:
      break;
  }
};
