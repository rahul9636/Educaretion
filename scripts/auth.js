var loginTime;
var logoutTime;

auth.onAuthStateChanged(user => {
  setupUI(user);
})

var login = function(role, classCode, userId) {
  setTimeout(()=> {
    console.log(role)
    if (userId) {
      console.log('user logged in: ', userId);
      if (role === "teacher") {
        localStorage.setItem("teacherId",userId)
        window.location.href= './html/teacher/teacherDashboard.html'
      }else if(role === "student" && classCode !== -1) {
        var currDate = new Date();
        var prem = 1;
        loginTime = moment(currDate).format('YYYY-MM-DD hh:mm:ss');
        localStorage.setItem("studentId", userId)
        localStorage.setItem("classCode", parseInt(classCode))
        localStorage.setItem("loginTime", loginTime);
        localStorage.setItem("havePermission", prem);

        window.location.href = './html/student/history.html'
        // setupUI()
      }else{
        setupUI();
      }

    }else {
      console.log('user logged out');
      setupUI();
    }
  }, 1000);
}

// auth.onAuthStateChanged(user => {
// // auth.signOut();
// setTimeout(()=> {
//   console.log(role)
//   if (user) {
//     console.log('user logged in: ', user);
//     if (role === "teacher") {
//       localStorage.setItem("teacherId",user.uid)
//       window.location.href= './html/teacher/teacherDashboard.html'
//     }else if(role === "student" && classCode !== -1) {
//       var currDate = new Date();
//       var prem = 1;
//       loginTime = moment(currDate).format('YYYY-MM-DD hh:mm:ss');
//       localStorage.setItem("studentId",user.uid)
//       localStorage.setItem("classCode",parseInt(classCode))
//       localStorage.setItem("loginTime" ,loginTime);
//       localStorage.setItem("havePermission" ,prem);
//
//       window.location.href = './html/student/history.html'
//       // setupUI()
//     }else{
//
//       role='';
//       classCode=-1;
//       setupUI();
//     }
//
//   }else {
//     role='';
//     classCode=-1;
//     console.log('user logged out');
//     setupUI();
//   }
// }, 1000);
//
// })
// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {

  e.preventDefault();
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  role = signupForm['signup-role'].value;
  var name = signupForm['signup-name'].value;
  var classCode = parseInt(document.getElementById('output-code').innerHTML);
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // write user details to db
  var userId = String(cred.user.uid);

    if(role === "teacher") {
      db.ref(role + '/'+userId).set({
        "name": name,
        "classCode": parseInt(classCode)
      });
      db.ref(classCode + '/')
    } else {
      db.ref(role + '/' + userId).set({
        "name": name
      })
      db.ref(name + '/')
    }

    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
  }).catch (err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {

  e.preventDefault();
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  var role = loginForm['login-role'].value;
  var classCode = parseInt(loginForm['login-classcode'].value);

  var teacherUid = null;
  var studentUid = null;
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    if (role === "student") {

      studentUid = cred.user.uid;
      var teacherRef = firebase.database().ref().child("teacher");
      var studentRef = firebase.database().ref().child("student");
      var studentName;


      // write classCode details to respective nodes
      studentRef.orderByKey().equalTo(studentUid).once("child_added", function(snapshot) {
        studentName = snapshot.val().name;
        teacherRef.orderByChild('classCode').equalTo(parseInt(classCode)).once("child_added", function(snap) {
          teacherUid = snap.key;
          db.ref("teacher/" + teacherUid + "/studentsEnrolled/" + studentUid).update({
            "name": studentName
          })
            db.ref("student/" + studentUid + '/' + teacherUid).update({
              "classCode": parseInt(classCode)
            });
          });
      });


    } else {
      teacherUid = cred.user.uid;
    }
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).then(()=> {
    var userId = studentUid || teacherUid;
    login(role, classCode, userId);
  }).catch (err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});