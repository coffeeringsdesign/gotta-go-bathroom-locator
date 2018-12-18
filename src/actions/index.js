import constants from './../constants';
// import firebase from 'firebase';
const { firebaseConfig } = constants;
const firebase = require('firebase/app');

firebase.initializeApp(firebaseConfig);
// const bathrooms = firebase.database().ref('bathrooms');
//
// export function addBathroom()

// export function watchFirebaseBathroomsRef() {
//   return function(dispatch) {
//     bathrooms.on('child_added', data => {
//       console.log(data.val());
//     });
//   };
// }
