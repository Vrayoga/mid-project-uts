const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const connection = require('../config/db');

router.get("/", function (req, res) {
    connection.query(
      "select * from user",
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "server  error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "data user tersedia",
            data: rows[0],
          });
        }
      }
    );
  });

  router.post('/store',[
    body('Username').notEmpty(),
    body('Password').notEmpty(),
    body('Email').notEmpty(),
    body('FullName').notEmpty(),
], (req,res) =>{
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({
            error : error.array()
        })
    }
    let data ={
        Username : req.body.Username,
        Password : req.body.Password,
        Email : req.body.Email,
        FullName : req.body.FullName,

    }
    connection.query('insert into user set ?', data, function (err,rows){
        if (err){
            return res.status(500).json({
                status : false,
                message : 'server gangguan'
            })
        }else{
            return res.status(201).json({
                status : true,
                message : 'success menambah data user',
                data : rows[0]
            })
        }
    })
})

router.get ("/(:id)", function (req,res){
    let id = req.params.id;
    connection.query(`select * from user where user_id = ${id}`,function(err,rows){
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
                message :'data user tersedia',
                data : rows[0],
            })
        }
    })
  })

  router.patch("/update/:id",[
    body('Username').notEmpty(),
    body('Password').notEmpty(),
    body('Email').notEmpty(),
    body('FullName').notEmpty(),

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
      Username : req.body.Username,
      Password : req.body.Password,
      Email : req.body.Email,
      Fullname : req.body.FullName,
    }
    connection.query(`update user set ? where user_id = ${id}`,data, function(err,rows)
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
    connection.query(`delete from user where user_id = ${id}`, function(err,rows){
        if(err){
            return res.status(500).json({
                status : false,
                message : 'server error'
            })
        }else{
            return res.status(200).json({
                status : true,
                message : 'hapus data user berhasil'
            })
        }
    })
  })
  

module .exports = router;