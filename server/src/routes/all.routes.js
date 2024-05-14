const express = require("express");
const {
  Register,
  Login,
  streamAdd,
  streamUpdate,
  streamDelete,
  subjectAdd,
  subjectUpdate,
  subjectDelete,
  marksAdd,
  marksUpdate,
  marksDelete,
  studentList,
  performance,
  profile,
  logout,
} = require("../controllers/all.controller");
const { auth } = require("../middlewares/students.auth");
const { access } = require("../middlewares/access.middleware");
const router = express.Router();

const adminAccess = access("admin");

//Students
router.post("/signup", Register);
router.post("/login", Login);
router.get("/profile", auth,profile);
router.get("/myperformance", auth, performance);
router.post("/logout",auth,logout);


//Admin

//Streams
// router.post('/streams/get',auth,adminAccess, streamGet);
router.post("/streams/add", auth, adminAccess, streamAdd);
router.put("/streams/update/:streamId", auth, adminAccess, streamUpdate);
router.delete("/streams/delete/:streamId", auth, adminAccess, streamDelete);

// Subjects
// router.post('/subjects/get',auth,adminAccess, subjectGet);
router.post("/subjects/add", auth, adminAccess, subjectAdd);
router.put("/subjects/update/:subjectId", auth, adminAccess, subjectUpdate);
router.delete("/subjects/delete/:subjectId", auth, adminAccess, subjectDelete);

// Marks
// router.post('/marks/get',auth,adminAccess,marksGet);
router.post("/marks/add", auth, adminAccess, marksAdd);
router.put("/marks/update/:markId", auth, adminAccess, marksUpdate);
router.delete("/marks/delete/:markId", auth, adminAccess, marksDelete);

// StudentList
router.get("/studentList", auth, adminAccess, studentList);

module.exports = {
  router,
};
