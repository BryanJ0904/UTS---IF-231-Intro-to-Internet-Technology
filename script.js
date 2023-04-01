image = document.getElementById("avatar").firstChild;
left = document.getElementsByClassName("arrow-left");
right = document.getElementsByClassName("arrow-right");
num = document.getElementById("num");

const max_avatar = 4;
imagecurr = 1;

function image_left(){
    if(imagecurr>1){
        imagecurr--;
        image.setAttribute("src", "assets/animal" + imagecurr + ".png");
    }
    else{
        imagecurr=max_avatar;
        image.setAttribute("src", "assets/animal" + imagecurr + ".png");
    }
    num.firstChild.nodeValue = "(" + imagecurr + "/4)";
}

function image_right(){
    if(imagecurr<max_avatar){
        imagecurr++;
        image.setAttribute("src", "assets/animal" + imagecurr + ".png");
    }
    else{
        imagecurr=1;
        image.setAttribute("src", "assets/animal" + imagecurr + ".png");
    }
    num.firstChild.nodeValue = "(" + imagecurr + "/4)";
}

function addName() {
    var name = document.getElementById("name").value;
    sessionStorage.setItem("name", name);
}

function addAvatar(){
    sessionStorage.setItem("avatar", imagecurr);
}

function updateName(){
    var myname = sessionStorage.getItem("name");
    var time = sessionStorage.getItem("time");
    a = document.getElementById("myname");
    if (time >= 4 && time <= 10){
        a.innerHTML = "Good Morning " + myname + "!";
    }
    else if (time >= 11 && time <= 14){
        a.innerHTML = "Good Afternoon " + myname + "!";
    }
    else if (time >= 15 && time <= 17){
        a.innerHTML = "Good Evening " + myname + "!";
    }
    else if ((time >= 18 && time <= 24) || time <= 3){
        a.innerHTML = "Good Night " + myname + "!";
    }
}

function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    sessionStorage.setItem("time", hours);
    var minutes = now.getMinutes();
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    var timeString = hours + ":" + minutes;
    document.getElementById("time").innerHTML = timeString;
  }

function updateAvatar(){
    var avatar = document.getElementById("avatar").firstChild;
    avatar.setAttribute("src", "assets/animal" + sessionStorage.getItem("avatar") + ".png");
}

function addValue(){
    addName();
    addAvatar();
}

function updateValue(){
    updateTime();
    updateName();
    updateAvatar();
}