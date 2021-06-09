	$(document).ready(()=>{
		
     if (localStorage.getItem("havePermission") === null){
    window.location.href = '../../index.html';
  };

  	var classCode = localStorage.getItem("classCode");
	const apiUrl=url.url
	// console.log(apiUrl)
    window.teacherId;

       $.ajax({
                  type: 'POST',
                  url: `http://172.26.20.208:3000/api/student/getTeacherId`,
                  dataType: 'json',
                  contentType:'application/json',


                  data:JSON.stringify({

                      classCode:classCode,
                  }),
                   success: function(jsondata){

                          window.teacherId=jsondata.teacherID;
                          // alert(jsondata.teacherID);
                          window.studentId=localStorage.getItem("studentId")
                          localStorage.setItem("dashboardTeacherId",window.teacherId);
                          console.log(window.studentId , window.teacherId);
                          start(apiUrl);
                    }

              })
	});

	function start(apiUrl){
    
    $.ajax({
      type: 'GET',
      url: apiUrl+'/api/student/getQueryByStudents?studentId='+window.studentId+'&teacherId='+window.teacherId,
        success: function(jsondata){

           // window.maxQuery = jsondata["questionAsked"].length;
					 if(jsondata.hasOwnProperty('message')){
						 $('#displayHistory').hide()
						 $('#noHistory').show()
						 $('#noHistoryText').text(jsondata.message)

					 }else{
						 var html=''
						  html='<div class="row">'
						 for(var i = 0 ; i < jsondata.length ; i++ ){

							 html+='<div class="col-lg-3 mt-3 ml-3">'
							 html+='<div class="card text-info" style="width: 18rem;">'
							 html+='<div class="card-body">'
							 html+="<h5 class='card-title'>Query " + (i+1) + "</h5>"
							 html+="<p class='card-text'>Query: "+ jsondata[i].query +"</p>"

							 html+="<a href="+jsondata[i].youtube+"class='card-text'>Youtube link: "+ jsondata[i].youtube +"</p>"
							 html+="<p class='card-text'>Expertise on Query: "+ jsondata[i].skillExpert +"</p>"
							 html+="<p class='card-text'>Score on initial quiz: "+ jsondata[i].queryScore +"</p>"
							 html+="</div></div></div>"
							}
						 $('#noHistory').hide()
						 $('#displayHistory').show()
						 $('#displayHistory').html(html)
						
						}
				 }
      })
}
