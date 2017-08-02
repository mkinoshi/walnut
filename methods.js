/**
 * Created by ebadgio on 8/2/17.
 */

// On success response of newPost thunk: Start the chat
const writeChatData = (postId, content, createdAt) => {
  firebase.database().ref('chats/' + postId).set({
    title: content,
    createdAt: createdAt,
  });
};

const writeMemberData = (postId, uid) => {
    firebase.database().ref('members/' + postId).set({

    });
}

