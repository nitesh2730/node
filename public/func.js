var startdate;
var enddate;
var x;
var myBooks;
var arr=[];
//            function ckeck(){
//        console.log("jjjjjjjjjjjjjjjjjjjjjj")
//      }  
    
        function dump(){
                     console.log("hello there");
                        var checkedValue=null ; 
        
     
        for(var i=0; i<myBooks.length; ++i){
       var inputElements = document.getElementsByName('name');
    //  console.log(inputElements[i]);
      if(inputElements[i].checked){
           checkedValue = inputElements[i].value;
           var res = (checkedValue + "").split("*");
           console.log(res);
                 
 // new code added here.....................................................
                 
           var text=res[0];
           var intentName =res[1];
           var entityLabels=[];
        var obj={text,intentName,entityLabels};
           arr.push(obj);
   //............................................................................      
        //    for(var j=0;j<res.length;j++){
        //        selectedData.text=res[j];
        //        selectedData.intentName=res[]


        //    }
        //   selectedData.text=res[0];
        // selectedData.intentName=res[1];


          
      }
     
}
/* ---------------------------------------------------------------------------- */
 var data=JSON.stringify(arr);
 var http = new XMLHttpRequest();
        var url = "users/selectedData";
        ;
        //var params=startdate;
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/json");

         http.onreadystatechange = function() {
              if(http.readyState == 4 && http.status == 200){

              }
         }
         http.send(data);
         
   /*-----------------------------------------------------------------*/     

     }
 
     function startendbtn(){
         startdate = document.getElementById('search51startdate').value;
        enddate= document.getElementById('search51enddate').value;
        console.log("startdate" + startdate);
        // var data=({enddate,startdate});
        var data=JSON.stringify({enddate,startdate});
        console.log(data);
        var http = new XMLHttpRequest();
        var url = "users/sendBooks";
        ;
        //var params=startdate;
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/json");

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                x=http.responseText;
                myBooks=JSON.parse(x);
                console.log(myBooks);
                var col = [];
                // for (var i = 0; i < myBooks.length; i++) {
                //     for (var key in myBooks[i]) {
                //         console.log(key);
                //         if (col.indexOf(key) === -1) {
                //             col.push(key);
                //         }
                //     }
                // }
                // col.push("Select");
                
                // CREATE DYNAMIC TABLE.
                var tablearea;
                var table;
                var thead;
                var tr;
                var th;
                 tablearea = document.getElementById('ShowDataID');
                 table = document.createElement('table');
                 thead = document.createElement('thead');
                  tr = document.createElement('tr');
            //       var x = document.createElement('input');
            //     x.setAttribute('type', 'checkbox');
            //   x.setAttribute('name', 'city');
            //    x.setAttribute('value', 'London');
            //      x.setAttribute('id', 1);
            // var box = document.createElement('input');
            //   box.type = "button";
            //    box.name = "name";
            //    box.value = "value";
            //    box.id = "id";
            var data =["text","intentName","entityLabels","select"];

                var table = document.createElement("table");
                var tablearea = document.getElementById("showData");
                  for (var i = 0; i < 4; i++) {
                   var headerTxt = document.createTextNode(data[i]);
                   th = document.createElement('th');
                       th.appendChild(headerTxt);
                        tr.appendChild(th);
                     thead.appendChild(tr);
                  table.appendChild(thead);}

    for (var i = 0; i < myBooks.length; i++) {
          var box = document.createElement('input');
            box.type = "checkbox";
               box.name = "name";
               box.class="checking";
               box.value = myBooks[i].text +"*"+myBooks[i].intentName ;
               box.id = myBooks[i];
              //box.setAttribute("checked",false);
               box.onclick='check();';
                    
   

        tr = document.createElement('tr');
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
          tr.appendChild(document.createElement('td'));
        tr.cells[0].appendChild(document.createTextNode(myBooks[i].text));
        tr.cells[1].appendChild(document.createTextNode(myBooks[i].intentName));
    tr.cells[2].appendChild(document.createTextNode(myBooks[i].entityLabels));
    tr.cells[3].appendChild(box);

        table.appendChild(tr);
    }
    tablearea.appendChild(table);
                  var divX = document.getElementById("btn123");
                var btr = "<button  class=btn style='margin-top:10px; type = 'submit'><span class='text'' onclick='dump();'>Submit</span></button>";
                var trr = document.createElement("tr");
                divX.innerHTML = btr;   

                 
  

            }

}
http.send(data);


}
