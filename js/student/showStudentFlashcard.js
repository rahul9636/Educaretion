$(document).ready(()=>{
   if (localStorage.getItem("havePermission") === null){
    window.location.href = '../../index.html';
  };

  var date = new Date();
  localStorage.setItem("date",date);

  var queryParamter= new URLSearchParams(window.location.search)
  var teacherId=localStorage.getItem("dashboardTeacherId")
  var studentId=localStorage.getItem("studentId")
  var queryId=queryParamter.get('queryId')
  const apiUrl=url.url
  window.data = []
  $.ajax({
       type: 'GET',

        url: 'http://172.26.20.208:3000/api/student/getFlashCard?studentId='+studentId+'&teacherId='+teacherId+'&queryId='+queryId,
        success: function(jsondata){


              console.log(jsondata);
              if(jsondata.message){
                  window.data.push({question:"FLASHCARD NOT ASSIGNED"});
                } else{
                  for( var i = 0 ; i<  jsondata["question"].length ; i++ ){
                      window.data.push({question:jsondata["question"][i] , answer:jsondata["answer"][i] });
                  }
                }
            renderQuestions(data);
      }
})
  var currentQuestion = 0;
  var totalQuestions = 0;
  var allQuestions = null;

  var renderQuestions = function(question) {

    totalQuestions = question.length;
    allQuestions = question;
    showQuestion();
    loadEvents();
  }
  var showQuestion = function() {
    if(currentQuestion == totalQuestions-1) {
      $('#showNextAndPrevious').hide()
      $('#finishDiv').show()
    }else {
      $('#showNextAndPrevious').show()
      $('#finishDiv').hide()
      var question = allQuestions[currentQuestion];
       $('.number').text('('+(currentQuestion+1)+'/'+allQuestions.length+')')
      var topic = question.question
      var descr = question.answer

    }
    displayTopicAndDescription(topic,descr)


  }

  var displayTopicAndDescription = function(topic,descr) {
    $('#question').text(topic)
    $('#description').text(descr)
  }


  var loadEvents = function() {

    // alert(currentQuestion);
    $("#next").off("click");
    $("#next").on("click",function(){
      if(currentQuestion < totalQuestions-1) {

        currentQuestion += 1;
         $('.number').text('('+(currentQuestion+1)+'/'+allQuestions.length+')')
        showQuestion()
      }
    })
    $(".previous").off("click");
    $(".previous").on("click", function(){

      if(currentQuestion > 0) {
        currentQuestion -= 1;
         $('.number').text('('+(currentQuestion+1)+'/'+allQuestions.length+')')
        showQuestion();
      }
    })
  }

   calculateTime = function(){
      var prev = localStorage.getItem("date");
          var time = get_time_diff(prev);


            $.ajax({
                  type: 'POST',
                  url: `http://172.26.20.208:3000/api/student/updateElapsedTimeByStudent`,
                  dataType: 'json',
                  contentType:'application/json',


                  data:JSON.stringify({

                    studentId:studentId,
                    teacherId:teacherId,
                    queryId: queryId,
                    elapsedTimeByStudent: time

                  }),
                  success:(response)=>{
                    window.location.href='../../html/student/history.html'
                  }


              })
             return true;
  }
  function get_time_diff( datetime )
      {

          var datetime = new Date( datetime ).getTime();
          var now = new Date().getTime();

         if( isNaN(datetime) )
          {
              return "";
          }

             console.log( datetime + " " + now);

         if (datetime < now) {
           var milisec_diff = now - datetime;
         }else{

            var milisec_diff = datetime - now;
        }

        console.log(datetime);
        console.log(now);

        return now-datetime;
       }

})
