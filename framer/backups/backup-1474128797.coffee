{VRComponent, VRLayer} = require "VRComponent"
{TextLayer} = require 'TextLayer'
{AudioPlayer} = require "audio"

#document.body.style.cursor = "none"

#BG cubemap initialisation
# vrBackground = new VRComponent
#  	front: "images/front_bg.jpg"
#  	right: "images/right_bg.jpg"
#  	left: "images/left_bg.jpg"
#  	back: "images/back_bg.jpg"
#  	bottom: "images/bottom_bg.jpg"
#  	top: "images/top_bg.jpg"


#Foreground cubemap initialisation
vrForeground = new VRComponent
	front: "images/front_room.jpg"
	right: "images/right_room.png"
	left: "images/left_room.jpg"
	back: "images/back_room.jpg"
	bottom: "images/bottom_room.jpg"
	top: "images/top_room.png"
	perspective: 800
	heading: 0
	elevation: -15


#Set BG position to default
# vrBackground.perspective = 750
# vrBackground.heading = 0
# vrBackground.elevation = -15

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
	
# vrTooltipBooks = new VRLayer
# 	heading: 53
# 	elevation: -8.4
	
vrTooltipBox = new VRLayer
	heading: 73.5
	elevation: -20.1
	
vrTooltipFolders = new VRLayer
	heading: 82.5
	elevation: 2
	
# vrTooltipGamepad = new VRLayer
# 	heading: -144
# 	elevation: -27.4
	
vrTooltipExhbition = new VRLayer
	heading: -131
	elevation: 11


#Create array from tooltips
vrTooltips = [vrTooltipMonitor, vrTooltipCardboard, vrTooltipSketch, vrTooltipMac, vrTooltipEdu, vrTooltipBox, vrTooltipFolders, vrTooltipExhbition]

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


#Define reticle animation
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

tapSound = new AudioPlayer
	audio: "audio/click_natural.mp3"

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
		
# 		vrBackground.heading = heading 
# 		vrBackground.elevation = elevation 
# 		vrBackground.perspective = 750
		
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

#On window resize we make sure the vr component fills the entire screen
window.onresize = ->
	vrForeground.size = Screen.size
	vrBackground.size = Screen.size
	vrBackground.heading = vrForeground.heading 
	vrBackground.elevation = vrForeground.elevation 
	reticle.center()

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

monitorTitle = "Development skills"
monitorText = "Experienced in prototyping of interfaces and interactions. Built several production ready applications utilising knowledge in C#, Java and Javascript. Working alongside developers have shipped production ready software."

cardboardTitle = "Design Practices in VR"
cardboardText = "Designed and developed a VR app for Google Cardboard, exploring interaction principles for virtual reality. The project was exhibited during the Bratislava Design Week, and received the Discovery of the Year Award of 2016."

sketchTitle = "Articles and Lectures"
sketchText = "Published an article on best practices for designing non-tracked VR experiences. The article was republished under uxdesign.cc and received a great exposure to the design community. Lectured on VR and AR design workflow at the Bratislava based Lab."

macTitle = "Tools"
macText = "Designed and built experiences for both 3D and 2D environments using Unity, Framer, Sketch and Cinema4D. Alongside digital tools, strongly focuses on hand-sketching and wireframes."

eduTitle = "Education"
eduText = "Graduated at the Media Lab of the Academy of Fine Arts and Design in Slovakia. Spent a scholarship semester at the Munich Academy of Applied Sciences, studying interaction design, focusing on tacit knowledge and building contextual interfaces."

# bookTitle = "Books"
# bookText = "A grass-plains wryneck climbs upon a male yak-cattle hybrid that was donated under Islamic law."

boxTitle = "Hardware skills"
boxText = "Built various physical installations composed of motors, sensors and other electronics using microcontrollers. Cooperated with artists, helping them to materialise their ideas."

folderTitle = "Work experience"
folderText = "Worked as a UI designer on the home connect applications of Siemens and Electrolux at Alice in Tokyo. Designed and built interactive installations for trade shows such as CES and IFA, as a media designer at Thirtyseventy Digital. Currently working as a Unity developer at Kitchen Budapest on augmented reality projects."

# gamepadTitle = "Gamepad"
# gamepadText = "European bison of a shrubby African plain make digital image files of Semitic letters from valley wrynecks."

exhibitionTitle = "Exhibitions"
exhibitionText = "Participated on 14 various exhibitions since 2014. Created a data visualisation of Europe, which was exhibited in Germany, Czech Republic, Hungary and Slovakia. Turbynes, a kinetic light installation, was exhibited at the National Gallery of Slovakia. Recently, his research in virtual reality was presented at the Bratislava Design Week."

textTitles = [monitorTitle, cardboardTitle, sketchTitle, macTitle, eduTitle, boxTitle, folderTitle, exhibitionTitle]
textContent = [monitorText, cardboardText, sketchText, macText, eduText, boxText, folderText, exhibitionText] 