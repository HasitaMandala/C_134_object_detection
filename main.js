img = "";
status = "";
objects = [];

function preload(){
img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting object";
}

function modelLoaded(){
console.log("modelLoaded");
status = true;
objectDetector.detect(video, gotResult);
}

function draw(){
image(video, 0, 0, 380, 380);

if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML = "Status: Object detected";
document.getElementById("number_of_objects").innerHTML = "Number of object detected are: " + objects.length;
    fill(r, g, b);
    percent = floor(objects[i].confidence*100);
    text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
    noFill();
    stroke(r, g ,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}
}
}

function gotResult(error, results){
if(error){
    console.log(error);
}
console.log(results);
objects = results;
}