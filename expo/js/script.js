const moodColors = ["#F45453", "#FC9B21", "#FDCF3D", "#91E777", "#00C96C"];
const moodLabels = ["hated", "disliked", "didn't mind", "liked", "loved"];

const moodId = "mood-0";
const percentId = "percent-0";
const filePath = "img/moods/";
const fileNames = ["01-Saddest", "02-Sad", "03-Meh", "04-Happy", "05-Happiest"];
const fileActive = "-Active.png";
const fileWhite = "-White.png";

var vid = document.getElementById("main-video");
const videoPath = "videos/";

/* App Key https://keyvalue.immanuel.co/ */
const appkey = "4arncai3";
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
    for(var i=0; i<5; ++i) {
        getVote(i);
    }
    console.log(votes);
    document.getElementById('visitor-count').innerHTML = visitors;

    getMood();
    moodSwitch();
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
    myIncrement("vote0" + (selectedVote + 1));
    getVote(selectedVote);
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
        $( "#" + clickedId + " div img").attr("src", filePath + fileNames[index] + fileWhite);
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
    mood = votes.indexOf(max) + 1;
    console.log({
        votes,
        mood
    });
}

/* Main Screen - Mood Functions*/
function moodSwitch() {
    if (mood == 1) {
        moodChange(0);
    }
    if (mood == 2) {
        moodChange(1);
    }
    if(mood == 3) {
        moodChange(2);
    }
    if (mood == 4) {
        moodChange(3);
    }
    if (mood == 5) {
        moodChange(4);
    }

}

function moodChange(index) {
    moodReset();

    document.getElementById("mood-label").style.color = moodColors[index];
    document.getElementById('mood-label').innerHTML = moodLabels[index];

    document.getElementById(percentId + (index+1)).style.color = moodColors[index];
    document.getElementById(moodId + (index+1)).src= filePath + fileNames[index] + fileActive;
    /*document.getElementById("mood-cover").style.width = 100-mood + '%';*/
    
    vid.src = videoPath + fileNames[index] + ".mp4";
}
function moodReset() {
    for(i=0;i<5;++i) {
        document.getElementById(moodId + (i+1)).src= filePath + fileNames[i] + ".png";
        document.getElementById(percentId + (i+1)).style.color = "#E3E3E3";
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
    return myGet("vote0" + (index + 1)).then(function (result) {
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