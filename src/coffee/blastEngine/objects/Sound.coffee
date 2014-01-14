class Sound
	fileTypes: ["ogg", "mp3"]

	constructor: (@src, loops) ->
		@isEnabled = true
		@createAudioElement loops
		@fileTypes.forEach @addSource
		not loops & @changePlayStateOnEnded()

	addSource: (extention) =>
		source = document.createElement("source")
		source.setAttribute('src', "#{@src}.#{extention}")
		source.setAttribute 'type', "audio/#{extention}"
		@audio.appendChild source

	createAudioElement: (loops) ->
		@audio = document.createElement("audio")
		@audio.preload = "auto"
		@audio.loop = !!loops

	changePlayStateOnEnded: ->
		@audio.addEventListener "ended", =>
			@isPlaying = false
		, false

	disable: ->
		@audio.pause()
		@isEnabled = false

	enable: ->
		@isEnabled = true
		@resume()

	play: ->
		if @isEnabled
			@isPlaying = true
			clearTimeout @playTimeout
			if @audio.readyState > 1
				@audio.currentTime = 0
				@audio.play()
			else
				@playTimeout = setTimeout(=>
					@play()
				, 20)

	pause: ->
		@audio.pause()
		@isPlaying = false

	resume: ->
		@audio.play()  if @isEnabled and @isPlaying

	stop: ->
		if @audio.readyState > 1
			@audio.pause()
			@audio.currentTime = 0
			@isPlaying = false

module.exports = Sound
