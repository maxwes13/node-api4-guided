const express = require("express");

const Shouts = require("../shouts/shouts-model.js");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
const motd = process.env.MOTD || "hello world"

  res.status(200).json({ api: "up", motd: motd });
});

router.get("/shouts", challenge, (req, res, next) => {
  Shouts.find()
    .then(shouts => {
      res.status(200).json(shouts);
    })
    .catch(error => next(error));
});

// router.get("/shouts", async (req, res, next) => {

//   try {
//     const shouts = await Shouts.find()
//     res.status(200).json(shouts)
//   } catch (error) {
//     next(error)
//   }
// })

// router.post("/shouts", (req, res, next) => {
//   Shouts.add(req.body)
//     .then(shout => {
//       res.status(201).json(shout);
//     })
//     .catch(error => next(error));
// });

router.post("/shouts", async (req, res, next) => {

  try {
    const shouts = await Shouts.add(req.body)
    res.status(201).json(shouts)
  } catch (error) {
    next(error)
  }
})

router.delete("/shouts/:id", (req, res) => {
  Shouts.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => next(error));
});

router.use(errorHandler);

function errorHandler(error, req, res, next) {
  // do something with error before responding
  // like saving it to a database, sending a mail to the admin
  // or using an external logging service
  res.status(500).json(error.message);
}




function challenge (req, res, next) {
  let today = new Date();
let time = today.getSeconds();
console.log("Time:", time)

  if(time % 2  === 1) {
    res.status(403).send({ message: "Balance..." })
  } else {
    next()
  }
}

module.exports = router;
