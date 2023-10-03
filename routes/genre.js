const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const connection = require('../config/db');

router.get("/", function (req, res) {
    connection.query(
      "select * from genre",
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "server  error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "data genre ready",
            data: rows[0],
          });
        }
      }
    );
  });

  router.post('/store',[
    body('nama_genre').notEmpty()

], (req,res) =>{
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({
            error : error.array()
        })
    }
    let data ={
        nama_genre : req.body.nama_genre


    }
    connection.query('insert into genre set ?', data, function (err,rows){
        if (err){
            return res.status(500).json({
                status : false,
                message : 'server gangguan'
            })
        }else{
            return res.status(201).json({
                status : true,
                message : 'success menambah genre',
                data : rows[0]
            })
        }
    })
})

router.get("/:id", function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM genre WHERE genre_id = ?', [id], function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'server error',
                error: err,
            });
        }
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'not found',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'data genre ada',
                data: rows[0],
            });
        }
    });
});

router.patch("/update/:id",[
    body('nama_genre').notEmpty(),
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
      nama_genre : req.body.nama_genre,
    }
    connection.query(`update genre set ? where genre_id = ${id}`,data, function(err,rows)
    {
        if (err){
            return res.status(500).json({
                status : false,
                message : 'server error'
            })
        }else{
            return res.status(200).json({
                status: true,
                message : 'update genre  berhasil'
  
            })
        }
    })
  })

 router.delete("/delete/:id", function(req,res){
    let id = req.params.id;
    connection.query(`delete from genre where genre_id = ${id}`, function(err,rows){
        if(err){
            return res.status(500).json({
                status : false,
                message : 'server error'
            })
        }else{
            return res.status(200).json({
                status : true,
                message : 'hapus data genre berhasil'
            })
        }
    })
  })


module .exports = router;