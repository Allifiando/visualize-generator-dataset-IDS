var express = require('express');
var router = express.Router();
var mongose = require('mongoose');

// router.get('/', function(req, res, next) {
//     mongose.connection.db.collection('brolog', function(err,db){
//         db.find({}).toArray(function(err,data){          
//           res.render('coba',{"data":data});//        
//         })        
//     });
//   });

router.get('/', function(req,res,next){
  mongose.connection.db.collection('bro15jun').aggregate([
    {$group:
      {
        timestamp:{$first:"$ts"},
        id_orig_h:{$first:"$id_orig_h"},
        id_resp_h:{$first:"$id_resp_h"},
        history:{$first:"$history"},
        duration:{$first:"$duration"},
        orig_pkts:{$first:"$orig_pkts"},
        orig_ip_bytes:{$first:"$orig_ip_bytes"},
        resp_pkts:{$first:"$resp_pkts"},
        resp_ip_bytes:{$first:"$resp_ip_bytes"},        
        _id: {ipAddr:"$id_orig_h", destAdrs:"$id_resp_h"},
        totalrow:{$sum:1},
        totalorigpaket:{$sum:"$orig_pkts"},        
        totalresppaket: {$sum:"$resp_pkts"},
        maxduration : {$max: "$duration"},
        minduration : {$min: "$duration"}
        // total:{$sum:1}
    }},
    {$sort:{timestamp:1}},    
    // { $project:
    //   {
    //     ts: "$ts",
    //     id:1,
    //     id_orig_h: 1,        
    //     id_resp_h: 1,
    //     history: 1, //135
    //     duration: 1,
    //     orig_pkts: 1,
    //     orig_ip_bytes:1 ,
    //     resp_pkts: 1,
    //     resp_ip_bytes: 1,        
    //     totalrow: 1,
    //     totalpaket:1,
    //     px: {$add: ["$orig_pkts","$resp_pkts"]},
    //     nnp: {$add: ["$orig_ip_bytes","$resp_ip_bytes"]},
    //     fps: {$add: ["$orig_ip_bytes","$orig_pkts"]},
    //     tbt: {$add: ["$orig_ip_bytes","$resp_ip_bytes"]},
    //   }      
    // },       
  {$limit : 1000 },
  ]).toArray(function(err,data){
      res.render('features',{"data":data});
      // console.log(data);
      // res.json(data)
    });
});

module.exports = router;