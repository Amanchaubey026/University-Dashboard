const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, required:true},
    stream:{type:mongoose.Schema.Types.ObjectId, ref:'Stream'},
    subject:{type:mongoose.Schema.Types.ObjectId,ref:'Subject'}
})

const streamSchema = new mongoose.Schema({
    name:{type:String,required:true}
})

const subjectSchema = mongoose.Schema({
    name:{type:String,required:true},
    stream:{type:mongoose.Schema.Types.ObjectId, ref:'Stream'}
})

const marksSchema = mongoose.Schema({
    studentName:{type:mongoose.Schema.Types.ObjectId,ref:'Student'},
    stream:{type:mongoose.Schema.Types.ObjectId, ref:'Stream'},
    subject:{type:mongoose.Schema.Types.ObjectId,ref:'Subject'},
    marks:{type:Number,required:true}
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