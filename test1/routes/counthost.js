var express = require('express');
var router = express.Router();
var mongose = require('mongoose');

router.get('/', function(req, res, next) {
  mongose.connection.db.collection('bro15jun').aggregate([
      {$group:
          { 
            ts:{$first:'$ts'},
            id_resp_h:{$first:'$id_resp_h'},
            id_orig_h:{$first:'$id_orig_h'},
            id_orig_p:{$first:'$id_orig_p'},
            id_resp_p:{$first:'$id_resp_p'},            
            _id: {ipAddr:"$id_orig_h", destAdrs:"$id_resp_h"},
            totalcount:{$sum:1}
          }
      },
      {$sort:{ts:1}},
  ]).toArray(function(err,data){
           res.render('count',{"data":data});
            // console.log(data);
            // res.json(data)
         });
     });
 
module.exports = router;       
