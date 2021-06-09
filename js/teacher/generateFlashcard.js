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
  $('#queryTitle').text('Assign flashcard for query - '+query)
  $("#addRow").click(function () {id='""'
      var length = $(".data-row").length
      var html = '';
      html += '<div id="inputFormRow">';
      html += '<div class="input-group mb-3 data-row">';
      html += "<input type='text' name='title[]' id='topic_" + (length+1) + "' class='topic flashcard form-control m-input' placeholder='Topic' autocomplete='off'><br>";
      html += "<input type='text' name='title[]' id='description_" + (length+1) + "' class='desc flashcard form-control m-input' placeholder='Description' autocomplete='off'>";

      html += '<div class="input-group-append">';
      html += '<button id="removeRow" type="button" class="btn btn-danger">Remove</button>';
      html += '</div>';
      html += '</div>';

      $('#newRow').append(html);
  });

  $('#submit').on('click',()=>{
    var estimatedTime=$('#estimatedTime').val()
    var data = [];


    for(var i=0; i<$('.flashcard').length; i++) {
      var current = {};
      var topic = $('.flashcard')[i].value;
      var description = $('.flashcard')[++i].value;
      if (topic && description) {
        current["question"] = topic;
        current["answer"] = description;
        data.push(current);
      }
    }
    var postData={estimatedTimeToCompleteFlashcard:estimatedTime,flashcard:data}
    $.ajax({
      url:apiUrl+'/api/teacher/updateTeacherAndStudentFlashcard?studentId='+studentId+'&teacherId='+teacherId+'&queryId='+queryId,
      type:'POST',
      dataType: 'json',
      contentType: 'application/json',

      data:JSON.stringify(postData),
      success:(result)=>{
        console.log(result)
        window.location.href='../../html/teacher/teacherDashboard.html'
      },
      error:(err)=>{
        console.log(err)
      }
    })
  })


  // remove row
  $(document).on('click', '#removeRow', function () {
      $(this).closest('#inputFormRow').remove();
  });
})
