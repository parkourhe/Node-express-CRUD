// 这里封装一些数据操作
var fs = require('fs')



var dbPath = './data.json'

// 查询所有学生
 
 exports.find = function(callback){

 	fs.readFile(dbPath,'utf-8',function(err,data){
 		if (err) {
 			return callback(err)
 		}
 		
 		callback(null,JSON.parse(data).student)

 	})
 }


//查询单个学生

exports.findId = function(id,callback){
	fs.readFile(dbPath,'utf-8',function(err,data){

		if (err) {
			return callback(err)
		}

		var students =JSON.parse(data).student



		var currentItem = students.find(function(item){
			
			return  id == item.id

		})

	
		callback(null,currentItem)


	})


}






//保存学生
exports.save = function(student,callback){

	fs.readFile(dbPath,'utf-8',function(err,data){
		if (err) {
			return callback(err)
		}

		var students = JSON.parse(data).student

		if (student.sex==1) {
			student.sex = "男"
		}else{
			student.sex ="女"
		}


		student.id = students[students.length-1].id + 1

		students.push(student)

		var newdata = {
			student : students
		}


		fs.writeFile(dbPath,JSON.stringify(newdata),function(err){

			if (err) {
				return callback(err)
			}


		})

	

	})


}



//修改

exports.update=function(update,callback){
	fs.readFile(dbPath,'utf-8',function(err,data){

		if (err) {
			return callback(err)
		}

		var students = JSON.parse(data).student

	

		var currentItem = students.find(function(item){

			return update.id == item.id

		})


	

		for(key in update){
			
			currentItem[key] = update[key]

		}
		
		
		fs.writeFile(dbPath,JSON.stringify({
			"student": students
		}),function(err){
			if (err) {
				return callback(err)
			}
			callback(null)
		
		})

		console.log('test');

	})



}



//删除
	
exports.delete=function(id,callback){

	fs.readFile(dbPath,'utf-8',function(err,data){
		if (err) {
			return callback(err)
		}

		var student =JSON.parse(data).student

		var currentId = student.findIndex(function(item){

			return parseInt(id) == parseInt(item.id)


		})

		student.splice(currentId, 1)


		fs.writeFile(dbPath,JSON.stringify({
			"student" : student
		}),function(err){
			if (err) {
				return callback(err)
			}

			return callback(null)
		})




	})







}