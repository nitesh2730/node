
console.log("yuu");
var startdate;
var enddate;
var x;

     function startendbtn(){
         console.log("gadha");
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
                var myBooks=JSON.parse(x);
                var col = [];
                for (var i = 0; i < myBooks.length; i++) {
                    for (var key in myBooks[i]) {
                        console.log(key);
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }
                col.push("Select");
                
                // CREATE DYNAMIC TABLE.
                var table = document.createElement("table");
                
                table.setAttribute("style", "overflow-y: auto; width = 75% ; height = 75%, border-collapse: collapse;");
                
                // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
                
                var tr = table.insertRow(-1);                   // TABLE ROW.
                
                for (var i = 0; i < col.length; i++) {
                    var th = document.createElement("th");      // TABLE HEADER.
                    th.innerHTML = col[i];
                    tr.appendChild(th);
                    // if(col[])
                }
                
                // ADD JSON DATA TO THE TABLE AS ROWS.
                for (var i = 0; i < myBooks.length; i++) {
                
                    tr = table.insertRow(-1);

                   
                    
                    for (var j = 0; j < col.length; j++) {
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = myBooks[i][col[j]];
                        if(j==3){
                            var checkbox = "<input type = 'checkbox' name = 'name1' value = 'checked'/>";
                           // checkbox.type = "checkbox";
                           // checkbox.name = "name";
                           // checkbox.value = "value";
                           // checkbox.id = "id";
                            //document.getElementById().checked = true;
                           
                            
                            tabCell.innerHTML = checkbox;
                        }
                    }
                }
                
                // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                var divContainer = document.getElementById("showData");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
                var divX = document.getElementById("btn123");
                // var btr = "<button  class=btn style='margin-top:10px; type = 'submit'>Submit</button>";
                // var trr = document.createElement("tr");
                // divX.innerHTML = btr;


            }

}
http.send(data);
// var myBooks=JSON.stringify(x);
// var col = [];
// for (var i = 0; i < myBooks.length; i++) {
//     for (var key in myBooks[i]) {
//         console.log(key);
//         if (col.indexOf(key) === -1) {
//             col.push(key);
//         }
//     }
// }

// // CREATE DYNAMIC TABLE.
// var table = document.createElement("table");

// // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

// var tr = table.insertRow(-1);                   // TABLE ROW.

// for (var i = 0; i < col.length; i++) {
//     var th = document.createElement("th");      // TABLE HEADER.
//     th.innerHTML = col[i];
//     tr.appendChild(th);
// }

// // ADD JSON DATA TO THE TABLE AS ROWS.
// for (var i = 0; i < myBooks.length; i++) {

//     tr = table.insertRow(-1);

//     for (var j = 0; j < col.length; j++) {
//         var tabCell = tr.insertCell(-1);
//         tabCell.innerHTML = myBooks[i][col[j]];
//     }
// }

// // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
// var divContainer = document.getElementById("showData");
// divContainer.innerHTML = "";
// divContainer.appendChild(table);
}


// module.exports= {
// startdate:"2017-12-12T10:31:47.31Z",
// enddate:"2017-12-30T10:31:47.31Z"
// };
        
//         var app = angular.module('myApp', []);
// app.controller('myController',
//     function ($scope, $http) {

//         var request = {
//             method: 'post',
//             url: 'users/sendBooks',
//             dataType: 'json',
//             data:{
//                 "start":startdate,
//                 "end":enddate
//             },
//             headers:{'Content-Type': 'application/x-www-form-urlencoded'}
           
//         };
//         $http(request)
//             .success(function (jsonData) {
//                 $scope.myData = jsonData;
//             })
//             .error(function () {
//               console.log("Error here");

//             });



    //     alert(startdate.value);
    // 	alert(enddate.value);
    // }

    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() { 
    //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    //         callback(xmlHttp.responseText);
    // }
    // xmlHttp.open("", theUrl, true); // true for asynchronous 
    // xmlHttp.send(null);
   
