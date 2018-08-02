var express = require('express');
var router = express.Router();
var mongose = require('mongoose');

router.get('/', function(req, res, next) {
  mongose.connection.db.collection('snort15jun', function(err,db){
      db.find({}).toArray(function(err,data){
        res.render('snort',{"data":data});
      })
      
  });
});
module.exports = router;

// router.get('/', function(req,res,next){
//   mongose.connection.db.collection('bronew').aggregate([
//     { $lookup:
//       {
//         from: 'snort',
//         localField: 'ts',
//         foreignField: 'ts_snort',
//         as: 'tsDetail'
//       }
//     }
//   ]).toArray(function(err,data){
//       res.render('coba',{"data":data});
//       // res.json(data)
//     });
// });
// module.exports = router;