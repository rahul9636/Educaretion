	$(document).ready(()=>{
    //  if (localStorage.getItem("havePermission") === null){
    //     window.location.href = '../../index.html';
    // };

    
  	  var studentId = localStorage.getItem("studentId");
      $.ajax({
      type: 'GET',
      url: 'http://localhost:5000/getCoin?studentId='+studentId,
        success: function(jsondata){
          // alert(jsondata.coins);
        
          
            if(jsondata.hasOwnProperty('coins'))
                document.getElementById("coins").innerHTML = "Total Coins Collected: "+jsondata.coins;
            else  
               document.getElementById("coins").innerHTML = "Total Coins Collected: 0"; 
        }
      })
       $.ajax({
      type: 'GET',
      url: 'http://localhost:5000/getBadgeDetail?studentId='+studentId,
        success: function(jsondata){
              if(jsondata.hasOwnProperty('gold'))
                document.getElementById("gold").innerHTML = "Gold : "+jsondata.gold;
            else  
               document.getElementById("gold").innerHTML = "Gold : 0"; 

             if(jsondata.hasOwnProperty('silver'))
                document.getElementById('silver').innerHTML = "Silver : "+jsondata.silver;
            else  
               document.getElementById("silver").innerHTML = "Silver : 0"; 

             if(jsondata.hasOwnProperty('bronze'))
                document.getElementById("bronze").innerHTML = "Bronze : "+jsondata.bronze;
            else  
               document.getElementById("bronze").innerHTML = "Bronze: 0"; 
        }
      })
      


    })