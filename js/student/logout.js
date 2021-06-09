$(document).ready(()=>{
  //rahul
  var config={
    apiKey: "AIzaSyACGWt1yFP3T_Yp6A_kK_FSzAUiER1rpYc",
    authDomain: "my-project-1-244604.firebaseapp.com",
    databaseURL: "https://my-project-1-244604.firebaseio.com",
    projectId: "my-project-1-244604",
    storageBucket: "my-project-1-244604.appspot.com",
    messagingSenderId: "102441113758",
    appId: "1:102441113758:web:22e3c5596da0cde2d0c38f",
    measurementId: "G-M8R62CHMXR"
  }

//priyam
//   var config={
//   apiKey: "AIzaSyCDbgUULv7dsTgfSALFu_P1jyY8wvexGs8",
//   authDomain: "nodefirebasetest-e5d8b.firebaseapp.com",
//   databaseURL: "https://nodefirebasetest-e5d8b.firebaseio.com",
//   projectId: "nodefirebasetest-e5d8b",
//   storageBucket: "nodefirebasetest-e5d8b.appspot.com",
//   messagingSenderId: "409215339613",
//   appId: "1:409215339613:web:a52e1c5e11c1283944d1b4"

// }
  firebase.initializeApp(config);


  const auth = firebase.auth();
  const db = firebase.database();


  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {

    // alert(logout);


    var currDate = new Date();
    var logout = moment(currDate).format('YYYY-MM-DD hh:mm:ss');

    var loginTime = localStorage.getItem("loginTime");
    var studentId = localStorage.getItem("studentId");



     // $.ajax({  //calling rima's API .
     //              type: 'GET',
     //              url: 'http://69444c86943e.ngrok.io/badges/'+studentId,  //need to change the URL of ngrok  .
     //              dataType: 'json',
     //              contentType:'application/json',
     //              success:(response)=>{

     //              },
     //              error:(err)=>{
     //                // debugger
     //                console.log(err)
     //                auth.signOut();
     //                window.location.href='../../index.html'
     //              }

     //          })

     // $.ajax({  //calling rima's API .
     //              type: 'GET',
     //              url: 'http://69444c86943e.ngrok.io/coins/'+studentId,  //need to change the URL of ngrok  .
     //              dataType: 'json',
     //              contentType:'application/json',
     //              success:(response)=>{

     //              },
     //              error:(err)=>{
     //                // debugger
     //                console.log(err)
     //                auth.signOut();
     //                window.location.href='../../index.html'
     //              }

     //          })


    $.ajax({
                  type: 'POST',
                  url: 'http://172.26.20.208:3000/api/student/enterTimeOfInteraction',
                  dataType: 'json',
                  contentType:'application/json',


                  data:JSON.stringify({

                    id:studentId,
                    login:loginTime,
                    logout:logout,

                  }),
                  success:(response)=>{

                    localStorage.removeItem("teacherId")
                    localStorage.removeItem("studentId")
                    localStorage.removeItem("classCode")
                    localStorage.removeItem("date")
                    localStorage.removeItem("loginTime");
                    localStorage.removeItem("dashboardTeacherId")
                    localStorage.removeItem("queryId")
                    localStorage.removeItem("havePermission");
                    auth.signOut();
                    window.location.href='../../index.html'
                  },
                  error:(err)=>{
                    // debugger
                    console.log(err)
                    auth.signOut();
                    window.location.href='../../index.html'
                  }

              })

     



  });

})
