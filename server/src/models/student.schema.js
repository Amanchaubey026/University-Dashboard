const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    stream:{type:mongoose.Schema.Types.ObjectId, ref:'Stream'},
    subject:{type:mongoose.Schema.Types.ObjectId,ref:'Subject'},
    role: {
        type: String,
        default: "student",
        enum: ["student", "admin"],
      }
},
{
  versionKey: false,
})

const streamSchema = new mongoose.Schema({
    name:{type:String,required:true}
},
{
  versionKey: false,
})

const subjectSchema = mongoose.Schema({
    name:{type:String,required:true},
    stream:{type:mongoose.Schema.Types.ObjectId, ref:'Stream'}
},
{
  versionKey: false,
})

const marksSchema = mongoose.Schema({
    studentName:{type:mongoose.Schema.Types.ObjectId,ref:'Student'},
    stream:{type:mongoose.Schema.Types.ObjectId, ref:'Stream'},
    subject:{type:mongoose.Schema.Types.ObjectId,ref:'Subject'},
    marks:{type:Number,required:true}
},
{
  versionKey: false,
})

const Student = mongoose.model('Student',studentSchema);
const Stream = mongoose.model('Stream',streamSchema);
const Subject = mongoose.model('Subject',subjectSchema);
const Marks = mongoose.model('Marks',marksSchema);

module.exports = {
    Student,
    Stream,
    Subject,
    Marks
}