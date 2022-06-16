const moodColors = ["#F40504", "#FF9C03", "#FBFB0D", "#72ED4C", "#00A358"];
const moodLabels = ["Hated", "Disliked", "Didn't mind", "Liked", "Loved"];
const moodNumber = ["1", "2", "3", "4", "5"];
const fileNames = ["01-Saddest", "02-Sad", "03-Meh", "04-Happy", "05-Happiest"];

/* App Key https://keyvalue.immanuel.co/ */
const appkey = "4arncai3";

var vid = document.getElementById("main-video");
const videoPath = "videos/";

var override = true;

/*MAIN*/
document.addEventListener("DOMContentLoaded", function(event) { 
    //refreshAll();
    //document.getElementById('visitor-count').innerHTML = visitors;
    /*Dejarlo 2 minutos para que levante*/
    //setInterval(refreshAll, songDurations[mood-1]);
    //setInterval(refreshAll, 1000);
});

/*Play init video*/
document.body.addEventListener("click", () => {
    vid.play();
})

/*Remote on click functions*/
$("#on-btn").click(function() {
    $("#off-btn").removeClass("active");
    override = true;
});
$("#off-btn").click(function() {
    $("#on-btn").removeClass("active");
    override = false;
});

$(".remote-btn").click(function() {
    if($(this).hasClass("active")) {
        $(this).removeClass("active");
    }
    else {
        $(this).addClass("active");
    }
});


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
