$(document).ready(()=>{
  //priyam
  var config={
  apiKey: "AIzaSyCDbgUULv7dsTgfSALFu_P1jyY8wvexGs8",
  authDomain: "nodefirebasetest-e5d8b.firebaseapp.com",
  databaseURL: "https://nodefirebasetest-e5d8b.firebaseio.com",
  projectId: "nodefirebasetest-e5d8b",
  storageBucket: "nodefirebasetest-e5d8b.appspot.com",
  messagingSenderId: "409215339613",
  appId: "1:409215339613:web:a52e1c5e11c1283944d1b4"
  }

  //rahul
  // var config={
  //   apiKey: "AIzaSyACGWt1yFP3T_Yp6A_kK_FSzAUiER1rpYc",
  //   authDomain: "my-project-1-244604.firebaseapp.com",
  //   databaseURL: "https://my-project-1-244604.firebaseio.com",
  //   projectId: "my-project-1-244604",
  //   storageBucket: "my-project-1-244604.appspot.com",
  //   messagingSenderId: "102441113758",
  //   appId: "1:102441113758:web:22e3c5596da0cde2d0c38f",
  //   measurementId: "G-M8R62CHMXR"
  // }
  firebase.initializeApp(config);


  const auth = firebase.auth();
  const db = firebase.database();


  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    // var loggedOutTime = Date.now();
    // var curUserUid = firebase.auth().currentUser.uid;
    // var studentRef = firebase.database().ref().child("student");
    // studentRef.orderByKey().equalTo(curUserUid).on("child_added", function(snapshot) {
    //   var temp = snapshot.val();
    //   if (temp != undefined) {
    //     logoutTime = moment().format('YYYY-mm-DD hh:mm:ss');
    //
    //     // WRITE TO API HERE
    //   }
    // });

    e.preventDefault();
    localStorage.removeItem("teacherId")
    localStorage.removeItem("questions")
    localStorage.removeItem("numberOfDaysForQuiz")
    auth.signOut();
    window.location.href='../../index.html'
  });

})
