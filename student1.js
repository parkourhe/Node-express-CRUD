var mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true})


var Schema = mongoose.Schema


var StudentSchema = new Schema({

	name : {
		type : String,

		required : true
	},

	age : {
		type: Number,

		required:true
	},

	sex:{

		type: Number,

		enum:[0,1],

		default : 0

	},

	number:{
		type : Number

	}



}
	

)


 

module.exports = mongoose.model('Student',StudentSchema)




