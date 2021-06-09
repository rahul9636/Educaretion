$(document).ready(()=>{

  if (localStorage.getItem("teacherId") === null){
 window.location.href = '../../index.html';
};
  const apiUrl=url.url
  var currentQuestion = 0;
  var total = 0;
  var allQuestions;
  var selectedQuestions = []
  var loadQuestions = function() {
    var questions = localStorage.getItem("questions");
    if (questions) {
      var parsedQuestions = JSON.parse(questions);
      var recallQuestions = parsedQuestions["recall"];
      var recallQuestionFiltered = recallQuestions.filter(x => { return x.Question.indexOf("____") > -1 });
      var multipleChoiceQuestions = parsedQuestions["multipleChoiceQuestions"];
      var mcqQuestions = multipleChoiceQuestions["mcq"];
      var tfQuestions = multipleChoiceQuestions["trueFalse"];
      var tfQuestionList = null;
      if (tfQuestions) {
        tfQuestionList = tfQuestions[0]["questionList"];
      }
      showQuestions(recallQuestionFiltered, mcqQuestions, tfQuestionList);
    } else {
      window.location.href='../../html/teacher/generateQuiz.html'
    }
  };

  var showQuestions = function(recallQuestions, mcqQuestions, tfQuestionList) {
    if (recallQuestions) {
      total += recallQuestions.length;
      allQuestions = recallQuestions;
    }
    if(mcqQuestions){
      total += mcqQuestions.length;
      allQuestions = allQuestions.concat(mcqQuestions);
    }
    if (tfQuestionList){
      total += tfQuestionList.length;
      allQuestions = allQuestions.concat(tfQuestionList);
    }

    displayQuestion();
  };

  var displayQuestion = function() {
    var question = allQuestions[currentQuestion];
    $('.number').text('('+(currentQuestion+1)+'/'+allQuestions.length+')')
    if(question.hasOwnProperty("Options")) {
      showMCQQuestion(question);
    } else if(question.hasOwnProperty("correctSent")){
      showTFQuestion(question);
    } else {
      showRecallQuestion(question);
    }
  }

  var showRecallQuestion = function(question) {

    $("#selectQuestion").prop("checked", false);
    $("#question").text(question["Question"])
    $("#optionsDiv").hide();
    $("#answer").text(question["Answer"]);
    if(selectedQuestions.indexOf(currentQuestion) > -1) {
      $("#selectQuestion").prop("checked", true);
    }
  }

  var showTFQuestion=function(question){
    $("#selectQuestion").prop("checked", false);
    $("#question").text(question["question"])
    $("#optionsDiv").hide();
    $("#answer").text(question["answer"]);
    if(selectedQuestions.indexOf(currentQuestion) > -1) {
      $("#selectQuestion").prop("checked", true);
    }
  }

  var showMCQQuestion = function(question) {
    $("#selectQuestion").prop("checked", false);
    $("#question").text(question["Question"]);
    $("#answer").text(question["Answer"]);
    var html = "<div>"
    for(var i=0; i<question["Options"].length; i++) {
      html += "<input type='radio' value='" +  question["Options"][i] + "' disabled>" + question["Options"][i] + "</input><br>";
    }
    html += "</div>";
    $("#optionsDiv").show();
    $("#options").empty();
    $("#options").append(html);
    if(selectedQuestions.indexOf(currentQuestion) > -1) {
      $("#selectQuestion").prop("checked", true);
    }
  }

  var loadEvents  = function() {
    $("#next").off("click");
    $("#next").on("click", () => {
      if(currentQuestion < total-1) {

        currentQuestion += 1;
        $('.number').text('('+(currentQuestion+1)+'/'+allQuestions.length+')')
        displayQuestion();
      }
    });

    $("#previous").off("click");
    $("#previous").on("click", () => {
      if(currentQuestion > 0) {
        currentQuestion -= 1;
          $('.number').text('('+(currentQuestion+1)+'/'+allQuestions.length+')')
        displayQuestion();
      }
    });

    $("#selectQuestion").change(function() {
      if (this.checked) {
        if (selectedQuestions.indexOf(currentQuestion) < 0) {
          selectedQuestions.push(currentQuestion);
        }
      } else {
        const index = selectedQuestions.indexOf(currentQuestion);
        if (index > -1) {
          selectedQuestions.splice(index, 1);
        }
      }
    });
  }
  $('#submit').on('click',()=>{
    var numberOfDaysForQuiz=localStorage.getItem("numberOfDaysForQuiz")
    console.log(selectedQuestions)
    // console.log(allQuestions)
    if(selectedQuestions.length==0) {
      alert("You have not selected a question. Please select one question.")
    }else {
      var quiz=[]
      var postData={}
      for(var i=0;i<selectedQuestions.length;i++) {
        var current = {}
        if(allQuestions[selectedQuestions[i]].hasOwnProperty('Options')) {
          // mcq questions
          current["type"]=1
          current["question"]=allQuestions[selectedQuestions[i]].Question
          current["answer"]=allQuestions[selectedQuestions[i]].Answer
          current["options"]=allQuestions[selectedQuestions[i]].Options
        }else if(allQuestions[selectedQuestions[i]].hasOwnProperty('originalSentence')){
          // recall questions
          current["type"]=0
          current["question"]=allQuestions[selectedQuestions[i]].Question
          current["answer"]=allQuestions[selectedQuestions[i]].Answer

        }
        if(allQuestions[selectedQuestions[i]].hasOwnProperty('correctSent')){
          //true /false questions
          current["type"]=2
          current["question"]=allQuestions[selectedQuestions[i]].question
          current["answer"]=allQuestions[selectedQuestions[i]].answer
        }
        quiz.push(current)

      }
      postData["numberOfDaysForQuiz"]=numberOfDaysForQuiz;
      postData["quiz"]=quiz;
      console.log(quiz);
      console.log(postData)

      //make ajax request.....
      $.ajax({
        url:apiUrl+'/api/teacher/updateTeacherAndStudentQuiz?teacherId='+teacherId+'&studentId='+studentId+'&queryId='+queryId,
        type:'POST',
        dataType: 'json',
        contentType: 'application/json',

        data:JSON.stringify(postData),
        success:(response)=>{
          console.log(response)
          localStorage.removeItem("questions")
          localStorage.removeItem("numberOfDaysForQuiz")
          window.location.href='../../html/teacher/teacherDashboard.html'
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }
  })

  loadQuestions();
  loadEvents();
})
