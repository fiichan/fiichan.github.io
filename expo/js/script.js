const moodColors = ["#F45453", "#FC9B21", "#FDCF3D", "#91E777", "#00C96C"];
const moodLabels = ["hated", "disliked", "didn't mind", "liked", "loved"];

const moodId = "mood-0";
const filePath = "img/moods/";
const fileNames = ["01-Saddest", "02-Sad", "03-Meh", "04-Happy", "05-Happiest"];
const fileActive = "-Active.png";
const fileWhite = "-White.png";

var vid = document.getElementById("main-video");
const videoPath = "videos/";

/* App Key https://keyvalue.immanuel.co/ */
const appkey = "4arncai3";
var mood = 100;
var visitors = 2;

var activeBtn = "";

/*MAIN*/
document.addEventListener("DOMContentLoaded", function(event) { 
    refreshAll();
    document.getElementById('visitor-count').innerHTML = visitors;
    /*visitors = await myGet("visitors");
    alert(visitors);*/
    setInterval(refreshAll, 5000);

});

function refreshAll() {
    getVisitors();
    document.getElementById('visitor-count').innerHTML = visitors;

    getMood();
    moodSwitch();
}
/*function refreshAll() {
    Promise.all([getVisitors, getMood]).then(values => {
      visitors = values[0];
      mood = values[1];
      moodSwitch();
    });
}*/

/*Play init video*/
document.body.addEventListener("click", () => {
    vid.play();
})

/*Voting - Mood Buttons*/
function moodBtn(clickedId, index) {
    var btn = document.getElementById(clickedId);

    if (btn.classList.contains('active')) {
        btn.classList.remove("active");
        $( "#" + clickedId + " div img").attr("src", filePath + fileNames[index] + fileActive);
        activeBtn = "";
    }
    else {
        if(activeBtn) {
            var last = activeBtn.charAt(activeBtn.length - 1);
            $( "#" + activeBtn + " div img").attr("src", filePath + fileNames[last-1] + fileActive);


            document.getElementById(activeBtn).classList.remove("active");
        }
        btn.classList.add("active");
        $( "#" + clickedId + " div img").attr("src", filePath + fileNames[index] + fileWhite);
        activeBtn = clickedId;
    }

    document.getElementById("submit").classList.remove("hidden");
    if(!activeBtn) {
        document.getElementById("submit").classList.add("hidden");
    }
}

/* Main Screen - Mood Functions*/
function moodSwitch() {
    if (mood <= 20) {
        moodChange(0);
    }
    if (mood > 20 && mood <= 40) {
        moodChange(1);
    }
    if(mood > 40 && mood <= 60) {
        moodChange(2);
    }
    if (mood > 60 && mood <= 80) {
        moodChange(3);
    }
    if (mood >= 80 && mood <= 100) {
        moodChange(4);
    }

}

function moodChange(index) {
    document.getElementById("mood-label").style.color = moodColors[index];
    document.getElementById('mood-label').innerHTML = moodLabels[index];

    moodReset();
    document.getElementById(moodId + (index+1)).src= filePath + fileNames[index] + fileActive;
    document.getElementById("mood-cover").style.width = 100-mood + '%';
    
    vid.src = videoPath + fileNames[index] + ".mp4";
}
function moodReset() {
    for(i=0;i<5;++i) {
        document.getElementById(moodId + (i+1)).src= filePath + fileNames[i] + ".png";
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
  
async function myIncrement(itemkey) {
    const result = await $.ajax({
      url: "https://keyvalue.immanuel.co/api/KeyVal/ActOnValue/4arncai3/" + itemkey + "/Increment",
      type: 'POST'
    })
    return result
}

function getVisitors() {
    return myGet("visitors").then(function (result) {
      visitors = result;
    });
}

function getMood() {
    return myGet("mood").then(function (result) {
      mood = result;
    });
}

/*Key Original Functions*/
var getValue = function (itemkey) {
    $.ajax({
        type: "GET",
        url: "https://keyvalue.immanuel.co/api/KeyVal/GetValue/" + appkey + "/" + itemkey,
        contentType: false,
        processData: false
    }).done(function (data) {
        //visitors = data;
        //alert(visitors);
        return data;
    }).fail(function(err){

    });
}
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