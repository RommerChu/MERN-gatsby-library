const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({

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
    parents:[{
        father:{type:String, require:true},
        contact1:{type:String, require:true},
        email1:{type:String, require:true},
        mother:{type:String, require:true},
        contact2:{type:String, require:true},
        email2:{type:String, require:true},
    }],

    level:{type:String, require:true},
    section:{type:String, require:true},
    teacher_id:{type:mongoose.Types.ObjectId,require:true,ref:'Teacher'},

})

module.export = mongoose.model("Student",studentSchema)