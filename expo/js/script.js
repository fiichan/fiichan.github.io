const moodColors = ["#F40504", "#FF9C03", "#FBFB0D", "#72ED4C", "#00A358"];
const moodLabels = ["hated", "disliked", "didn't mind", "liked", "loved"];
const moodNumber = ["1", "2", "3", "4", "5"];

const moodId = "mood-0";
const percentId = "percent-0";
const filePath = "img/moods/";
const fileNames = ["01-Saddest", "02-Sad", "03-Meh", "04-Happy", "05-Happiest", "06-Loading"];
const fileActive = "-Active.png";
const fileWhite = "-White.png";

var vid = document.getElementById("main-video");
const videoPath = "videos/";
const songDurations = [54000, 49000, 39000, 33000, 28000, 1000];

/* App Key https://keyvalue.immanuel.co/ */
const appkey = "4arncai3";
/* Vote variables = vote01, vote02, vote03, vote04, vote05 */
var mood = 6;
var visitors = 2;

var activeBtn = "";
var selectedVote = 0;

var override = false;
var mute = false;
var loading = "";
var view = "";


/* Votes */
var votes = [0,0,0,0,0];
var loadVotesDone = 0;
var percentages = [0,0,0,0,0];

var time = 5;
var done = false;

/*MAIN*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", function(event) {
    refreshAll();
    document.getElementById("text-tie").classList.add("hidden");
    refreshAll();
    document.getElementById("text-tie").classList.add("hidden");


    //document.getElementById('visitor-count').innerHTML = visitors;
    //sleep(1000);
    //loading = setInterval(loadingScreen, 500);
    //loading = setInterval(load, 500);


    //view = setInterval(refreshAll, songDurations[time]);
    //view = setInterval(refreshAll, 500);
    //sleep(5000);
    //clearInterval(view);
    view = setInterval(overrideSwitch, 1000);
    view = setInterval(myload, 1000);
    mutestate = setInterval(setSound, 1000);
    //view = setInterval(refreshAll, songDurations[mood-1]);
    //setInterval(refreshAll, 1000);
});

function myload() {
    /*if(loadVotesDone == 15) {
        console.log('it1', loadVotesDone);
        document.getElementById("visitor-count").classList.add("hidden");
    }
    if(loadVotesDone == 20) {
        console.log('it2', loadVotesDone);

        document.getElementById("percent-row").classList.remove("hidden");
        document.getElementById("visitor-count").classList.remove("hidden");
    }*/

    if (mood === 6) {
        return;
    }
    clearInterval(view);
    refreshAll();
    view = setInterval(refreshAll, songDurations[mood-1]);
}

function overrideSwitch() {
    getOverride();
    if(override == true && window.location.pathname.includes('index')) {
        window.location.href = "override.html";
    }
}

//NO ME TOQUES ESTA FUNCION
function loadingScreen() {
    if(loadVotesDone == 10) {
        document.getElementById("text-tie").classList.add("hidden");
        console.log('not done', loadVotesDone);
        vid.src = videoPath + fileNames[5] + ".mp4";
    }
    if(loadVotesDone == 15) {
        console.log('it2', loadVotesDone);
        document.getElementById("loading-text").classList.add("hidden");
        document.getElementById("text-tie").classList.add("hidden");

        document.getElementById("text").classList.remove("hidden");
        document.getElementById("face-row").classList.remove("hidden");
    }
    if(loadVotesDone >= 20) {
        console.log('done', loadVotesDone);
        document.getElementById("percent-row").classList.remove("hidden");
        done = true;
        clearInterval(loading);
    }
}

function refreshAll() {
    getVisitors();
    for(var i=0; i<5; ++i) {
        getVote(i);
    }
    document.getElementById('visitor-count').innerHTML = visitors;

    moodSwitch();

    moodPercentages();
    win();

    vid.play();
}
/*function refreshAll() {
    Promise.all([getVisitors, getMood]).then(values => {
      visitors = values[0];
      mood = values[1];
      moodSwitch();
    });
}*/

function setSound() {
    getMute();

    if(vid.muted === mute) {
        return
    }

    vid.play();
    console.log(mute);
    if(mute == true) {
        vid.muted = true;
    }
    if(mute == false) {
        vid.muted = false;
    }
}

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
    window.location.href = "thanks.html";
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
    var index = votes.indexOf(max);

    mood = moodNumber[index];
    tie(max, index);
}

function tie(max, winner) {
    var tie = false;

    for(var i=winner+1; i<5; ++i) {
        if(votes[i] == max) {
            tie = true;
        }
    }

    if(tie) {
        document.getElementById("text-tie").classList.remove("hidden");
    }
    if(!tie) {
        document.getElementById("text-tie").classList.add("hidden");
    }

}

/* Main Screen - Mood Functions*/
function moodSwitch() {
    if (mood == '1' || mood == 1) {
        moodChange(0);
    }
    if (mood == '2' || mood == 2) {
        moodChange(1);
    }
    if(mood == '3' || mood == 3) {
        moodChange(2);
    }
    if (mood == '4' || mood == 4) {
        moodChange(3);
    }
    if (mood == '5' || mood == 5) {
        moodChange(4);
    }

}
function moodPercentages() {
    var reducer = (accumulator, curr) => { 
        return accumulator + curr
    };
    var totalVotes = votes.reduce(reducer);

    for(var i=0; i<5; ++i) {
        var calc = votes[i]*100 / totalVotes;
        //var calc = votes[i]*100 / visitors;
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

    //document.getElementById("mood-label").style.color = "#000000";
    document.getElementById("mood-label").style.color = "#ffffff";
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
        loadVotesDone += 1;
        //console.log(loadVotesDone);
    });
}

function getOverride() {
    return myGet("override").then(function (result) {
      override = (result === 'true');
    });
}

function getMute() {
    return myGet("mute").then(function (result) {
      mute = (result === 'true');
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