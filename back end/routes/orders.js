var express = require('express');
var router = express.Router();
const db = require('../models');

//Mời
router.post('/', async (req, res, next) => {
    let {idMoi, idNhan, idTopic} = req.body;
    if(idMoi === 'admin')
      idMoi = null;
    try {
      const result = await db.Order.create({idMoi, idNhan, idTopic});
      if(result !== null){
        res.send(result);
      }
    } catch (error) {
      console.log(error);
    }
  });

//Kiểm tra
router.post('/kt', async (req, res, next) => {
  let {idMoi, idNhan, idTopic} = req.body;
  if(idMoi === 'admin')
      idMoi = null;
  try {
    const result = await db.User_Topic.findOne({where: {userId: idNhan, topicId: idTopic}});
    if(result === null){
      const result1 = await db.Order.findOne({
        where : {idMoi, idNhan, idTopic}
      });
      if(result1 !== null){
        res.send('0');
      }
      else res.send('1');
    }
    else res.send('0');
  } catch (error) {
    console.log(error);
  }
});

//Thông báo
router.get('/', async (req, res, next) => {
    let idNhan = req.cookies.id;
    try {
      const result = await db.Order.findAll({
        where : {idNhan},
        include : [
          {model: db.Topic},
          {model: db.User}
        ]
      });

      if(result !== null){
        res.send(result);
      }
    } catch (error) {
      console.log(error);
    }
  });

  //Xóa
  router.delete('/:id', async (req, res, next) => {
    let {id} = req.params;
    try {
      const result = await db.Order.destroy({where : {id}});
      res.json(result);
    } catch (error) {
      res.send(error);
    }
   });

  module.exports = router;