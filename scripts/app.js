var RoomName = Backbone.Model.extend({
	url: "https://api.parse.com/1/classes/chatterbox/",
	defaults:{
		roomname:""
	}


})

var RoomNames = Backbone.Collection.extend({
	model: RoomName,
	url: "https://api.parse.com/1/classes/chatterbox/",
	defaults: {
		roomname:""
	},
	parse: function(response, options){
		//console.log(response.results[0].roomname)
		var result = [];
		for(var i=response.results.length-1;i>=0;i--){
			result.push(response.results[i])
		}
		return result;
	},
	loadMsg:function(){
		this.fetch({data:{order:'-createdAt'}})
		// this.fetch();
	}
})

var RoomView = Backbone.View.extend({
	
	template:_.template('<option value="roomname"><%-roomname%></option>'),
	
	render:function(){


	return this.$el.html(this.template(this.model.attributes));
	//return this.$el
	}
})

var RoomsView = Backbone.View.extend({
	initialize: function(){
		this.collection.on('sync',this.render, this)
	},

	render:function(){
		this.$el.html('<select>Rooms</select>').append(
		this.collection.forEach(this.renderMessage, this))
	},

	renderMessage: function(obj){
		var roomView = new RoomView({model:obj});
		var $html = roomView.render()
		//$($html).addClass("main")
		this.$el.prepend($html)
		//$('body').append('#chats')
		//console.log(messageView)
	}
})

var Message = Backbone.Model.extend ({
	// initialzie: function(data){
	// 	//console.log(data)
	// },

	url: "https://api.parse.com/1/classes/chatterbox/",

	defaults: {
		username:"",
		songname:"",
		text:"",
		roomname:"lobby"
	},
	// success:function(data){
	// 	console.log(data)
	// }

});

var Messages = Backbone.Collection.extend({
	model: Message,
	url: "https://api.parse.com/1/classes/chatterbox/",
	defaults: {
		username:"",
		roomname:"lobby",
		text:""
	},
	parse: function(response, options){
		console.log(response.results[0].roomname)
		var result = [];
		for(var i=response.results.length-1;i>=0;i--){
			result.push(response.results[i])
		}
		return result;
	},
	loadMsg:function(){
		this.fetch({data:{order:'-createdAt'}})
		// this.fetch();
	}
})


 var FormView = Backbone.View.extend({
 	// initialize: function(){
 	// 	//this.collection.on('sync',this.collection.loadMsg(),this)
 	// },
 	initialize:function(){

 		
 	},

 	events :{
 		'submit #send' :'handleSubmit',
 		'click':'songname'
		},
 	
	songname:function(e){
		console.log("in formview")
		//console.log(e)
		this.trigger('songname',this)
	},
 	handleSubmit:function(e){
 		e.preventDefault();
		var $text = this.$('#message');
		 console.log($text.val())
		// console.log("hello")
		var msg ={
			username:window.location.search.substr(10),
			text:$text.val(),
			songname:this.song
		};
		$text.val('');

		  this.collection.create(msg);

		// var message = new Message(msg);
		// message.save();
	}
 })




var MessageView= Backbone.View.extend({
	template:_.template('<div class="chat" data-id"<%= objectId %>">\
				<div class="username"> username: <%- username%></div>\
				<div class ="roomname"> roomname: <%- roomname%></div>\
				<div class= "text"> message:<%- text%>\
				</div>'),



	render:function(){


	this.$el.html(this.template(this.model.attributes)).css("color","blue");
	return this.$el
	}
});

var MessagesView = Backbone.View.extend({
	initialize: function(){
		this.collection.on('sync',this.render, this)
	},
	render:function(){
		this.collection.forEach(this.renderMessage, this)
	},

	renderMessage: function(obj){
		var messageView = new MessageView({model:obj});
	//	this.$el.prepend(messageView.render())


		var $html = messageView.render()
		$($html).addClass("main")
		this.$el.prepend($html)
		//$('body').append('#chats')
		//console.log(messageView)
	}
})








// var app;

// $(function(){


// app = {

// server :"https://api.parse.com/1/classes/chatterbox/",
// username: 'anonymous',
// room: 'lobby',
// friends:{},
// username : window.location.search.substr(10),
// init:function(){
// app.username = window.location.search.substr(10);

// app.fetch();

// app.$main = $('#main');
// app.$message = $('#message');
// app.$chats = $('#chats');
// app.$roomSelect = $('#roomSelect');
// app.$send = $('#send');
// app.$username = $('.username')
// app.$roomSelect.on('change',app.saveRoom);
// app.$send.on('submit',app.handleSubmit);
// app.$main.on('click', '.username', app.addFriend)
// //setInterval(app.fetch, 3000)

// },

// saveRoom:function(event){
// //var c = prompt("how are you")
// var selectIndex = app.$roomSelect.prop('selectedIndex');
// if(selectIndex === 0){

// 	var roomname = prompt("Enter room name");
// 	if(roomname){
// 		app.room = roomname
// 		app.addRoom(roomname);
// 		app.$roomSelect.val(roomname)
// 		app.fetch();
// 	}

// }
// else{
// 	app.room = app.$roomSelect.val();

// 	app.fetch();
// }

// },

// send:function(data){

// $.ajax({
// url:app.server,
// type:'POST',
// data:JSON.stringify(data),
// contentType:'application/json',
// success:function(data){
	
// 	app.fetch();
// },
// error:function(reason){
// 	console.error("fail to send data " , reason)
//       }
//    })

// },

// fetch:function(){
// $.ajax({
// url:app.server,
// type:'GET',
// contentType:'application/json',
// data:{order:'-createdAt'},
// success:function(data){
// 	console.log(data.results[0]);
// 	app.populateRooms(data.results);
// 	app.populateMessages(data.results);
// },
// error:function(reason){
// 	console.error("fail to fetch data, " , reason)
//       }
//    })
// },


// populateRooms:function(results){


// app.$roomSelect.html('<option value="__newRoom"> New Room...</option><option value= "lobby" selected>Lobby</option>')


// if(results){
// 	var processedRooms ={};
// 	if(app.room !== 'lobby'){
// 		app.addRoom(app.room)
// 		processedRooms[app.room] = true;
// 	}
	
// 	results.forEach(function(data){
// 		var roomname = data.roomname;
// 		if(roomname && !processedRooms[roomname]){ app.addRoom(roomname); 
// 		 processedRooms[roomname] = true;}
// 	})
// }

// app.$roomSelect.val(app.room)
// },

// populateMessages:function(results){
// 	app.clearMessages();
// 	if(Array.isArray(results)){
// 		results.forEach(app.addMessage)
// 	}
// },



// clearMessages:function(){
// 	app.$chats.empty();
// },


// addRoom:function(roomname){


// var $option = $('<option />').val(roomname).text(roomname)

// app.$roomSelect.append($option)


// },

// addMessage:function(data){
// if(!data.roomname){ 
// 	data.roomname = 'lobby'
// 					}
// 	if(data.roomname === app.room)
// 	{
		
// 		var $chat =$('<div class="chats" />');
// 		var $username = $('<a class="username" />')
// 		.attr('href','#')
// 		.attr('data-username',data.username)
// 		.attr('data-roomname',data.roomname)
// 		.text(data.username)
// 		.appendTo($chat);
// 		var $message = $('<span />');
// 		$message.text(data.text)
// 			.appendTo($chat)
// 			if(app.friends[data.username] === true){
// 				($username).addClass('friend')
// 			}
// 			app.$chats.append($chat)
// 			}

// },

// addFriend:function(evt){
// 	var username = $(evt.currentTarget).attr('data-username');
// 	if(username !== undefined){
// 		console.log("chatter adding chedder", username);
// 		app.friends[username]=true;
// 		var selector = '[data-username="'+username.replace(/"/g,'\\\"')+']"'
// 		 $(selector).addClass('friend');
// 	}
// },


// handleSubmit:function(event){
// 	event.preventDefault();

// 	var message = {
// 		username:app.username,
// 		roomname:app.room || 'lobby',
// 		text:app.$message.val()
// 	}
// 	app.send(message)

// }

// }





// })





// 	