$(document).ready(()=>{
  var studentId=localStorage.getItem("studentId")
  var classCode=localStorage.getItem("classCode")
  $('#chatbot').on('click',function(){
    window.location.href='../../html/student/chatbot.html?studentId='+studentId+"&classCode="+classCode
  })

})
