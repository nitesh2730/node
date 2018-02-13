
console.log("yuu");
var startdate;
var enddate;

     function startendbtn(){
         console.log("gadha");
         startdate = document.getElementById('search51startdate').value;
        enddate= document.getElementById('search51enddate').value;
        console.log("startdate" + startdate);
        // var data=({enddate,startdate});
        var data=[{"endDate": "${enddate}"}, {"startDate": "${startdate}"}]
        console.log(data[0],data[1]);
        var http = new XMLHttpRequest();
        var url = "users/sendBooks";
        ;
        //var params=startdate;
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                alert(http.responseText);
}

}
http.send({"data":startdate});
}

module.exports= {
startdate:"2017-12-12T10:31:47.31Z",
enddate:"2017-12-30T10:31:47.31Z"
};
        
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
   