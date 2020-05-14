const { validationResult } = require('express-validator')

const Teacher = require('../models/teacher')
const Student= require('../models/student')



/////INDEX TEACHER - FETCHING THE LIST OF ALL TEACHERS
async function index(request,response,next) {
    let teachers;
    try{
        teachers = await Teacher.find()
    }catch (e) {
        return  response.status(417).json({message:e})
    }
    response.status(200).json({teachers})
}

/////SHOW TEACHER - SPECIFIC INFO OF A TEACHER
const show = async (require,response,next)=> {
    const teacherId = require.params.teacher_id
    let teacher;
    try {
        teacher = await Teacher.findById(teacherId)
    } catch (e) {
        return response.status(422).json({message:"Invalid teacher id"})
    }
    return response.status(200).json({teacher: teacher.toObject({getters:true})})
}


const TeacherByStudent = async (require, response, next)=>{

    const studentId =  require.params.teacherId
    const  teacher = await Teacher.find({student:studentId});

    if(student.length == 0){
        return response.status(404).json({message:"Invalid teacher id!"})
    }
    return res.status(200).json({student})

}




/////STORE - CREATING NEW TEACHER

const store = async (require,response)=>{

    const firstName = require.body.firstName
    const middleName = require.body.middleName
    const lastName = require.body.lastName
    const age = require.body.age
    const address = require.body.address
    const telephone = require.body.telephone
    const email = require.body.email
    const grade =  require.body.grade
    const section = require.body.section

    /////ERROR VALIDATION
    const error = validationResult(require)
    if(!error.isEmpty()){
        return response.status(422).json({message:error})
    }
    ////NEW TEACHER
    const newTeacher = new Teacher({
        firstName,
        middleName,
        lastName,
        age,
        address,
        telephone,
        email,
        grade,
        section,
    })



    try{
        await newTeacher.save()
    }catch (e) {
        return response.status(422).json({message:"Teacher not saved!"})
    }
    return response.status(201).json({teacher: newTeacher})
}




////UPDATE
const update  = async (require,response) => {

    const teacher_id = require.params.teacher_id

    const firstName = require.body.firstName
    const middleName = require.body.middleName
    const lastName = require.body.lastName
    const age = require.body.age
    const address = require.body.address
    const telephone = require.body.telephone
    const email = require.body.email
    const grade = require.body.grade
    const section = require.body.section

    let teacher;
    try {
        teacher = await Teacher.findById(teacher_id)
    } catch (e) {
        return response.status(422).json({message: e})
    }

    teacher.firstName = firstName
    teacher.middleName = middleName
    teacher.lastName = lastName
    teacher.age = age
    teacher.address = address
    teacher.telephone = telephone
    teacher.email = email
    teacher.grade = grade
    teacher.section = section

    try {
        await teacher.save()

    } catch (e) {
        return response.status(417).json({message: e})

    }
    response.status(202).json({teacher})
}




/////DELETE
const deleteTeacher = async (req, res) =>{

    const teacherId = req.params.teacher_id

    // let teacher;
    // try{
    //     teacher = await Teacher.findById(teacherId)
    // }catch (e) {
    //     return response.status(422).json({message:e})
    // }

    // /////1st if STUDENT removed from teacher
    // try{
    //     await Student.remove({teacher_id:teacherId})
    // }catch (e) {
    //     return response.status(422).json({message:"Unable to delete student"})
    // }

    /////2nd if TEACHER removed
    try{
        teacher = await Teacher.findById(teacherId)
    }catch (e) {
        return res.status(422).json({message:e})
    }

    try{
        await teacher.remove()
    }catch (e) {
        return res.status(417).json({message:e})
    }
    response.status(202).json({message:"successfully deleted."})
}



/////   EXPORTS
exports.index = index
exports.show = show
exports.store = store
exports.update = update
exports.delete = deleteTeacher
exports.TeacherByStudent = TeacherByStudent

