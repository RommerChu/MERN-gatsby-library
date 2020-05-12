const express = require('express')
const router = express.Router()

const { check } = require('express-validator')

const teacherController = require('../controllers/teacher_controller')

router.get('/',teacherController.index)
router.get('/:teacher_id', teacherController.show)
router.get('/teacher/:teacher_id', teacherController.TeacherByStudent)
router.post('/',[check('firstName').not().isEmpty(), check('email').isEmail()],teacherController.store)
router.patch('/:teacher_id',teacherController.update)
router.delete('/:teacher_id',teacherController.delete)

module.exports = router