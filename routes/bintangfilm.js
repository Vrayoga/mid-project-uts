const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query("select * from bintangfilm", (err, rows) => {
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
  });
});

router.post(
  "/store",
  [body("film_id").notEmpty(),
   body("pemain_id").notEmpty()],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
      });
    }
    let data = {
      film_id: req.body.film_id,
      pemain_id: req.body.pemain_id,
    };
    connection.query(
      "insert into bintangfilm set ?",
      data,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "server gangguan",
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "success menambah bintangfilm",
            data: rows[0],
          });
        }
      }
    );
  }
);

router.get("/:id", function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM bintangfilm WHERE id_bintangfilm = ?', [id], function (err, rows) {
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
                message: 'data bintangfilm ada',
                data: rows[0],
            });
        }
    });
});

router.patch("/update/:id",[
    body('film_id').notEmpty(),
    body('pemain_id').notEmpty(),
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
      film_id : req.body.film_id,
      pemain_id : req.body.pemain_id,
    }
    connection.query(`update bintangfilm set ? where id_bintangfilm = ${id}`,data, function(err,rows)
    {
        if (err){
            return res.status(500).json({
                status : false,
                message : 'server error'
            })
        }else{
            return res.status(200).json({
                status: true,
                message : 'update bintangfilm  berhasil'
  
            })
        }
    })
  })

  router.delete("/delete/:id", function(req,res){
    let id = req.params.id;
    connection.query(`delete from bintangfilm where id_bintangfilm = ${id}`, function(err,rows){
        if(err){
            return res.status(500).json({
                status : false,
                message : 'server error'
            })
        }else{
            return res.status(200).json({
                status : true,
                message : 'hapus data bintangfilm berhasil'
            })
        }
    })
  })

module.exports = router;
