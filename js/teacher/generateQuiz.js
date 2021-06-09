$(document).ready(()=>{
  if (localStorage.getItem("teacherId") === null){
 window.location.href = '../../index.html';
};
  const apiUrl=url.url
  var queryParamter= new URLSearchParams(window.location.search)
  var studentId=queryParamter.get('studentId')
  var teacherId=queryParamter.get('teacherId')
  var queryId=queryParamter.get('queryId')
  var query=queryParamter.get('query')
  var numberOfDaysForQuiz;
  $('#queryTitle').text('Assign retention quiz for query - '+query)
  $('#submit').on('click',()=>{
    var title=$('.quizTitle').val()
    var text=$('.quizText').val()
    numberOfDaysForQuiz=$('.numberOfDaysForQuiz').val()
    var postData={title,text}
    $.ajax({
      url:`{apiUrl}/api/teacher/generateRetentionQuiz`,
      type:'POST',
      dataType: 'json',
      contentType: 'application/json',

      data:JSON.stringify(postData),
      success:(result)=>{

        $('#questionSelect').removeAttr('disabled');
        localStorage.setItem("questions", JSON.stringify(result))
        localStorage.setItem("numberOfDaysForQuiz",numberOfDaysForQuiz)
        //window.location.href='../html/teacherDashboard.html'
      },
      error:(err)=>{
        console.log(err)
      }
    })

  });

  $('#questionSelect').on('click',()=>{
    window.location.href='../../html/teacher/questionSelect.html?teacherId='+teacherId+'&studentId='+studentId+'&queryId='+queryId
  })
})
