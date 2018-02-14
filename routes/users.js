var express = require('express');
// var data = require('../public/func');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var rslt=null;
var x=[];


/* GET users listing. */
router.get('/getBook',function(req,res){
     console.log("hello");
     

})
router.post("/sendBooks",function(req,res){
    var sdate=String(req.body.startdate);
    var edate=String(req.body.enddate);
    // sdate="'"+sdate+"'";
    // edate="'"+edate+"'";
    console.log(sdate,edate);
    // var sdate="2017-12-12T10:31:47.31Z";
    // var edate="2017-12-30T10:31:47.31Z";
        var fileload;
     var url='';
    console.log("outside mongo connect");
  
    MongoClient.connect(url, function(err, db) {
        if (err){
            console.log("error inside MongoClient if: ",err);
            throw err;
        }
            
        // var sdate=start;//='2017-12-11 00:00:00';
        // var edate=end;//='2017-12-13 00:00:00';    
        // console.log(db);   
        const myAwesomeDB = db.db('admin');  
        var anotherobj;
        var myobj;
        var newobj;
        // var x="";
        console.log("inside mongo connect");
        // console.log(sdate,edate);
        /*
        const myAwesomeDB = db.db('handoffdb')
        myAwesomeDB.collection("results").findOne({}, function(err, result) {
            if (err){
                console.log(err);
                throw err;
            } 
        console.log(result);
        db.close();
        });
        */
        // console.log(db);
        
      
       /* myAwesomeDB.collection("results").find({text : "computer black screen"}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            rslt=result;
            db.close();
          });*/
          var count=0;
        //   {DateAdded:{$gte:"2017-12-9", $lt:"2017-12-30"}},{_id: false,DateAdded:false}
        myAwesomeDB.collection("results").find({DateAdded:{$gte:sdate, $lt:edate}},{_id: false,DateAdded:false}).toArray(function(err, results) {
            console.log("inside query");
            if (err) 
                throw err;
                // console.log(results);
            l=results.length;  // we want to fetch the last file from the colletions
              console.log("length of results",l);
            for(i=0;i<l;i++){
                ln=(results[i].conversations.length);
                count=count+ln;
                console.log("length of results.conversations",ln);
                for(j=0;j<ln;j++){
                    x.push(results[i].conversations[j]);
                    console.log("-------------------------------------------------------")
                    console.log(results[i].conversations[j]);
                    console.log("-------------------------------------------------------")
                }
                // y = results[i].conversations;
                // console.log('----------------------------------------------datad----------')
                // console.log(JSON.parse(y));
                // console.log('----------------------------------------------datad----------')
            }
            // console.log(x);   ///this contains all the content of fetched files combined that is needed to be stored
            console.log("NO. of records fetched= %d",l);
            // res.json(x);
            console.log("-------------------------------------------------end");
            console.log(typeof(x));
            console.log(x);
            console.log(x.length);
            console.log(count);
            res.json(x);
            db.close();
        });
        
    });

//,4000);
 /*   if(rslt){
        console.log(rslt);
    }
    else{
        console.log("---------");
    }
    */  
    
})

//useful link   https://www.w3schools.com/jsref/jsref_toisostring.asp
module.exports = router;

