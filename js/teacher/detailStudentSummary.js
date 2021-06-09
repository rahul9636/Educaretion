$(document).ready(()=>{
  if (localStorage.getItem("teacherId") === null){
   window.location.href = '../../index.html';
  };
  const apiUrl=url.url
  var queryParamter= new URLSearchParams(window.location.search)
  var studentId=queryParamter.get('studentId')
  var teacherId=queryParamter.get('teacherId')
  $.ajax({
      url:apiUrl+'/api/teacher/getStudentDetail?studentId='+studentId+'&teacherId='+teacherId,
      type:'GET',
      success:(result)=>{
        if(result.hasOwnProperty('message')){
          $('#studentDetails').hide()
          $('#noQueryDiv').show()
          $('#noQuery').text(result.message)
        }else{

          $('#noQueryDiv').hide()
          $('#studentDetails').show()
          console.log(result)
          Object.keys(result.queryList).forEach((item)=>{
            if(result.queryList[item].flashcard.elapsedTimeForFlashcard !== 'N/A'){
            var timeInMilli=result.queryList[item].flashcard.elapsedTimeForFlashcard
            var studentTime=result.queryList[item].flashcard.elapsedTimeByStudent

            var minutes = Math.floor(timeInMilli / 60000);
            if(studentTime === 'N/A'){
              result.queryList[item].flashcard.studentMinutes="N/A"
            }else{
                var studentMinutes=Math.floor(studentTime / 60000);
                result.queryList[item].flashcard.studentMinutes=studentMinutes
            }

            result.queryList[item].flashcard.timeInMinutes=minutes

          }else{
            result.queryList[item].flashcard.timeInMinutes="N/A"
            result.queryList[item].flashcard.studentMinutes="N/A"
          }

          })
          const queryList=result["queryList"]


          const url='generateFlashcard.html'
          const url1='generateQuiz.html'

          const data1='Assign FC'
          const data2='Assign Quiz'
          $('#studentName').text('Details for '+result.name)
          var studentDetailTable=$('#studentDetail').DataTable({
            data: queryList,
            columnDefs: [ {
                "targets": -1,
                "data": null,
                "defaultContent": "<button>Click!</button>"
            } ],
            columns:[
              //{data:'queryId'},
              { data: 'query' },
              {data:'queryScore'},
              {data:'skillExpert'},
              {data:'flashcard.assigned'},
              {data:'flashcard.timeInMinutes'},
              {data:'flashcard.studentMinutes'},
              {data:'retention.quizAssigned'},
              {data:'retention.timePeriod'},
              {data:'retention.studentScore'},
              {render: function (data, type, full, meta) {
                // console.log(data)
                console.log(full)
                return '<a href="' + url+ "?studentId=" + studentId + "&teacherId=" + teacherId + "&queryId=" + full.queryId + "&query="+ full.query+ '">'+'<button type="button" class="btn btn-primary" style="padding:10px;">' + data1 +'</button>'+'</a>';

                }
              },
              {render: function (data, type, full, meta) {
                // console.log(data)
                return '<a href="' + url1+ "?studentId=" + studentId + "&teacherId=" + teacherId + "&queryId=" + full.queryId + "&query="+ full.query+ '">'+'<button type="button" class="btn btn-primary" style="padding:10px;">' + data2 +'</button>'+'</a>'
                }
              }
            ],

          });
        }
      },
      error:(error)=>{
        console.log(error)
      }
  })
})
