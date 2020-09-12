const Workout = require("../models/workouts");

module.exports = function (app) {
  app.post("/api/workouts", (req, res) => {
    Workout.create({}).then((data) => {
      res.json(data);
    });
  });

  app.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log(body);
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

  app.post("/api/workouts/range", (req, res) => {
    Workout.create({})
      .then((data) => res.json(data))
      .catch((err) => {
        res.json(err);
      });
  });

  app.get("/api/workouts", (req, res) => {
    Workout.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    Workout.find()
      .limit(7)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
