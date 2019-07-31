// 路由模块的职责

// 专门处理路由

//和路由的一些相关的函数

var fs = require('fs')

var express = require('express')

var router = express.Router()

var  student = require('./student')



router.get('/',function(req,rep){

	//异步式编程
	student.find(function(err,data){

		if (err) {
			return req.status(500).send('页面错误')
		}

		

		var student = data


		

		rep.render('index.html',{
			student:student
		})



	})
	// fs.readFile('./data.json','utf-8',function(err,data){
	// 	if (err) {
	// 		console.log('错误');	
	// 	}

	// 	var data = JSON.parse(data)


	// 	var fruits =data.fruits

	// 	var student = data.student

	// 	rep.render('index.html',{
	// 		fruits:fruits,
	// 		student:student

	// 	})

	// })

   
})
router.get('/new',function(req,rep){
	rep.render('new.html')

})

// 这里是提交数据
//异步式编程
router.post('/students/new',function(req,rep){

	console.log(req.body);

	student.save(req.body,function(err){

		if (err) {
			return req.status(500).send('页面错误')
		}




	})


	rep.redirect('/')


	// fs.readFile('./data.json','utf-8',function(err,data){
	// 	if (err) {
	// 		rep.status = 500
	// 		rep.render('err.html')

	// 	}
	// 	josn_data = JSON.parse(data)

	// 	var newData  = req.body

	// 	newData.id = 1

	// 	if (newData.sex=='1') {
	// 		newData.sex ="男"
	// 	}else {
	// 		newData.sex = "女"
	// 	}


	// 	 josn_data.student.push(newData)

		
	// 	fs.writeFile('./data.json',JSON.stringify(josn_data),function(err){
	// 		if (err) {
	// 			rep.render('err.html')
	// 		}

	// 		rep.redirect('/')

	// 	})

	// })


})

// 编辑入口

router.get('/edit',function(req,rep){

	student.findId(req.query.id,function(err,data){
		if (err) {
			console.log('读取文件失败');
		}

		var currentDate = data
		
		rep.render('edit.html',{
			currentDate : currentDate
		})	

		// console.log(currentDate);

	})



})


router.post('/edit',function(req,rep){

	var update = req.body

	

	student.update(update,function(err,data){
		if (err) {
			console.log('保存文件失败');
		}


	console.log('test');	
	rep.redirect('/')
		



	})


})


// 删除文件

router.get('/delete',function(req,rep){
	
	 student.delete(req.body,function(err){
	 	if (err) {
	 		return req.status(500).send('页面错误')
	 	}

	 	rep.redirect('/')



	 })




})






module.exports = router