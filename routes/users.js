var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
var MongoClient = require('mongodb').MongoClient;
var x=[];
var y;
var data1;


/* GET users listing. */
router.get('/getBook',function(req,res){
     console.log("hello");
})

router.post("/selectedData",function(req,res){
    console.log("selected data is here.........")
    // var dd=JSON.parse(req.body);
    var dd=req.body;
    // console.log(typeof(dd));
    console.log(typeof(req.body));
    console.log(req.body);
    console.log(dd);
    const LUIS_programmaticKey = "";
    // ID of your LUIS app to which you want to add an utterance
    // const LUIS_appId = "";
    const LUIS_appId = "";
    // The version number of your LUIS app
    const LUIS_versionId = "0.1";
    // data1=[{"text":"today is saturday","intentName":"None","entityLabels":[]},{"text":"this laptop has gone google","intentName":"None","entityLabels":[]}];
    data1=dd;
    var trainAfterAdd=true
    var requestTrainingStatus=true
    //if i set these variables as true training and status will be performedd
    // Parse command line arguments:
    // -train to train based on the utterances in uploadFile
    // -status to get training status
    if (process.argv.length >= 3) {
      //  console.log("value of agrv[0 and 1],")
      //  console.log(process.argv[0])
    //console.log(process.argv[1])
    
        if (process.argv[2] === "-train") {
            trainAfterAdd = true;
        } else if (process.argv[2] === "-status") {
            requestTrainingStatus = true;
        }
    }
    // Send JSON as the body of the POST request to the API
    var sendUtteranceToApi = async (options) => {
        try {
    
            var response; 
            if (options.method === 'POST') {
                response = await rp.post(options);
            } else if (options.method === 'GET') {
                response = await rp.get(options);
            }
            
            return { request: options.body, response: response };
    
        } catch (err) {
            throw err;
        }
    }
    // upload configuration 
    var configAddUtterance = {
        LUIS_subscriptionKey: LUIS_programmaticKey,
        LUIS_appId: LUIS_appId,
        LUIS_versionId: LUIS_versionId,
       // inFile: data1,
        uri: "", LUIS_versionId)
    };
    
    // Call add-utterance
    var addUtterance = async (config) => {
        
            try {
        
                // Extract the JSON for the request body
                // The contents of the file to upload need to be in this format described in the comments above.
                var jsonUtterance = data1;
                console.log('value in jsonUtterance')
                console.log(jsonUtterance)
                // Add an utterance
                var utterancePromise = sendUtteranceToApi({
                    uri: config.uri,
                    method: 'POST',
                    headers: {
                        'Ocp-Apim-Subscription-Key': config.LUIS_subscriptionKey
                    },
                    json: true,
                    body: jsonUtterance
                });
        
                let results = await utterancePromise;
             //   let response = await fse.writeJson(config.inFile.replace('.json', '.results.json'), results);
        
                console.log("Add utterance done");
        
            } catch (err) {
                console.log(`Error adding utterance:  ${err.message} `);
                //throw err;
            }
        
        }
        // training configuration 
    var configTrain = {
        LUIS_subscriptionKey: LUIS_programmaticKey,
        LUIS_appId: LUIS_appId,
        LUIS_versionId: LUIS_versionId,
        uri: "", LUIS_versionId),
        method: 'POST', // POST to request training, GET to get training status
    };
        // Call train
    var train = async (config) => {
        
            try {
        
                var trainingPromise = sendUtteranceToApi({
                    uri: config.uri,
                    method: config.method, // Use POST to request training, GET to get training status 
                    headers: {
                        'Ocp-Apim-Subscription-Key': config.LUIS_subscriptionKey
                    },
                    json: true,
                    body: null      // The body can be empty for a training request
                });
        
                let results = await trainingPromise;
                
                if (config.method === 'POST') {
               //     let response = await fse.writeJson(path.join(__dirname, 'training-results.json'), results);        
                    console.log(`Training request sent. The status of the training request is: ${results.response.status}.`);
                } else if (config.method === 'GET') {
                 //   let response = await fse.writeJson(path.join(__dirname, 'training-status-results.json'), results);
                  //  console.log(`Training status saved to file. `);
                }
                
            } catch (err) {
                console.log(`Error in Training:  ${err.message} `);
                // throw err;
            }
        
        }
        // MAIN
    if (trainAfterAdd) {
        // Add the utterance to the LUIS app and train
        addUtterance(configAddUtterance)
            .then(() => {
                console.log("Add utterance complete. About to request training.");
                configTrain.method = 'POST';
                return train(configTrain, false);
            }).then(() => {
                console.log("Training process complete. Requesting training status.");
                configTrain.method = 'GET';
                return train(configTrain, true);
            }).then(() => {
                console.log("process done");
            });
    } else if (requestTrainingStatus) {
        // Get the training status
        configTrain.method = 'GET';
        train(configTrain)
            .then(() => {
                console.log("Requested training status.");
            });
    }
    else {
        // Add the utterance to the LUIS app without training it afterwards
        addUtterance(configAddUtterance)
            .then(() => {
                console.log("Add utterance complete.");
            });
    
    }
  })
router.post("/sendBooks",function(req,res){
    var sdate=String(req.body.startdate);
    var edate=String(req.body.enddate);
    // console.log(sdate,edate);
    var url='';
    
    MongoClient.connect(url, function(err, db) {
        if (err){
            console.log("error inside MongoClient if: ",err);
            throw err;
        }
        const myAwesomeDB = db.db('admin');
        var count=0;
        myAwesomeDB.collection("results").find({DateAdded:{$gte:sdate, $lt:edate}},{_id: false,DateAdded:false}).toArray(function(err, results) {
            if (err) 
                throw err;
            l=results.length;  // we want to fetch the last file from the colletions
            for(i=0;i<l;i++){
                ln=(results[i].conversations.length);
                count=count+ln;
                for(j=0;j<ln;j++){
                    x.push(results[i].conversations[j]);
                }
            }
            res.json(x);
            db.close();
        });        
    });
})
module.exports = router;

