var express = require('express');
var router = express.Router();
var mongose = require('mongoose');

router.get('/', function(req,res,next){
  mongose.connection.db.collection('bro15jun').aggregate([    
    { $lookup:
      {
        from: 'snort15jun',
        localField: 'ts',
        foreignField: 'ts_snort',
        as: 'tsDetail'
      }
    },
    // {$group:
    //   {         
    //     _id:{alert:"$label"},
    //     totalcount:{$sum:1}
    //   }
    // },
    // {$match: {
    //   labelcount: []
    // }},
    {$limit:100},
    {$sort:{ts:1}},
  ]).toArray(function(err,data){
      // console.log(data[19].tsDetail);
      res.render('join',{"data":data});
      // res.json(data)
    });
});
module.exports = router;