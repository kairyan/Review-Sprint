var AppModel = Backbone.Model.extend({

	initialize: function(attr){


		// var messages = new Messages();
  //     	 messages.loadMsg();
  //     	 var messagesView = new MessagesView({el:$('#chats'), collection:messages})
		this.set('currentSong', null);
		this.set('songQueue', new SongQueue())


		attr.library.on('enqueue',function(song){
			this.get('songQueue').add(song)
		},this)
		
		attr.library.on('play',function(song){
			this.set('currentSong', song)
		},this)
		
		this.get('songQueue').on('stop',function(){
			this.set('currentSong',null)
		},this)


	}




})