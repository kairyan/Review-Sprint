var SongModel = Backbone.Model.extend({

	play:function(){
		//console.log("play")
		this.trigger('play',this);
	},

	enqueue:function(){
		this.trigger('enqueue',this)
	},

	dequeue:function(){
		this.trigger('dequeue',this)
	},
	ended:function(){
		this.trigger('ended',this)
	},

	songname:function(){
		console.log("anything")
		//console.log(e)
		this.trigger('songname',this)
	}


})