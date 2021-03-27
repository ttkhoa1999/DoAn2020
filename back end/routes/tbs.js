var express = require('express');
var router = express.Router();
const db = require('../models');

//Thông báo
router.get('/', async (req, res, next) => {
    try {
      const result = await db.TB.findAll();
      if(result !== null){
        res.send(result);
      }
    } catch (error) {
      console.log(error);
    }
});

router.post('/', async (req, res, next) => {
  let {tieuDe, noiDung} = req.body;
  try {
    const result = await db.TB.create({tieuDe, noiDung});
    if(result !== null){
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

  module.exports = router;