const moodColors = ["#F40504", "#FF9C03", "#FBFB0D", "#72ED4C", "#00A358"];
const moodNumber = ["1", "2", "3", "4", "5"];
const fileNames = ["01-Saddest", "02-Sad", "03-Meh", "04-Happy", "05-Happiest"];
const durations = [5000, 10000, 15000];

/* App Key https://keyvalue.immanuel.co/ */
const appkey = "4arncai3";

var vid = document.getElementById("main-video");
const videoPath = "videos/";

var override = true;
var videoNum = 5;
var refreshRate = 5000;

var activeMoodBtn = "mood-btn-05";
var activeTimeBtn = "time-btn-01";

/*MAIN*/
document.addEventListener("DOMContentLoaded", function(event) { 
    //refreshAll();
    //document.getElementById('visitor-count').innerHTML = visitors;
    /*Dejarlo 2 minutos para que levante*/
    //setInterval(refreshAll, songDurations[mood-1]);
    //setInterval(refreshAll, 1000);
});

function refreshAll() {

}

/*Play init video*/
document.body.addEventListener("click", () => {
    vid.play();
})

/*Remote on click functions*/
/*$(".remote-btn").click(function() {
    if($(this).hasClass("active")) {
        $(this).removeClass("active");
    }
    else {
        $(this).addClass("active");
    }
});*/


$("#on-btn").click(function() {
    $("#off-btn").removeClass("active");
    override = true;
});
$("#off-btn").click(function() {
    $("#on-btn").removeClass("active");
    override = false;
});

function setParams(clickedId, index, btnType) {
    var btn = document.getElementById(clickedId);
    var activeBtn = "";

    if(btnType == 'mood') {
        activeBtn = activeMoodBtn;
    }
    if(btnType == 'time') {
        activeBtn = activeTimeBtn;
    }

    if (btn.classList.contains('active')) {
        btn.classList.remove("active");

        //if none is active, turn to defaults
        if(btnType == 'mood') {
            activeMoodBtn = "";
            videoNum = 5;
        }
        if(btnType == 'time') {
            activeTimeBtn = "";
            refreshRate = 5000;
        }
    }
    else {
        if(activeBtn) {
            var last = activeBtn.charAt(activeBtn.length - 1);

            document.getElementById(activeBtn).classList.remove("active");
        }
        btn.classList.add("active");
        
        if(btnType == 'mood') {
            activeMoodBtn = clickedId;
            videoNum = moodNumber[index];
        }
        if(btnType == 'time') {
            activeTimeBtn = clickedId;
            refreshRate = durations[index];
        }
    }
    console.log(activeTimeBtn);
    console.log(refreshRate);
    console.log(btnType);
}

/*Switchers*/
/*function moodChange(index) {    
    document.getElementById('mood-label').innerHTML = moodLabels[index];

    document.getElementById(moodId + moodNumber[index]).src= filePath + fileNames[index] + fileActive;

    document.getElementById(percentId + moodNumber[index]).style.fontWeight = "bold";
    document.getElementById(percentId + moodNumber[index]).style.color = "#000000";
    
    vid.src = videoPath + fileNames[index] + ".mp4";

}
function moodReset() {
    for(i=0;i<5;++i) {
        document.getElementById(moodId + moodNumber[i]).src= filePath + fileNames[i] + ".png";
        document.getElementById(percentId + moodNumber[i]).style.color = "#7F7F7F";
        document.getElementById(percentId + moodNumber[i]).style.fontWeight = "400";
    }
}*/



/*Andrey mods*/
async function myGet(itemkey) {
    const result = await $.ajax({
      url: "https://keyvalue.immanuel.co/api/KeyVal/GetValue/4arncai3/" + itemkey,
      type: 'GET'
    })
    return result
}

function getVisitors() {
    return myGet("override-value").then(function (result) {
      visitors = parseInt(result);
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
