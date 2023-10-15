const torchButton = document.querySelector(".torch-outter");
const lightBehindPhone = document.querySelector(".light-behind-phone");
const insideBorder = document.querySelector(".inside-border");
const outsideBorder = document.querySelector(".outside-border");
const cameraButton = document.querySelector(".camera-outter");
const imageContainer = document.querySelector(".imageContainer");
const screen = document.querySelector(".screen");
const buttonOffOn = document.querySelector(".button-on")
const bottomLine = document.getElementById("bottomLineCam2");

// Real time and date

function updateTimeAndDate() {
  const currentTimeElement = document.getElementById("currentTime");
  const currentDateElement = document.getElementById("currentDate");

  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const currentTime = `${hours}:${minutes}`;

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = daysOfWeek[now.getDay()];
  const dayOfMonth = now.getDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[now.getMonth()];
  const currentDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

  currentTimeElement.textContent = currentTime;
  currentDateElement.textContent = currentDate;
}

updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);


// Torch

let isTorchOn = false;

function toggleTorch() {

  isTorchOn = !isTorchOn;

  setTimeout(() => {
  lightBehindPhone.classList.toggle("luz", isTorchOn);
  }, 70);
  
  insideBorder.classList.add("overflow", isTorchOn);
  imageContainer.classList.add("display", isTorchOn);
  torchButton.classList.toggle("active", isTorchOn);
}

torchButton.addEventListener("click", toggleTorch);



// Cam

let isCamOn = false;

function toggleCam() {
  
  isCamOn = !isCamOn;
  
  insideBorder.classList.remove("overflow", isTorchOn);
  imageContainer.classList.remove("display", isTorchOn);
  torchButton.classList.remove("active");
  imageContainer.classList.remove("closecam");
  screen.classList.remove("screentoright");
  isTorchOn = false;
  

  setTimeout(() => {
    imageContainer.classList.add("opencam");
    screen.classList.add("screentoleft");
  }, 100);
}

cameraButton.addEventListener("click", toggleCam);



// Menu

function goToMenu() {
  imageContainer.classList.add("closecam");
  screen.classList.add("screentoright");
  imageContainer.classList.remove("opencam");
  screen.classList.remove("screentoleft");
  isCamOn = false
}

bottomLine.addEventListener("click", goToMenu);



// Off/On

let isPhoneOff = false;
let isTurningOn = false; 

function toggleOff() {
  if (isTurningOn) {
    return; 
  }

  isPhoneOff = !isPhoneOff;

  outsideBorder.classList.toggle("off", isPhoneOff);
  screen.classList.toggle("off", isPhoneOff);
  imageContainer.classList.toggle("off", isPhoneOff);

  if (isPhoneOff) {
    isTurningOn = true;
    setTimeout(() => {
      imageContainer.classList.add("closecam");
      screen.classList.add("screentoright");
      imageContainer.classList.remove("opencam");
      screen.classList.remove("screentoleft");
    }, 500);
    setTimeout(() => {
      isCamOn = false;
      isTurningOn = false;
    }, 1000);
  }
}

buttonOffOn.addEventListener("click", toggleOff);



//-------------------CAMERA --------------------------

const videoElement = document.getElementById("videoElement");
let firstInteractionDone = false;



function handleZoom(event) {
	const zoomLevel = parseFloat(event.target.getAttribute("data-zoom"));
	document.querySelector(
		".imageContainer video"
	).style.transform = `scale(${zoomLevel})`;
	document
		.querySelectorAll(".controls button")
		.forEach((btn) => btn.classList.remove("active"));
	event.target.classList.add("active");
}

document.querySelectorAll("button[data-zoom]").forEach((button) => {
	button.addEventListener("click", handleZoom);
});

document.querySelector(".switchCamera").addEventListener("click", function () {
  if (!firstInteractionDone) {
    videoElement.play();
    firstInteractionDone = true;
  }

  var isWebcam = videoElement.getAttribute("data-iswebcam") === "true";
  videoElement.classList.add("flipping-out");
  videoElement.onanimationend = () => {
    if (videoElement.srcObject) {
      const tracks = videoElement.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    
    if (isWebcam) {
          videoElement.setAttribute("data-iswebcam", "false");
          videoElement.classList.remove("flipping-out");
          videoElement.classList.add("flipping-in");
          videoElement.play();
        
    }  else {
            videoElement.setAttribute("data-iswebcam", "true");
            videoElement.classList.remove("flipping-out");
            videoElement.classList.add("flipping-in");
    }

    videoElement.onanimationend = () => {
      videoElement.classList.remove("flipping-in");
    };
  };
});



document.querySelector(".camerabutton").addEventListener("click", function () {
	var flashElement = document.querySelector(".flash");
	flashElement.classList.add("shutterClick");
	flashElement.addEventListener("animationend", function () {
		flashElement.classList.remove("shutterClick");
	});
	let canvas = document.createElement("canvas");
	canvas.width = videoElement.videoWidth;
	canvas.height = videoElement.videoHeight;

	let ctx = canvas.getContext("2d");
	ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  setTimeout(() => {
    let thumbnailDataURL = canvas.toDataURL("image/jpeg");

    let thumbnailImage = document.querySelector(".thumbnail img");
    thumbnailImage.src = thumbnailDataURL;
  }, 500);
	
});


// Tab out

document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
      e.preventDefault();
  }
});