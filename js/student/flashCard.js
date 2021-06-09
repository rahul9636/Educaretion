$(document).ready(()=>{
   if (localStorage.getItem("havePermission") === null){
    window.location.href = '../../index.html';
  };


  var teacherId=localStorage.getItem("dashboardTeacherId")
  var studentId=localStorage.getItem("studentId")
  var postData={teacherId,studentId}
  const apiUrl=url.url
  $.ajax({
    type:'POST',
    url:'http://172.26.20.208:3000/api/student/generateCardForFlashCard',
    dataType: 'json',
    contentType: 'application/json',
    data:JSON.stringify(postData),
    success:(result)=>{
      console.log(result)
      var html='<div class="row">'
      for(var i=0;i<result.length;i++){

        html+='<div class="col-lg-3 mt-3 ml-3">'
        html+='<div class="card" style="width: 18rem;">'
        html+='<div class="card-body">'
        html+="<h5 class='card-title'>Query " + (i+1) + "</h5>"
        html+="<p class='card-text'>Question Asked: "+ result[i].query +"</p>"
        html+="<p class='card-text'>Flashcard Available : "+ result[i].assigned +"</p>"



        if(result[i].assigned !== "YES"){
          html+="<a href='#' class='btn btn-primary disabled'>GO</a>"
          html+="</div></div></div>"
        }else{
          html+=`<a   href='./showFlashCard.html?teacherId=${teacherId}&studentId=${studentId}&queryId=${result[i].queryId}' class='btn btn-primary'>GO</a>`
          html+="</div></div></div>"
        }
      }
      $('.displayCards').html(html)

    },
    error:(err)=>{
      console.log(err)
    }
  })


  })
