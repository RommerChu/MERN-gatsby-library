const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherSchema = new Schema({

    firstName: {type:String, require:true},
    middleName:{type:String, require:true},
    lastName:{type:String, require:true},
    age:{type:String, require:true},
    address:[{
        street:{type:String,require:true},
        city:{type:String, require:true},
        province:{type:String, require:true},
        postalCode:{type:String, require:true},
    }],
    telephone:{type:String, require:true},
    email:{type:String, require:true},

})

module.export = mongoose.model("Teacher",teacherSchema)