$(document).ready(()=>{
  // $('#localStorage').text(localStorage.getItem('teacherId'))

  if (localStorage.getItem("teacherId") === null){
 window.location.href = '../../index.html';
};
  const apiUrl=url.url
  console.log(apiUrl)
  
  var teacherId=localStorage.getItem('teacherId')
  var postData={"teacherId":teacherId}
  $.ajax({
      url:`${apiUrl}/api/teacher/getAnalysis`,
      type:'POST',
      dataType: 'json',
      contentType: 'application/json',
      data:JSON.stringify(postData),
      success:(result)=>{

        const names=[]

        for(var i=0;i<result.length;i++){
          names.push(result[i].name)
        }

        var chart = {
                     type: 'column',
                     backgroundColor:'#cdbabf'
                  };
                  var title = {
                     text: 'Average Initial Assesment Results'
                  };
                  var subtitle = {
                     text: 'Source: EduCareTion'
                  };
                  var xAxis = {
                     categories: names,
                     crosshair: true,
                     labels: {
                       style: {
                         color: '#051628',

                       }
                     }
                  };
                  var yAxis = {
                     min: 0,
                     title: {
                        text: 'Average Score',
                        style: {
                         color: '#051628'
                       }
                     }
                  };
                  var tooltip = {
                    useHTML: true,
                     formatter: function() {
                      var str = '';

                      this.point.questions.forEach(function(test, i) {
                        str += test + '<br>' ;
                      });

                      return str;

                    }


                  };
                  var plotOptions = {
                     column: {
                        pointPadding: 0.2,

                        borderWidth: 0
                     },
                     series:{
                       pointWidth: 30
                     }
                  };
                  var credits = {
                     enabled: false
                  };
                  var series= [
                     {
                        name:'Chart 1',
                        data:result,
                          color: '#674a51'
                     },
                  ];

                  var json = {};
                  json.chart = chart;
                  json.title = title;
                  json.subtitle = subtitle;
                  json.tooltip = tooltip;
                  json.xAxis = xAxis;
                  json.yAxis = yAxis;
                  json.series = series;
                  json.plotOptions = plotOptions;
                  json.credits = credits;
                  $('#container').highcharts(json);

                  $.ajax({
                    url:`${apiUrl}/api/teacher/getRetentionAnalysis`,
                    type:'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data:JSON.stringify(postData),
                    success:(result1)=>{
                      const names1=[]

                      for(var i=0;i<result1.length;i++){
                        names1.push(result1[i].name)

                      }
                      var chart = {
                                   type: 'column',
                                   backgroundColor:'#A8D5BAFF'
                                };
                                var title = {
                                   text: 'Average Retention Results'
                                };
                                var subtitle = {
                                   text: 'Source: EduCareTion'
                                };
                                var xAxis = {
                                   categories: names1,
                                   crosshair: true,
                                   labels: {
                                     style: {
                                       color: '#051628',

                                     }
                                   }
                                };
                                var yAxis = {
                                   min: 0,
                                   title: {
                                      text: 'Average Retention',
                                      style: {
                                       color: '#051628'
                                     }
                                   }
                                };
                                var tooltip = {
                                  useHTML: true,
                                   formatter: function() {
                                    var str = '';

                                    this.point.questions.forEach(function(test, i) {
                                      str += test + '<br>' ;
                                    });

                                    return str;

                                  }


                                };
                                var plotOptions = {
                                   column: {
                                      pointPadding: 0.2,

                                      borderWidth: 0
                                   },
                                   series:{
                                     pointWidth: 30
                                   }
                                };
                                var credits = {
                                   enabled: false
                                };
                                var series= [
                                   {
                                      name:'Chart 2',
                                      data:result1,
                                      color: '#2d938e'
                                   },
                                ];

                                var json1 = {};
                                json1.chart = chart;
                                json1.title = title;
                                json1.subtitle = subtitle;
                                json1.tooltip = tooltip;
                                json1.xAxis = xAxis;
                                json1.yAxis = yAxis;
                                json1.series = series;
                                json1.plotOptions = plotOptions;
                                json1.credits = credits;
                                $('#container1').highcharts(json1);

                    }
                  })
      },
      error:(err)=>{
        console.log(err)
      }

  })

})
