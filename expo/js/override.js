const moodColors = ["#F40504", "#FF9C03", "#FBFB0D", "#72ED4C", "#00A358"];
const moodNumber = ["1", "2", "3", "4", "5"];
const durations = [5000, 10000, 15000];

const filePath = "img/moods/";
const moodId = "mood-0";
const fileNames = ["01-Saddest", "02-Sad", "03-Meh", "04-Happy", "05-Happiest"];
const fileActive = "-Active.png";

/* App Key https://keyvalue.immanuel.co/ */
const appkey = "4arncai3";

var vid = document.getElementById("main-video");
const videoPath = "videos/";

/* Server variables
overrideVideo = [0,1,2,3,4] -> videoIndex
override = true/false
change = true/false
*/

var override = true;
var change = false;
var videoIndex = 4;
var prevVid = videoIndex;
var activeMoodBtn = "mood-btn-05";

/*MAIN*/
document.addEventListener("DOMContentLoaded", function(event) {
    refreshAll();
    setInterval(refreshAll, 1000);
});

function refreshAll() {
    getOverride();
    if(override == false && window.location.pathname.includes('override')) {
        console.log('override off');
        window.location.href = "index.html";
    }
    
    getChange();

    if(change) {
        getVideo();
        if (videoIndex === prevVid) {
            return
        }
        moodChange(videoIndex);
        console.log({
            videoIndex, change, override, prevVid
        })

        change = false;
        myUpdate('change', false);
    }
}

/*Play init video*/
document.body.addEventListener("click", () => {
    vid.play();
})

/*Remote on click functions*/
function overrideOn() {
    document.getElementById("on-btn").classList.add("active");
    document.getElementById("off-btn").classList.remove("active");

    override = true;
    myUpdate("override", "true");
    console.log(override);
}
function overrideOff() {
    document.getElementById("off-btn").classList.add("active");
    document.getElementById("on-btn").classList.remove("active");

    override = false;
    myUpdate("override", "false");
    console.log(override);
}

function setParams(clickedId, index) {
    var btn = document.getElementById(clickedId);
    var activeBtn = "";

    activeBtn = activeMoodBtn;

    if (btn.classList.contains('active')) {
        btn.classList.remove("active");

        activeMoodBtn = "";
        videoIndex = "";
    }
    else {
        if(activeBtn) {
            document.getElementById(activeBtn).classList.remove("active");
        }
        btn.classList.add("active");
        
        activeMoodBtn = clickedId;
        videoIndex = index;
    }
    //console.log(activeTimeBtn);
    //console.log(refreshRate);
    //console.log(btnType);
}

function submitMood() {
    myUpdate('overrideVideo', videoIndex);
    myUpdate('change', true);
}

/*Switchers*/
function moodChange(index) {
    moodReset();
    

    document.getElementById(moodId + moodNumber[index]).src = filePath + fileNames[index] + fileActive;    
    vid.src = videoPath + fileNames[index] + ".mp4";
    console.log({
        index, 'src': vid.src
    })
}
function moodReset() {
    for(i=0;i<5;++i) {
        document.getElementById(moodId + moodNumber[i]).src = filePath + fileNames[i] + ".png";
    }
}



/*Andrey mods*/
async function myGet(itemkey) {
    const result = await $.ajax({
      url: "https://keyvalue.immanuel.co/api/KeyVal/GetValue/4arncai3/" + itemkey,
      type: 'GET'
    })
    return result
}

function getOverride() {
    return myGet("override").then(function (result) {
      override = (result === 'true');
    });
}
function getChange() {
    return myGet("change").then(function (result) {
      change = (result === 'true');
    });
}
function getVideo() {
    return myGet("overrideVideo").then(function (result) {
        prevVid = videoIndex;
        videoIndex = parseInt(result);
    });
}

async function myUpdate(itemkey, value) {
    const result = await $.ajax({
      url: "https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/4arncai3/" + itemkey + '/' + value,
      type: 'POST'
    })
    return result
}

/*Original*/
var updateValue = function (itemkey, itemval) {
    $.ajax({
        type: "POST",
        url: "https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/" + appkey + "/" + itemkey + "/" + itemval,
        contentType: false,
        processData: false
    }).done(function (data) {

    }).fail(function(err){
                    
    });
}
var actOnValue = function (itemkey, action) {
    $.ajax({
        type: "POST",
        url: "https://keyvalue.immanuel.co/api/KeyVal/ActOnValue/" + appkey + "/" + itemkey + "/" + action,
        contentType: false,
        processData: false
    }).done(function (data) {

    }).fail(function(err){
                    
    });
}
