const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Student, Marks, Subject, Stream } = require("../models/student.schema");
const { blacklistModel } = require("../models/balcklist.schema");
require("dotenv").config();

//Student Controller
const Register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Student already exist" });
    }
    const student = new Student({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });
    await student.save();
    res.status(201).json({ message: "Student registered Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Student.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "student not found" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).send("Invalid Credentials");
    }
    const jwt_payload = { id: user._id,email,role:user.role };
    const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(200).send({ message: "Login successful", token, role:user.role });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];
    // Check if the Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Split the Authorization header to get the token (assuming the format "Bearer <token>")
    const token = authHeader.split(" ")[1];
    // Check if token is provided
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Check if the token is already blacklisted
    const existingToken = await blacklistModel.findOne({ token });
    if (existingToken) {
      return res.status(400).json({ message: 'Token already blacklisted' });
    }

    // If token is not blacklisted, add it to the blacklist
    const blacklistEntry = new blacklistModel({ token });
    await blacklistEntry.save();

    // Return success message
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const performance = async (req, res) => {
  
  try {
    const studentMarks = await Marks.find({ studentName: req.id }).populate(
      "subject"
    );
    res.status(200).json(studentMarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const profile = async (req, res) => { 
  try {
    const student = await Student.findById(req.userId).select("-password"); 
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//Admin Controller

const streamAdd = async (req, res) => {
  try {
    const { name } = req.body;
    const stream = new Stream({ name });
    await stream.save();
    res.status(201).json(stream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const streamUpdate = async (req, res) => {
  try {
    const { streamId } = req.params;
    const { name } = req.body;
    const stream = await Stream.findByIdAndUpdate(
      streamId,
      { name },
      { new: true }
    );
    res.json(stream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const streamDelete = async (req, res) => {
  try {
    const { streamId } = req.params;
    await Stream.findByIdAndDelete(streamId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const subjectAdd = async (req, res) => {
  try {
    const { name, streamId } = req.body;
    const subject = new Subject({ name, stream: streamId });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const subjectUpdate = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { name } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      { name },
      { new: true }
    );
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const subjectDelete = async (req, res) => {
  try {
    const { subjectId } = req.params;
    await Subject.findByIdAndDelete(subjectId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const marksAdd = async (req, res) => {
  try {
    const { studentId, streamId, subjectId, marks } = req.body;
    const mark = new Marks({
      studentName: studentId,
      stream: streamId,
      subject: subjectId,
      marks,
    });
    await mark.save();
    res.status(201).json(mark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const marksUpdate = async (req, res) => {
  try {
    const { markId } = req.params;
    const { marks } = req.body;
    const mark = await Marks.findByIdAndUpdate(
      markId,
      { marks },
      { new: true }
    );
    res.json(mark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const marksDelete = async (req, res) => {
  try {
    const { markId } = req.params;
    await Marks.findByIdAndDelete(markId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const studentList = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("stream")
      .populate("subject");
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const streamGet = async (req, res) => {
  try {
    const streams = await Stream.find();
    res.json(streams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const subjectGet = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const marksGet = async (req, res) => {
  try {
    const marks = await Marks.find().populate('studentName').populate('subject');
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  Register,
  Login,
  logout,
  performance,
  profile,
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
  streamGet,
  subjectGet,
  marksGet,
};
