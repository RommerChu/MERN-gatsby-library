const express = require('express')
const router = express.Router()

const {check} = require('express-validator')


const studentsController = require('../controller/student_controller')

router.get('/', studentsController.index)
router.get('/:student_id',studentsController.show)
router.get('/student/:student_id', studentsController.StudentByTeacher)
router.post('/',[check('firstName'||'lastName').not().isEmpty()],studentsController.store)
router.patch('/:student_id',studentsController.update)
router.delete('/:student_id',studentsController.delete)


module.exports = router