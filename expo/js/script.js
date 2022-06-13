const moodColors = ["#F40504", "#FF9C03", "#FBFB0D", "#72ED4C", "#00A358"];
const moodLabels = ["hated", "disliked", "didn't mind", "liked", "loved"];
const moodNumber = ["1", "2", "3", "4", "5"];

const moodId = "mood-0";
const percentId = "percent-0";
const filePath = "img/moods/";
const fileNames = ["01-Saddest", "02-Sad", "03-Meh", "04-Happy", "05-Happiest"];
const fileActive = "-Active.png";
const fileWhite = "-White.png";

var vid = document.getElementById("main-video");
const videoPath = "videos/";
const songDurations = [54000, 49000, 39000, 33000, 28000];

/* App Key https://keyvalue.immanuel.co/ */
const appkey = "4arncai3";
/* Vote variables = vote01, vote02, vote03, vote04, vote05 */
var mood = 3;
var visitors = 2;

var activeBtn = "";
var selectedVote = 0;


/* Votes */
var vote01 = 0;
var vote02 = 1;
var vote03 = 2;
var vote04 = 3;
var vote05 = 4;
var votes = [0,0,0,0,0];
var percentages = [0,0,0,0,0];

/*MAIN*/
document.addEventListener("DOMContentLoaded", function(event) { 
    refreshAll();
    document.getElementById('visitor-count').innerHTML = visitors;
    /*visitors = await myGet("visitors");
    alert(visitors);*/
    setInterval(refreshAll, 1000);
});

function refreshAll() {
    getVisitors();
    for(var i=0; i<5; ++i) {
        getVote(i);
    }
    //console.log(votes);
    document.getElementById('visitor-count').innerHTML = visitors;

    getMood();
    moodSwitch();
    moodPercentages();
    win();
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

/*Voting - Submit*/
function vote() {
    console.log("ActiveBtn " + selectedVote);
    myIncrement("visitors");
    myIncrement("vote0" + moodNumber[selectedVote]);
    getVote(selectedVote);
    //window.location.href = "thanks.html";
}

/*Voting - Mood Buttons*/
function moodBtn(clickedId, index) {
    var btn = document.getElementById(clickedId);
    selectedVote = index;
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
        $( "#" + clickedId + " div img").attr("src", filePath + fileNames[index] + fileActive);
        /*if(index == 0 || index == 4) {
            $( "#" + clickedId + " div img").attr("src", filePath + fileNames[index] + fileWhite);
        }*/
        activeBtn = clickedId;
    }

    document.getElementById("submit").classList.remove("hidden");
    if(!activeBtn) {
        document.getElementById("submit").classList.add("hidden");
    }
}

/* Define % and mood */
function win() {
    var max = Math.max(...votes);
    mood = moodNumber[votes.indexOf(max)];
    /*console.log({
        votes,
        mood
    });*/
}

/* Main Screen - Mood Functions*/
function moodSwitch() {
    if (mood == '1') {
        moodChange(0);
        //alert(1);
    }
    if (mood == '2') {
        moodChange(1);
        //alert(2);
    }
    if(mood == '3') {
        moodChange(2);
        //alert(3);
    }
    if (mood == '4') {
        moodChange(3);
        //alert(4);
    }
    if (mood == '5') {
        moodChange(4);
        //alert(5);
    }

}
function moodPercentages() {
    for(var i=0; i<5; ++i) {
        var calc = votes[i]*100 / visitors;

        if(calc%1 != 0) {
            percentages[i] = calc.toFixed(2);
        }
        else {
            percentages[i] = calc;
        }

        document.getElementById(percentId + moodNumber[i]).innerHTML = percentages[i] + "%";
    }
}

function moodChange(index) {
    moodReset();

    document.getElementById("mood-label").style.background = moodColors[index];

    /*if (index == 0 || index == 4) {
        document.getElementById("mood-label").style.color = "#FFFFFF";
    }
    if (index == 1 || index == 2 || index == 3) {
        document.getElementById("mood-label").style.color = "#000000";
    }*/

    document.getElementById("mood-label").style.color = "#000000";
    document.getElementById('mood-label').innerHTML = moodLabels[index];

    document.getElementById(moodId + moodNumber[index]).src= filePath + fileNames[index] + fileActive;

    document.getElementById(percentId + moodNumber[index]).style.fontWeight = "bold";
    document.getElementById(percentId + moodNumber[index]).style.color = "#000000";
    
    vid.src = videoPath + fileNames[index] + ".mp4";
}
function moodReset() {
    for(i=0;i<5;++i) {
        document.getElementById(moodId + moodNumber[i]).src= filePath + fileNames[i] + ".png";
        document.getElementById(percentId + moodNumber[i]).style.color = "#E3E3E3";
        document.getElementById(percentId + moodNumber[i]).style.fontWeight = "400";
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
      visitors = parseInt(result);
    });
}

function getMood() {
    return myGet("mood").then(function (result) {
      mood = parseInt(result);
    });
}


function getVote(index) {
    return myGet("vote0" + moodNumber[index]).then(function (result) {
        votes[index] = parseInt(result);
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