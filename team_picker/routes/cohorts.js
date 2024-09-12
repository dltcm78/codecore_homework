const router = require("express").Router();
const knex = require("../db/client");
const queries = require("../db/queries");
const helper = require("../helper");

// Show All Cohorts In Descending Order
router.get("/", (req, res) => {
  queries.getAll()
    .then(cohorts => { // When it gets data from the database
      res.render("home", { // will show home.ejs
        cohorts: cohorts
      });
    });
});

// connecting cohorts/new and new_cohort.ejs
router.get("/new", (req, res) => {
  res.render("new_cohort");
});

// add new cohort
router.post("/", (req, res) => {
  if (req.body.name === "" && req.body.members === "") {
    res.status(401).send('<h1>"Name" and "Members" Must be Filled!</h1>')
    return
  }
  queries.search(req) // look for where req.body.name == name from the database
    .then(cohort => {
      if (cohort) { // if name exists
        res.send("<h1>The Cohort Name Already Exists</h1></br><a href='http://localhost:4545/cohorts/new'>Go Back</a>")
      } else { // if name does not exists
        queries.new({
          logo: req.body.logo,
          name: req.body.name,
          members: req.body.members,
          password: req.body.password
        }).then(cohort => {
          res.redirect("/cohorts")
        });
      };
    });

});

// view cohort
router.get("/search", (req, res) => {
  res.render("search_cohort")
})

// search cohort
router.post("/search", (req, res) => {
  queries.search(req)
    .then(cohort => {
      if (cohort) {
        res.redirect(`/cohorts/${cohort.id}`)
      } else {
        res.send("<h1>Cohort Name Does Not Exist</h1></br><a href='http://localhost:4545/cohorts/search'>Go Back</a>")
      }
    })
})

// Show 1 cohort
router.get("/:id", (req, res) => {
  const method = req.query.method;
  const quantity = req.query.quantity;
  const id = req.params.id;
  knex("cohorts")
    .where("id", id)
    .first()
    .then(cohort => {
      if (cohort) {
        res.render("cohort_id", {
          cohort,
          method,
          quantity,
          helper
        });
      } else {
        res.redirect("/cohorts");
      }
    });
});

// Delete 1 cohort
router.delete("/:id", (req, res) => {
  queries.getOne(req).then(cohort => {
    if (cohort.password !== req.body.password && cohort.password !== "") {
      console.log(cohort.password)
      console.log(req.body.password)
      res.render('log_in_delete', {
        id: req.params.id
      })
    } else {
      knex("cohorts")
        .where("id", req.params.id)
        .del()
        .then(() => {
          res.redirect("/cohorts");
        });
    }
  })
});

// edit cohort
router.get("/:id/edit", (req, res) => {
  knex("cohorts")
    .where("id", req.params.id)
    .first()
    .then(cohort => {
      res.render("edit_cohort", {
        cohort: cohort
      });
    });
});
router.patch("/:id", (req, res) => {
  const updatedPost = {}
  if (req.body.logo !== "") {
    updatedPost.logo = req.body.logo
  }
  if (req.body.members !== "") {
    updatedPost.members = req.body.members
  };
  if (req.body.logo === "" && req.body.members === "") {
    res.redirect(`/cohorts/${req.params.id}`)
  };
  queries.getOne(req).then(cohort => {
    if (cohort.password !== req.body.password) {
      res.render(`log_in_edit`, {
        id: req.params.id,
        logo: req.body.logo,
        members: req.body.members
      })
    } else {
      knex("cohorts")
        .where("id", req.params.id)
        .update(updatedPost)
        .then(() => {
          res.redirect(`/cohorts/${req.params.id}`);
        });
    }
  })
});

router.get("/:id/login_edit", (req, res) => {
  res.render("log_in_edit");
})

router.get("/:id/login_delete", (req, res) => {
  res.render("log_in_delete")
})
module.exports = router;