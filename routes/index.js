var express = require("express");
const Doctors = require("../models/doctor");
var Clinics = require('../models/clinicd');
const bodyParser = require("body-parser");
//var User = require('../models/user');
var Admin = require("../models/hospital");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var router = express.Router();
var authenticate = require("../authenticate");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());

/* GET home page. */
router.get("/", function (req, res, next) {

  Doctors.find({})
      .then(
        (doctors) => {
          Admin.find({})
          .then(
            (admin) => {
              
              res.render("index", {
                title: "ezdoc",
                doctors: doctors.map((Doctors) => Doctors.toJSON()),
                admin: admin.map((Admin) => Admin.toJSON()),
              });
              
              //res.setHeader('Content-Type', 'application/json');
              
              //res.json(dishes);
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
          
          //res.setHeader('Content-Type', 'application/json');
          
          //res.json(dishes);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  
});

router.get("/doctorpage", function (req, res, next) {
  res.render("DoctorPanel", { title: "ezdoc" });
});

router.get("/channelpage", function (req, res, next) {
  res.render("channel", { title: "ezdoc" });
});

router.get(
  "/doctorRequest",
  authenticate.verifyAdmin,
  function (req, res, next) {
    Doctors.find({})
      .then(
        (doctors) => {
          res.statusCode = 200;
          console.log(doctors[0]);
          //res.setHeader('Content-Type', 'application/json');
          res.render("docreq", {
            title: "ezdoc",
            doctors: doctors.map((Doctors) => Doctors.toJSON()),
          });
          //res.json(dishes);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

router.post("/doctorRequest/sendemail",authenticate.verifyAdmin,function (req, res, next) {
    let hos = req.user._id;
    let doc = req.body.docname;
    let msg = req.body.message;
    Doctors.findById(doc).then((doctor) => {
      if (doctor != null) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "nelushapcm@gmail.com",
            pass: "Apegama#96$",
          },
        });
        let mailOption = {
          from: "nelushapcm@gmail.com",
          to: doctor.username,
          subject: "Ezdoc Doctor Request",
          text: "Your appointment was success",
          html: "<b>" +msg +'</b></br> <p>To accept the request </p><a href="http://localhost:3000/adddoctors/' + doc +"/" +hos +'"> click here</a>',
        };
        transporter.sendMail(mailOption, function (err, data) {
          if (err) {
            console.log("error occure", err);
          } else {
            console.log("email sent!!");
          }
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: true, status: "Doctor Request Sent" });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Doctor does not exist" });
      }
    });
  }
);

router.get("/adddoctors/:doc/:hos", function (req, res, next) {
  let doc = req.params.doc;
  let hos = req.params.hos;
  Admin.findById(hos)
    .then(
      (hospital) => {
        if (hospital != null) {
          Admin.findOne({ "doctors.doctorid": doc }, function (err, doct) {
            if (doct == null) {
              Doctors.findById(doc).then((doctor) => {
                req.body.docname = doctor.doctorname;
                req.body.specialty = doctor.specialty;
                req.body.email = doctor.username;
                req.body.doctorid = doc;
                hospital.doctors.push(req.body);

                hospital.save();
                res.redirect("/verifypage");
              });
            }
            if (doct != null) {
              console.log("doctor exist");
              res.redirect("/verifypage");
            }
          });
        } else {
          err = new Error("hospital " + req.params.hos + " not found");
          err.status = 404;
          return next(err);
        }
        //res.json(dishes);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.get("/verifypage", function (req, res, next) {
  res.render("verified", { title: "ezdoc" });
});



router.post("/search", function (req, res, next) {
  let doctor = req.body.doctor;
  let hospital = req.body.hospital;
  let date = req.body.Date;
  if(doctor != null){
    console.log('hi');
  }
  if(hospital != null){
    console.log('h');
  }
  if(date != null){
    console.log('hii');
  }
  
  
 

  
}); 


router.get("/acceptclinic/:clin", function (req, res, next) {
  Clinics.findById(req.params.clin)
  .then((clinic) => {
    clinic.state = 'CONFIRMED';
    console.log(clinic);
    res.statusCode = 200;
    
    res.redirect("/verifypage");
}, (err) => next(err))
.catch((err) => next(err));

});
router.get(
  "/addnewclinic",
  authenticate.verifyAdmin,
  function (req, res, next) {
    let user = req.user._id;
    Admin.findById(user)
      .then(
        (hospital) => {
          let arr = hospital.doctors;
          res.render("newclinic", {
            title: "ezdoc",
            doctors: arr.map((Doctors) => Doctors.toJSON()),
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);
module.exports = router;
