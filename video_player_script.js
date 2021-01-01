console.log("Video Player Extension Loading...");

/**
 * Autoplay fullscreen
 */

 /**
  * Skiping Intro
  */

/**
 * Skipping Outro
 */

var video = document.getElementById("player0");

//var introStart = 31; //HARDCODED FOR NOW, need to have a database storing all the episodes
//var introLength = 90;

video.addEventListener('loadeddata', function() {
	//createSnapshotFromBlob();
});


/*
video.addEventListener('seeked', function() {

    // now video has seeked and current frames will show
    // at the time as we expect
	setTimeout(createSnapshot(), 1000);

    // when frame is captured increase, here by 5 seconds
    i += 5;

    // if we are not passed end, seek to next interval
    if (i <= this.duration) {
        // this will trigger another seeked event
        this.currentTime = i;
    }
    else {
        // Done!, next action
    }
});
*/

//document.createElement('canvas').getContext('2d').drawImage(video, 0, 0, 1920, 1080);

//guestbook-name -> Username
//guestbook-body -> Comment
//
/*
async function createSnapshotFromBlob(){
	 let blob = await fetch(video.src).then(r => r.blob());
	 let reader = new FileReader();
	 reader.readAsDataURL(blob);
	 reader.onloadend = function() {
     let base64data = reader.result;                
     //console.log(base64data);
 }
}

function createSnapshot() {    
	var canvas = document.createElement('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	var ctx = canvas.getContext('2d'); 
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL("image/png");
	//console.log(dataURL);
	//seekOpeningImage(dataURL);
}

function seekOpeningImage(dataURL) {
	//console.log('Comparing Images...');
}



/*
//This work for skipping intro
skip_intro_once = true; //if you want to skip_intro_once 

video.addEventListener("timeupdate", checkTimeSkip, false);


function checkTimeSkip(event) 
{
	console.log("timeupdate event fired!: currentTime = "+video.currentTime+"skip_intro_once="+skip_intro_once);
     if (event.type == "timeupdate" && video.currentTime >= 10 && video.currentTime <= 11) {
		 createSnapshot();
		 skip_intro_once = false
     }
}
*/
