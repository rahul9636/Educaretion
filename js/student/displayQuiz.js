$(document).ready(()=>{

  if (localStorage.getItem("havePermission") === null){
    window.location.href = '../../index.html';
  };


  var queryParamter= new URLSearchParams(window.location.search)
  var studentId=queryParamter.get('studentId')
  var teacherId=queryParamter.get('teacherId')
  var queryId=queryParamter.get('queryId')

  var currentQuestion = 0;
  var totalQuestions = 0;
  var allQuestions = null;
  var studentAnswers = [];
  var answers=[]
  var postData={studentId,teacherId,queryId}
  var currentType = -1;
  const apiUrl=url.url
 $.ajax({

    url:'http://172.26.20.208:3000/api/student/getRetentionQuiz?studentId='+studentId+'&teacherId='+teacherId+'&queryId='+queryId,

    type:'POST',
    dataType: 'json',
    contentType: 'application/json',
    data:JSON.stringify(postData),

    success:(result)=>{
      console.log(result)
      for(var i=0;i<result.length;i++){
        answers[i]=result[i].answer
      }
      renderQuestions(result);
      console.log(answers)
    },
    error:(err)=>{
      console.log(err)
    }
  });

  var renderQuestions = function(questions) {

    totalQuestions = questions.length;
    allQuestions = questions;
    showQuestion();
    loadEvents();
  }

  var showQuestion = function () {


        var question = allQuestions[currentQuestion];
        var type = question.type;
        $('.number').text('('+(currentQuestion+1)+'/'+allQuestions.length+')')
        currentType = type;
        if(type == 0) {
          showRecallQuestion(question.question);
        }else if(type == 1){
          showMultipleChoiceQuestion(question.question,question.options)
        }else{
          showTFQuestion(question.question)
        }


  }

  var showRecallQuestion = function(question) {

    $('#question').text(question);
    $("#optionsDiv").hide();
    $("#answerDiv").show();
    $("#answer").val('');
  }
  var showMultipleChoiceQuestion=function(questions,options){

    $("#question").text(questions);
    $("#answerDiv").hide();
    var html = "<div>"
    for(var i=0; i<options.length; i++) {
      html += "<input type='radio' name='options' value='" +  options[i] + "'>" + options[i] + "</input><br>";
    }
    html += "</div>";
    $("#optionsDiv").show();
    $("#options").empty();
    $("#options").append(html);
  }
  var showTFQuestion = function(question) {

    var options=['true','false']
    $('#question').text(question);
    $("#answerDiv").hide();
    var html = "<div>"
    for(var i=0; i<options.length; i++) {
      html += "<input type='radio' name='true-false' value='" +  options[i] + "'>" + options[i] + "</input><br>";
    }
    html += "</div>";
    $("#optionsDiv").show();
    $("#options").empty();
    $("#options").append(html);
  }

  var loadEvents = function() {
    $("#next").off("click");
    $("#next").on("click", function() {


      if(currentType == 0 && currentQuestion !== totalQuestions-1) {
        studentAnswers[currentQuestion] = $("#answer").val();
      }else if(currentType == 1 && currentQuestion !== totalQuestions-1){
        studentAnswers[currentQuestion]=$("input[name='options']:checked").val();
      }else if(currentType == 2 && currentQuestion !== totalQuestions-1){
        studentAnswers[currentQuestion]=$("input[name='true-false']:checked").val();
      }

      if(currentQuestion < totalQuestions-1) {

        currentQuestion += 1;
        $('.number').text('('+(currentQuestion+1)+'/'+allQuestions.length+')')
        showQuestion();

      }
    });

    $("#previous").off("click");
    $("#previous").on("click", function() {

      if(currentQuestion > 0){
        currentQuestion -= 1;
        $('.number').text('('+(currentQuestion+1)+'/'+allQuestions.length+')')
        if(currentType == 0) {
          showQuestion()
          studentAnswers[currentQuestion] = $("#answer").val();
        }else if(currentType == 1){
          showQuestion()
          studentAnswers[currentQuestion] = $("input[name='options']:checked").val();
        }else if(currentType == 2) {
          showQuestion()
          studentAnswers[currentQuestion] = $("input[name='true-false']:checked").val();
        }

        showQuestion()
      }

    });
  }
  $('#submit').on('click',()=>{

    if(currentType == 0) {
      studentAnswers[currentQuestion] = $("#answer").val();
    }else if(currentType == 1) {
      studentAnswers[currentQuestion]=$("input[name='options']:checked").val();
    }else if(currentType == 2) {
      // do same for true false
      studentAnswers[currentQuestion]=$("input[name='true-false']:checked").val();
    }
    var retentionScore;

    for(var i=0;i<answers.length;i++) {
      var str=answers[i]
      var res = str.replace(/\./g,' ');
      res=res.replace("'","")
      answers[i]=res
    }
    console.log(answers)
    console.log(studentAnswers)
    var correct=0;
    for(var i=0;i<answers.length;i++) {
      if(studentAnswers[i] !== undefined){
        if(studentAnswers[i].toLowerCase() === answers[i].toLowerCase()) {
          correct +=1;
        }
      }

    }
    retentionScore=Math.ceil((correct/(answers.length))*100);





   $.ajax({
                  type: 'POST',
                  url: `http://172.26.20.208:3000/api/student/updateScoreOfRetentionQuiz`,
                  dataType: 'json',
                  contentType:'application/json',


                  data:JSON.stringify({

                    studentId:studentId,
                    teacherId:teacherId,
                    queryId: queryId,
                    score : retentionScore,

                  }),
                  success:(response)=>{
                    
                      var skillExpert ;
                      if(retentionScore  <= 40){
                       skillExpert = "Low";
                      }else if(retentionScore <= 80){
                       skillExpert = "Medium";
                      }else {
                       skillExpert = "High";
                      }

                     $.ajax({
                                 type: 'POST',
                                 url: `http://172.26.20.208:3000/api/student/updateSkillExpert`,
                                 dataType: 'json',
                                 contentType:'application/json',


                                 data:JSON.stringify({

                                   studentId:studentId,
                                   teacherId:teacherId,
                                   queryId: queryId,
                                   skillExpert : skillExpert,

                                 }),
                                 success:(response2)=>{
                                   window.location.href='../../html/student/history.html' 
                                 }


                             })
                    

                      // $.ajax({  //calling rima's API .
     //              type: 'GET',
     //              url: 'http://69444c86943e.ngrok.io/coins/'+studentId+'/'teacherId+'/'+queryId,  //need to change the URL .
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


                    }


              })



  })
})
