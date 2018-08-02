var express = require('express');
var router = express.Router();
var mongose = require('mongoose');

router.get('/', function(req, res, next) {
  mongose.connection.db.collection('snort15jun').aggregate([
      {$group:
          { 
            ts_snort:{$first:'$ts_snort'},
            dst_ip:{$first:'$dst_ip'},
            dst_port:{$first:'$dst_port'},
            src_ip:{$first:'$src_ip'},
            src_port:{$first:'$src_port'},
            label:{$first:'$label'},
            _id:{alert:"$label"},
            totalcount:{$sum:1}
          }
      },      
      {$sort:{ts_snort:1}},
  ]).toArray(function(err,data){
           res.render('count',{"data":data});
            // console.log(data);
            // res.json(data)
         });
     });
 
module.exports = router;       
