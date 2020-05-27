var express = require('express');
var router = express.Router();
const db = require('../models');

//Hiển thị cho admin
router.get('/', async (req, res, next) => {
  try {
    const result = await db.Topic.findAll({
      include : {
        model: db.User,
        as: 'user',
        //where: {isGV : 1},
      }
    });
    res.send(result);
  } catch (error) {
    console.log(error)
  }
 });

//Hiển thị
router.post('/', async (req, res, next) => {
  let idUser = req.cookies.id;
  try {
    const result = await db.Topic.findAll({
      include : {
        model: db.User,
        as: 'user',
        //where: {isGV : 1},
      }
    });
    const result2 = await db.User.findOne({where : {id : idUser, isGV : true}})
    if(result2){
      res.send({ds: result, isGV : 1});
    }
    else res.send({ds: result, isGV : 0});
  } catch (error) {
    console.log(error)
  }
 });

//Thêm
router.post('/Them', async (req, res, next) => {
  let {tenDoAn, nenTang, moTa, ngayNop, ngDK} = req.body;
  try {
    const result = await db.Topic.create({tenDoAn, nenTang, moTa, ngayNop, ngDK});
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//Thêm giáo viên hướng dẫn
router.post('/:id/ThemGV', async (req, res, next) => {
  let {id} = req.params;
  let {idUser} = req.body;
  console.log(id);
  try {
    const result = await db.User_Topic.create({userId: idUser, topicId: id});
    res.send(result);
  } catch (error) {
    res.send(error);
  }
 });


//Lấy giá trị để sửa
router.get('/:id/edit', async (req, res, next) => {
  let {id} = req.params;
  console.log(id);
  try {
    const result = await db.Topic.findOne({where : {id}});
    res.send(result);
  } catch (error) {
    console.log(error)
  }
 });

 //Sửa 
 router.put('/:id/edit', async (req, res, next) => {
  let {id} = req.params;
  let {tenDoAn, nenTang, moTa, ngayNop, ngDK} = req.body;
  try {
    const result = await db.Topic.update({tenDoAn, nenTang, moTa, ngayNop, ngDK},{where: {id}});
     res.send('s');
  } catch (error) {
    console.log(error);
  }
});

//Xóa
router.delete('/:id', async (req, res, next) => {
  let {id} = req.params;
  try {
    const result = await db.Topic.destroy({where : {id}});
    res.json(result);
  } catch (error) {
    res.send(error);
  }
 });

 //Đăng ký đề tài
 router.post('/dkda', async (req, res, next) => {
  let {id} = req.body;
  let idUser = req.cookies.id;
  console.log(req);
  try {
    const result = await db.User_Topic.create({userId: idUser, topicId: id});
    res.send(result);
    if(result) {
      console.log(result);
    }

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;