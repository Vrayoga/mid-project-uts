const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query("select * from reviews", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server  error",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "data review ready",
        data: rows[0],
      });
    }
  });
});

router.post(
  "/store",
  [
    body("film_id").notEmpty(),
    body("user_id").notEmpty(),
    body("ReviewText").notEmpty(),
    body("Rating").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
      });
    }
    let data = {
      film_id: req.body.film_id,
      user_id: req.body.user_id,
      ReviewText: req.body.ReviewText,

      Rating: req.body.Rating,
    };
    connection.query("insert reviews set ?", data, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server gangguan",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "success menambah reviews",
          data: rows[0],
        });
      }
    });
  }
);

router.get("/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(
    `select * from reviews where ReviewID = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server error",
          error: err,
        });
      }
      if (rows.length <= 0) {
        return res.status.json({
          status: false,
          message: "not found",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "data review ada",
          data: rows[0],
        });
      }
    }
  );
});

router.patch(
  "/update/:id",
  [
    body("film_id").notEmpty(),
    body("user_id").notEmpty(),
    body("ReviewText").notEmpty(),
    body("Rating").notEmpty(),

    body("Rating").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let id = req.params.id;
    let data = {
      film_id: req.body.film_id,
      user_id: req.body.user_id,
      ReviewText: req.body.ReviewText,

      Rating: req.body.Rating,
    };
    connection.query(
      `update reviews set ? where ReviewID = ${id}`,
      data,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "server error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "update revciew  berhasil",
          });
        }
      }
    );
  }
);

router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `delete from reviews where ReviewID = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "hapus data review berhasil",
        });
      }
    }
  );
});

module.exports = router;
