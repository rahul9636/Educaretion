const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const signupTeacher = document.getElementById("role-teacher");
const signupStudent = document.getElementById("role-student");

signupTeacher.addEventListener("click", function() {
  document.getElementById("output-code").style.display = "block";
  document.getElementById("output-code").innerHTML = Date.now(); 
  // document.getElementById("signup-coursename").style.display = "block";
});

signupStudent.addEventListener("click", function() {
  document.getElementById("output-code").style.display = "none";
  // document.getElementById("signup-coursename").style.display = "none";  
});

const loginTeacher = document.getElementById('login-teacher');
const loginStudent = document.getElementById('login-student');

loginTeacher.addEventListener("click", function() {
  document.getElementById("login-classcode").style.display = "none";
  // document.getElementById("login-classcode").style.visibility = "visibile";
});

loginStudent.addEventListener("click", function() {
  document.getElementById("login-classcode").style.display = "block";
  // document.getElementById("login-classcode").style.visibility = "hidden";
})


const setupUI = (user) => {
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

