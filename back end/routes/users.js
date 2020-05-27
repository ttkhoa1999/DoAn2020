var express = require('express');
var router = express.Router();
const db = require('../models');


//Đăng ký
router.post('/dk', async (req, res, next) => {
  let {email, password, ten, isGV, isAdmin} = req.body;
  try {
    const kt = await db.User.findOne({where : {email : email}});
    if(kt !== null) {
      res.send('da ton tai');
    }
    else {
      const result = await db.User.create({email, password, ten, isGV, isAdmin});
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});


//Đăng nhập
router.post('/', async (req, res, next) => {
  let {email, password} = req.body;
  try {
    const kt = await db.User.findOne({where : {email : email}});
    if(kt === null){
      res.send('0');
    }    
    else {
      const result = await kt.validPassword(password);
      if(result === true){
        if(email === 'admin'){
          res.send({admin : 1, message: '/QuanLyDoAn'});
        }
        else {
          const kt2 = await db.User_Topic.findOne({where : {UserId : kt.id}});
          if(kt2) {
            res.send({kt: kt.id, message: '/ThongTin'});
          }
          else {
            const kt3 = await db.User.findOne({where : {id : kt.id, isGV : true}})
            if(kt3){
              res.send({kt: kt.id, isGV : 1, message: '/DangKyDoAn'});
            }
            else res.send({kt: kt.id, message: '/DangKyDoAn'});
          }
        }
      }
      else {
        res.send('1')
      }
    }
    //res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//Thong tin
router.get('/TT', async (req, res, next) => {
  let idUser = req.cookies.id;
  try {
    const result = await db.User.findAll({
      where: {id: idUser},
      include : {
        model: db.Topic,
        as: 'topic',
        include: {
          model: db.User,
          as: 'user',
          //where: {isGV : 1}
        }
      }
    });
    if(result !== null){
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

//isGV
router.get('/isGV', async (req, res, next) => {
  try {
    const kt = await db.User.findAll({
      where : {isGV : 1},
      include : {
        model: db.Topic,
        as: 'topic' 
      }
    });
    res.send(kt);
  } catch (error) {
    console.log(error);
  }
});

//Xóa giáo viên
router.delete('/:id', async (req, res, next) => {
  let {id} = req.params;
  let {idTopic} = req.body;
  try {
    const result = await db.User_Topic.destroy({where : {userID : id, topicID : idTopic}});
    res.json(result);
  } catch (error) {
    res.send(error);
  }
 });


module.exports = router;