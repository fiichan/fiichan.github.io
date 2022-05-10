const moodColors = ["#F45453", "#FC9B21", "#FDCF3D", "#91E777", "#00C96C"];
const moodLabels = ["hated", "disliked", "didn't mind", "liked", "loved"];

const moodId = "mood-0";
const filePath = "img/moods/";
const fileNames = ["01-Saddest", "02-Sad", "03-Meh", "04-Happy", "05-Happiest"];
const fileActive = "-Active.png";

var vid = document.getElementById("main-video");
const videoPath = "videos/";

const appkey = "4arncai3";
var mood = 10;
var visitors = 2;

/*MAIN*/
document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById('visitor-count').innerHTML = visitors;
    visitors = getValue("visitors");
    alert(visitors);
    moodSwitch();
});

/*Play init video*/
document.body.addEventListener("click", () => {
    vid.play();
})

function moodBtn() {
    mood += 10;
    setInterval(moodSwitch(), 1000);
    //console.log(mood);
}

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
    document.getElementById(moodId + (index+1)).src= filePath + fileNames[index] + fileActive;
    document.getElementById("mood-cover").style.width = 100-mood + '%';
    vid.src = videoPath + fileNames[index] + ".mp4";
}

/*Key*/
var getValue = function (itemkey) {
    $.ajax({
        type: "GET",
        url: "https://keyvalue.immanuel.co/api/KeyVal/GetValue/" + appkey + "/" + itemkey,
        contentType: false,
        processData: false
    }).done(function (data) {
        //alert(data);
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