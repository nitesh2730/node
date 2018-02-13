var express = require('express');
var data = require('../public/func');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');


/* GET users listing. */
router.get('/getBook',function(req,res){
     console.log("hello");
     

})
router.post("/sendBooks",function(req,res){
    //var req=JSON.parse(req.body)
    // console.log("this is the post", data.startdate);
    function ui(start,end)
    {
    //var url = 'mongodb://handoffdb:btgyavbScrDfeXMfnrdRJwsdiKhb0Nj72oeuio0Hrfzghyz0WOgHoUG1v2hSvdUzIetMmqa8Du3ljrugl8nDWg==@handoffdb.documents.azure.com:10255/?ssl=true';
    //
    //var url ='mongodb://handoffdb:btgyavbScrDfeXMfnrdRJwsdiKhb0Nj72oeuio0Hrfzghyz0WOgHoUG1v2hSvdUzIetMmqa8Du3ljrugl8nDWg==@handoffdb.documents.azure.com:10255/?ssl=true';'
    var url = 'mongodb://handoffdb:btgyavbScrDfeXMfnrdRJwsdiKhb0Nj72oeuio0Hrfzghyz0WOgHoUG1v2hSvdUzIetMmqa8Du3ljrugl8nDWg==@handoffdb.documents.azure.com:10255/?ssl=true';
    var fileload;
    
    //no need for the current date
    /*
    var datetime = (new Date()).toISOString();
    console.log("system date");
    console.log(datetime);
    
    */
    //console.log(datetime.toISOString());
    
    
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    
    
    //manually give the dates here!
    var sdate=start;//='2017-12-11 00:00:00';   // enter the start date
    var edate=end;//='2017-12-13 00:00:00';   // end date --if not given then take the current date
    //edate=datetime;         
    var anotherobj;
    var myobj;
    var newobj;
    var x="";
    ///when you want to fetch the date that is present in cosmos db
    
    //db.collection("file").findOne({}, function(err, result) {
     /*   if (err) throw err;
        //console.log(result.name);
        anotherobj =  result;
        console.log(anotherobj);
       // sdate='2017-12-12 00:00:00';
       sdate=result.startDate;
     console.log("starting date is:");
      console.log(sdate);
      */
      db.collection("results").find({DateAdded:{$gte:sdate, $lt:edate}},{_id: false,DateAdded:false}).toArray(function(err, result) {
        //db.collection("results").find({},{_id: false,DateAdded:false}).toArray(function(err, result) {
            if (err) 
                throw err;
            l=result.length;  // we want to fetch the last file from the colletions
            //console.log(result[l-1]);
        
            //var y = JSON.stringify(result[l-1].conversations);
            // y = JSON.stringify(result[l-1].conversations);
          //  x=""
            for(i=0;i<l;i++)
            {
           y = JSON.stringify(result[i].conversations);
            x=x+y;
          //  console.log(y);
            }
            console.log(x);   ///this contains all the content of fetched files combined that is needed to be stored
            console.log("NO. of records fetched= %d",l);
        
        
            //no need to update the cosmos db now,
        /*
           // var h="2017-12-12T10:31:47.31Z";
           var h="2017-12-12";
            var g="";
            var dateobj = {startDate:h,endDate:g};
         //   console.log("new updated date");
           // console.log(dateobj)
            db.collection("file").updateOne(anotherobj,dateobj,function(err,res){
                if (err) throw err
                 console.log('Document date Updated');
             
               });   
    
            */
                 
               /*////this code will run only once when we need to create a collection in db
                 db.collection("ui").insertOne(myobj, function(err, res) {
                   if (err) throw err;
                   console.log("1 document inserted");
                 
                 });
                 */
                //no need to insert a new date now
                /*
                newobj = {me:x};
                db.collection("ui").insertOne(newobj, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                  
                  });
                  */
    /*
     
                 db.collection("ui").findOne({}, function(err, result) {
                 if (err) throw err;
                   oldobj =  result;
                   console.log("fetched data");
                   console.log(oldobj);
    
    
                   ///got the objrct and now we want to update with new value
    
                   console.log("NEW VALUE=");
                   console.log(newobj);
                   db.collection("ui").updateMany(oldobj,newobj,function(err,res){
                    if (err) throw err
                     console.log('Document Updated with new values');
                 
                   });  
                 });  
    
               */
                  
                    db.close();
                   
            
        });
    //});
    //console.log("starting date is1111:");
    //console.log(sdate);
    
    
    });
    
    }
})


//useful link   https://www.w3schools.com/jsref/jsref_toisostring.asp
module.exports = router;

