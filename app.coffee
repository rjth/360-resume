{VRComponent, VRLayer} = require "VRComponent"
{TextLayer} = require 'TextLayer'
{AudioPlayer} = require "audio"

Framer.Info =
    author: "Jonathan Ravasz"
    twitter: "@jonathan_ravasz"
    title: "360° Resume"
    description: "Interactive, 360° resume of Jonathan Ravasz."

#Foreground cubemap initialisation
vrForeground = new VRComponent
	front: "images/front_room.jpg"
	right: "images/right_room.jpg"
	left: "images/left_room.jpg"
	back: "images/back_room.jpg"
	bottom: "images/bottom_room.jpg"
	top: "images/top_room.jpg"
	perspective: 800
	heading: 0
	elevation: -15

#Initialise sound player
tapSound = new AudioPlayer
	audio: "audio/click_natural.mp3"

#Set cursor to default
document.body.style.cursor = "auto"

#Main scene
mainScene = ->
	#Enable cubemap drag
	vrForeground.orientationLayer = true
	
	vrForeground.on Events.MouseDown, ->
		document.body.style.cursor = "none"
	
	vrForeground.on Events.MouseUp, ->
		document.body.style.cursor = "none"
	
	#Add tooltips and define their positions
	vrTooltipMonitor = new VRLayer
		heading: -15.5
		elevation: -10.7
	
	vrTooltipCardboard = new VRLayer
		heading: -14.2
		elevation: -23.7
		
	vrTooltipSketch = new VRLayer
		heading: -22.5
		elevation: -22.2
		
	vrTooltipMac = new VRLayer
		heading: 7.4
		elevation: -13.1
		
	vrTooltipEdu = new VRLayer
		heading: 13
		elevation: 9.5
		
	vrTooltipBox = new VRLayer
		heading: 73.5
		elevation: -20.1
		
	vrTooltipFolders = new VRLayer
		heading: 82.5
		elevation: 2
		
	vrTooltipExhbition = new VRLayer
		heading: -131
		elevation: 11
	
	#Create array from tooltips
	vrTooltips = [vrTooltipMonitor, vrTooltipCardboard, vrTooltipSketch, 				   vrTooltipMac, vrTooltipEdu, vrTooltipBox, vrTooltipFolders, 				   vrTooltipExhbition]
	
	#Textbox initialisation
	textBox = new Layer
		width: 700
		height: 390
		backgroundColor: "#4597D7"
		opacity: 0
		borderRadius: 6
		shadowBlur: 4
		shadowSpread: 2
		shadowColor: "rgba(0,0,0,0.1)"
		
	textBoxShow = new Animation
		layer: textBox
		properties:
			opacity: 1
		time: 0.5
			
	textBoxHide = textBoxShow.reverse()
	
	#Textbox content initialisation
	text = new TextLayer
	    color: "#fff"
	    opacity: 0
	    textAlign: "left"
	    fontSize: 24
	    width: 624
	    height: 390
	    fontFamily: 'Work Sans'
	    fontWeight: '400'
	    lineHeight: 1.5
	    paddingTop: 85
	    letterSpacing: 0
	    
	textShow = new Animation
		layer: text
		properties:
			opacity: 1
		time: 0.5
			
	textHide = textShow.reverse()
	
	#Textbox title initialisation
	textTitle = new TextLayer
	    color: "#fff00"
	    opacity: 0
	    textAlign: "center"
	    fontSize: 24
	    width: 620
	    height: 32
	    fontFamily: "Work Sans"
	    fontWeight: '700'
	    textTransform: "uppercase"
	
	textTitleShow = new Animation
		layer: textTitle
		properties:
			opacity: 1
		time: 0.5
			
	textTitleHide = textTitleShow.reverse()
	
	#Project text elements to cubemap distortion
	vrForeground.projectLayer(textBox)
	vrForeground.projectLayer(textTitle)
	vrForeground.projectLayer(text)
	
	#Style tooltips via for-loop
	for i in [0...vrTooltips.length]
		vrTooltips[i].image = "images/tooltip.png"
		vrTooltips[i].width = 60
		vrTooltips[i].height = 60
		vrTooltips[i].borderRadius = 30
		vrTooltips[i].shadowBlur = 4
		vrTooltips[i].shadowSpread = 2
		vrTooltips[i].shadowColor = "rgba(0,0,0,0.1)"
		vrForeground.projectLayer(vrTooltips[i])
	
	#Add & style reticle
	reticle = new Layer
		width: 80
		height: 80
		borderRadius: 40
		backgroundColor: "transparent"
		shadowBlur: 4
		shadowSpread: 1
		shadowColor: "rgba(0,0,0,0.1)"
		scale: 0.25
		
	reticle.style.border = "16px solid rgba(255,255,255,0.85)"
	reticle.center()
	
	reticleScaleUp = new Animation
		layer: reticle
		properties: 
			scale: 0.35
		time: 0.1
		curve: "linear"
		
	reticleScaleDown = new Animation
		layer: reticle
		properties: 
			scale: 0.25
		time: 0.1
		curve: "linear"
	
	#On foreground position change event do stuff
	tooltipFound = false
	crntTpHeading = 0
	crntTpElevation = 0
	currentTooltipID = 0
	
	tooltipHandler = ->
		vrForeground.on Events.OrientationDidChange, (data) ->
		
			heading = data.heading
			elevation = data.elevation
			tilt = data.tilt
			
			#Tooltip behaviour
			for i in [0...vrTooltips.length]
				triggerDistance = 2.2
				headingProximity = Math.abs(heading - vrTooltips[i].heading)
				elevationProximity = Math.abs(elevation - vrTooltips[i].elevation)
				if (headingProximity < triggerDistance)
					if (elevationProximity < triggerDistance)
						if (tooltipFound is false)
							tapSound.player.play()
							currentTooltipID = i
							reticleScaleUp.start()
							tooltipActivator(currentTooltipID)
							crntTpHeading = vrTooltips[i].heading
							crntTpElevation = vrTooltips[i].elevation
							tooltipFound = true
							onTooltipFound(crntTpHeading, crntTpElevation)
				if (tooltipFound is true)
					if (Math.abs(heading - crntTpHeading) > triggerDistance)
						reticleScaleDown.start()
						tooltipDisabler(currentTooltipID)
						tooltipFound = false
						onTooltipLost()
					else if (Math.abs(elevation - crntTpElevation) > triggerDistance)
						reticleScaleDown.start()
						tooltipDisabler(currentTooltipID)
						tooltipFound = false
						onTooltipLost()
				
	tooltipHandler()	
	
	#Tooltip animations
	tooltipActivator = (currentTooltip) ->
		vrTooltips[currentTooltip].animate
			properties: 
				scale: 1.3
			time: 0.2
			curve: "linear"
	
	tooltipDisabler = (currentTooltip) ->
		vrTooltips[currentTooltip].animate
			properties: 
				scale: 1
			time: 0.2
			curve: "linear"
	
	#Do stuff if reticle is over a tooltip
	onTooltipFound = (currentToolTipHeading, currentTooltipElevation) ->
		text.text = textContent[currentTooltipID]
		textTitle.text = textTitles[currentTooltipID]
		textBoxShow.start()
		textTitleShow.start()
		textShow.start()
		
		tooltipArray = vrTooltips.slice(0)
		tooltipArray.splice(currentTooltipID, 1)
		for i in [0...tooltipArray.length]
			tooltipFadeOut = new Animation
				layer: tooltipArray[i]
				properties:
					opacity: 0
				time: 0.5
			tooltipFadeOut.start()
		
		textBox.heading = currentToolTipHeading + 0
		textBox.elevation = currentTooltipElevation + 12
		textTitle.heading = currentToolTipHeading + 0
		textTitle.elevation = currentTooltipElevation + 18.9
		text.heading = currentToolTipHeading + 0
		text.elevation = currentTooltipElevation + 12
		
		vrForeground.projectLayer(textBox)
		vrForeground.projectLayer(textTitle)
		vrForeground.projectLayer(text)
	
	#Do stuff if reticle is out of a tooltip
	onTooltipLost = ->
		textBoxHide.start()
		textTitleHide.start()
		textHide.start()
		
		tooltipArray = vrTooltips.slice(0)
		tooltipArray.splice(currentTooltipID, 1)
		for i in [0...tooltipArray.length]
			tooltipFadeIn = new Animation
				layer: tooltipArray[i]
				properties:
					opacity: 1
				time: 0.5
			tooltipFadeIn.start()

	#On window resize make sure elements are on their correct place and size
	window.onresize = ->
		vrForeground.size = Screen.size
		reticle.center()
		introText.center()
		introBackground.width = Screen.width
		introBackground.height = Screen.height
		pdfResumeButton.centerX(130)
		pdfResumeButton.centerY(30)
		vrResumeButton.centerX(-130)
		vrResumeButton.centerY(30)

#Intro scene
introScene = ->
	#Disable cubemap drag
	vrForeground.orientationLayer = false
	
	#Rotate cubemap slowly
	foregroundConstantRot = vrForeground.animate
		properties:
			heading: 360
		curve: "linear"
		time: 600
	
	#Dark overlay over cubemap
	introBackground = new Layer
		backgroundColor: "rgba(0,0,0,0.5)"
		width: Screen.width
		height: Screen.height
	
	#Initialise welcome claim
	introText = new TextLayer
	    color: "#fff"
	    text: "Hello, I am Jonathan Ravasz. Welcome to my resume."
	    textAlign: "center"
	    fontSize: 30
	    width: 500
	    height: 250
	    fontFamily: 'Work Sans'
	    fontWeight: '400'
	    lineHeight: 1.5
	    paddingTop: 0
	    superLayer: introBackground
	
	introText.center()
	
	#Initialise buttons
	vrResumeButton = new Layer
		width: 220
		height: 50
		borderRadius: 4
		backgroundColor: "#48A7F2"
		shadowBlur: 2
		shadowSpread: 2
		shadowColor: "rgba(0,0,0,0.1)"
		superLayer: introBackground
	
	vrResumeButton.centerX(-132)
	vrResumeButton.centerY(36)
	
	pdfResumeButton = new Layer
		width: 220
		height: 50
		borderRadius: 4
		backgroundColor: "#48A7F2"
		shadowBlur: 2
		shadowSpread: 2
		shadowColor: "rgba(0,0,0,0.1)"
		superLayer: introBackground
	
	pdfResumeButton.centerX(132)
	pdfResumeButton.centerY(36)
	
	vrButtonText = new TextLayer
		superLayer: introBackground
		
	pdfButtonText = new TextLayer
		superLayer: introBackground
	
	#Button text label styling
	buttonLabelStyling = (currentButton, label, labelText) ->
		label.color = "#fff"
		label.textAlign = "center"
		label.fontSize = 14
		label.fontFamily = 'Work Sans'
		label.fontWeight = '400'
		label.text = labelText
		label.width = currentButton.width
		label.height = currentButton.height
		label.x = currentButton.x
		label.y = currentButton.y + 16
		
	buttonLabelStyling(vrResumeButton, vrButtonText, "INTERACTIVE VERSION")
	buttonLabelStyling(pdfResumeButton, pdfButtonText, "PDF VERSION")
	
	#Button hover and mouse out styling
	buttonMouseOver = (currentButton) ->
		currentButton.backgroundColor = "#64B5F6"
		currentButton.shadowBlur = 3
		currentButton.shadowSpread = 3
		currentButton.shadowColor = "rgba(0,0,0,0.1)"
		
	buttonMouseOut = (currentButton) ->
		currentButton.backgroundColor = "#48A7F2"
		currentButton.shadowBlur = 2
		currentButton.shadowSpread = 2
		currentButton.shadowColor = "rgba(0,0,0,0.1)"
	
	#Material design style ripple effect
	buttonRipple = (currentButton, e) ->
		width = currentButton.width
		height = currentButton.height
		mouseX = Utils.modulate e.offsetX, [0, width], [-width/2, 												currentButton.width/2] 
		mouseY = Utils.modulate e.offsetY, [0, height], [height/2, -												currentButton.height/2]
					
		circle = new Layer
			borderRadius: "50%"
			backgroundColor: "#ccc"
			superLayer: currentButton
			width: 20
			height: 20
			midX: e.offsetX
			midY: e.offsetY
			
		zoom = circle.animate
			properties:
				opacity: 0
				scale: 40
			time: 0.7
			
		zoom.on "end", -> 
			circle.destroy()
	
	#Handle click, hover and mouse out events
	vrResumeButton.on Events.TouchStart, (e) ->
		buttonRipple(vrResumeButton, e)
		
	pdfResumeButton.on Events.TouchStart, (e) ->
		buttonRipple(pdfResumeButton, e)
	
	vrResumeButton.on Events.MouseOver, ->
		buttonMouseOver(vrResumeButton)
		
	vrResumeButton.on Events.MouseOut, ->
		buttonMouseOut(vrResumeButton)
		
	pdfResumeButton.on Events.MouseOver, ->
		buttonMouseOver(pdfResumeButton)
		
	pdfResumeButton.on Events.MouseOut, ->
		buttonMouseOut(pdfResumeButton)
	
	#Open PDF resume
	pdfResumeButton.on Events.Click, ->
		tapSound.player.play()
		window.location = "http://jonathanravasz.com/"
	
	#Start main scene, show interactive resume, hide intro scene
	vrResumeButton.on Events.Click, ->
		tapSound.player.play()
		hideIntro(introBackground)
		foregroundConstantRot.stop()
		mainScene()
			
	hideIntro = (layerToHide) ->
		vrResumeButton.ignoreEvents = true
		hideAnim = layerToHide.animate
			properties:
				opacity: 0
			time: 1.5
		
		hideAnim.on "end", ->
			layerToHide.destroy()
			
	#On window resize make sure elements are on their correct place and size
	window.onresize = ->
		vrForeground.size = Screen.size
		introBackground.width = Screen.width
		introBackground.height = Screen.height
		pdfResumeButton.centerX(130)
		pdfResumeButton.centerY(40)
		vrResumeButton.centerX(-130)
		vrResumeButton.centerY(40)
		buttonLabelStyling(vrResumeButton, vrButtonText, "INTERACTIVE VERSION")
		buttonLabelStyling(pdfResumeButton, pdfButtonText, "PDF VERSION")
		introText.center()

#Start intro scene
introScene()

#Initialise text content
monitorTitle = "Development skills"
monitorText = "Experienced in prototyping of interfaces and interactions. Built several production ready applications utilizing knowledge in C#, Java and Javascript. Have been working alongside developers and have shipped production ready software."

cardboardTitle = "Design Practices in VR"
cardboardText = "Designed and developed a VR app for Google Cardboard, exploring interaction principles for virtual reality. The project was exhibited during the Bratislava Design Week, and received the Discovery of the Year Award of 2016."

sketchTitle = "Articles and Lectures"
sketchText = "Published an article on best practices for designing non-tracked VR experiences. The article was republished under uxdesign.cc and had been exposed greatly to the design community. Lectured on VR and AR design workflow at the Bratislava innovation hub, Lab."

macTitle = "Tools"
macText = "Designed and built experiences for both 3D and 2D environments using Unity, Framer, Sketch and Cinema4D. Beside digital tools my work is firmly supported by my hand-sketching and wireframes."

eduTitle = "Education"
eduText = "Graduated at the Media Lab of the Academy of Fine Arts and Design in Slovakia. Spent a scholarship semester at the Munich Academy of Applied Sciences, studying interaction design, focusing on tacit knowledge and building contextual interfaces."

boxTitle = "Hardware skills"
boxText = "Built various physical installations composed of motors, sensors, actuators, microcontrollers, etc. (other electronics). Cooperated with artists, helping them to materialize their ideas."

folderTitle = "Work experience"
folderText = "Worked as a UI designer on the My AEG and My Electrolux IoT apps at Alice in Tokyo. Designed and built interactive installations for trade shows such as CES and IFA, as a media designer at Thirtyseventy Digital. Currently working as a Unity developer at Kitchen Budapest on augmented reality projects."

exhibitionTitle = "Exhibitions"
exhibitionText = "Participated over a dozen various exhibitions since 2014. Created a data visualization of Europe, which was exhibited in Dresden, Prague, Budapest and Bratislava. Turbynes, a kinetic light installation, was exhibited at the National Gallery of Slovakia. My research in virtual reality was recently presented at the Bratislava Design Week."

#Store texts in arrays
textTitles = [monitorTitle, cardboardTitle, sketchTitle, macTitle, eduTitle, boxTitle, folderTitle, exhibitionTitle]
textContent = [monitorText, cardboardText, sketchText, macText, eduText, boxText, folderText, exhibitionText] 