objects=[];
video="";
status1="";

function preload(){
    song=loadSound('67560^alarma.mp3');
    video=createCapture(620,300);
    video.hide();
}
function setup(){
    canvas=createCanvas(480, 380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(status1 !="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            

            fill("#FF0000");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " "+ percent + "%", objects[i].x + 15, objects[i].y +15 );
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[0].label =="person"){
                document.getElementById("number_of_objects").innerHTML="Baby Found";
                }
                else{
                    song.play();
                    song.rate(1);
                    
                    if(objects[0].label=="person"){
                        song.stop();
                    }
                }
        }

        
    }

}
function start(){
    objectDetector =ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status1=true;

}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}