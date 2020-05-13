const {validationResult} = require('express-validator')


const Student = require('../models/student')
// const Teacher = require('../models/teacher')

/////INDEX STUDENT
async function index(require, response, next){
    let students;
    try {
        students = await Student.find()
    }catch (e) {
        return response.status(417).json({message:e})
    }
    response.status(200).json({students})
}


/////SHOW STUDENT
const show = async (require, response, next)=>{

    const studentId = require.params.student_id
    try{
        const student = await Student.findById(studentId)
    }catch (e) {
        return response.status(422).json({message:"Invalid student id"})
    }
    return response.status(200).json({student:student.toObject({getters:true})})
}


const StudentByTeacher = async (require, response, next)=>{

    const teacherId =  require.params.studentId
    const  student = await Student.find({teacher:teacherId});

    if(student.length == 0){
        return response.status(404).json({message:"Invalid teacher id!"})
    }
    return response.status(200).json({student})

}



/////STORE
const store = async (require,response)=>{

    const firstName = require.body.firstName
    const middleName = require.body.middleName
    const lastName = require.body.lastName
    const age = require.body.age
    const address = require.body.address
    const parents = require.body.parents
    const telephone = require.body.telephone
    const grade =  require.body.grade
    const section = require.body.section
    const teacher_id = require.body.teacher_id

    /////ERROR VALIDATION
    const error = validationResult(require)
    if(!error.isEmpty()){
        return response.status(422).json({message:error})
    }
    ////NEW STUDENT
    const newStudent = new Student({
        firstName,
        middleName,
        lastName,
        age,
        address,
        parents,
        telephone,
        grade,
        section,
        teacher_id,
    })
    try{
        await newStudent.save()
    }catch (e) {
        return response.status(422).json({message:"Student not saved!"})
    }
    return response.json({student: newStudent})
}



////UPDATE
const update  = async (require, response) => {

    const student_id = require.params.student_id
    const firstName = require.body.firstName
    const middleName = require.body.middleName
    const lastName = require.body.lastName
    const age = require.body.age
    const address = require.body.address
    const parents = require.body.parents
    const telephone = require.body.telephone
    const grade = require.body.grade
    const section = require.body.section
    const teacher_id = require.body.teacher_id

    try{
        const student = await Student.findById(student_id)
    }catch (e) {
        return response.status(422).json({message:e})
    }

    student.firstName = firstName
    student.middleName = middleName
    student.lastName = lastName
    student.age = age
    student.address = address
    student.parents = parents
    student.telephone = telephone
    student.grade = grade
    student.section = section
    student.teacher_id = teacher_id
    try {
        await student.save()

    } catch (e) {
        return response.status(417).json({message: e})
    }
    response.status(202).json({student})
}



/////DELETE
const deleteStudent = async (student_id) =>{

    const studentId = require.params.studentId

    // let student;
    // try{
    //     student = await Student.findById(studentId).populate('teacher_id')
    // }catch (e) {
    //     return response.status(422).json({message:e})
    // }

    try{
        await student.remove()
        student.teacher_id.student.pull(student)
        await student.teacher_id.save()
    }catch (e) {
        return response.status(417).json({message:e})
    }
    response.status(202).json({message:"Student successfully deleted."})
}



/////   EXPORTS
exports.index = index
exports.show = show
exports.store = store
exports.update = update
exports.delete = deleteStudent
exports.StudentByTeacher = StudentByTeacher

