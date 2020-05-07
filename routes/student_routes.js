const express = require('express')
const router = express.Router()
const {check} = require('express-validator')


router.get('/', studentController.index)
router.get('/:student_id',studentController.show)
router.get('/student/:student_id', studentController.StudentByTeacher)
router.post('/',[check('firstName'||'lastName').not().isEmpty()],studentController.store)
router.patch('/:student_id',studentController.update)
router.delete('/:student_id',studentController.deleteStudent)


module.export = router