const express = require('express')
const router = express.Router()

const {check} = require('express-validator')

const studentController = require('../controller/student_controller')

router.get('/', studentController.index)
router.get('/:student_id',studentController.showStudent)
router.get('/student/:student_id', studentController.StudentByTeacher)
router.post('/',[check('firstName'||'lastName').not().isEmpty()],studentController.storeStudent)
router.patch('/:student_id',studentController.updateStudent())
router.delete('/:student_id',studentController.deleteStudent)


module.exports = router