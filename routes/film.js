const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const connection = require('../config/db');

router.get("/", function (req, res) {
    connection.query(
      "select * from film",
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "server  error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "data film ready",
            data: rows[0],
          });
        }
      }
    );
  });

  router.post('/store',[
    body('judul').notEmpty(),
    body('tahun_rilis').notEmpty(),
    body('genre').notEmpty(),
    body('Description').notEmpty(),
    body('rating').notEmpty(),
], (req,res) =>{
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({
            error : error.array()
        })
    }
    let data ={
        judul : req.body.judul,
        tahun_rilis : req.body.tahun_rilis,
        genre : req.body.genre,
        Description : req.body.Description,
        rating : req.body.rating,

    }
    connection.query('insert into film set ?', data, function (err,rows){
        if (err){
            return res.status(500).json({
                status : false,
                message : 'server gangguan'
            })
        }else{
            return res.status(201).json({
                status : true,
                message : 'success menambah film',
                data : rows[0]
            })
        }
    })
})

router.get ("/(:id)", function (req,res){
  let id = req.params.id;
  connection.query(`select * from film where film_id = ${id}`,function(err,rows){
      if (err){
          return res.status(500).json({
              status : false,
              message : 'server error',
              error : err,
          })
      }if(rows.length <=0){
          return res.status.json({
              status : false,
              message :'not found'
          })
      }else{
          return res.status(200).json({
              status : true,
              message :'data film tersedia',
              data : rows[0],
          })
      }
  })
})

router.patch("/update/:id",[
  body('judul').notEmpty(),
  body('tahun_rilis').notEmpty(),
  body('genre').notEmpty(),
  body('Description').notEmpty(),
  body('rating').notEmpty(),
],(req,res) => {
  const error = validationResult(req);
  if(!error.isEmpty())
  {
      return res.status(422).json({
          error:error.array()
      })
  }
  let id = req.params.id;
  let data = {
    judul : req.body.judul,
    tahun_rilis : req.body.tahun_rilis,
    genre : req.body.genre,
    Description : req.body.Description,
    rating : req.body.rating,
  }
  connection.query(`update film set ? where film_id = ${id}`,data, function(err,rows)
  {
      if (err){
          return res.status(500).json({
              status : false,
              message : 'server error'
          })
      }else{
          return res.status(200).json({
              status: true,
              message : 'update film  berhasil'

          })
      }
  })
})

router.delete("/delete/:id", function(req,res){
  let id = req.params.id;
  connection.query(`delete from film where film_id = ${id}`, function(err,rows){
      if(err){
          return res.status(500).json({
              status : false,
              message : 'server error'
          })
      }else{
          return res.status(200).json({
              status : true,
              message : 'hapus data film berhasil'
          })
      }
  })
})



module.exports = router;