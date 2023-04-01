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

//Variable Declaration
const pet = document.getElementById("avatar");
const energyBar = document.getElementById("energy-bar");
const happinessBar = document.getElementById("happiness-bar");
const hungerBar = document.getElementById("hunger-bar");
const healthBar = document.getElementById("health-bar");
const startButton = document.getElementById("start");
const sleepButton = document.getElementById("sleep");
const playButton = document.getElementById("play");
const eatButton = document.getElementById("eat");
const healButton = document.getElementById("heal");

var start = false;
var lovemeter = 3;
var cooldown = false;
var messageShown1 = false;
var messageShown2 = false;
var medicineUsed = false;
var levelcurr = 1;
    
let energy = 50;
let happiness = 50;
let hunger = 50;
let health = 50;
    
energyBar.style.width = energy + "%";
updateBars();

startButton.addEventListener("click", startGame);
sleepButton.addEventListener("click", sleep);
playButton.addEventListener("click", play);
eatButton.addEventListener("click", eat);
healButton.addEventListener("click", heal);

function startGame(){
    var guide = document.getElementById("guideMenu");
    guide.parentNode.removeChild(guide);
    start = true;
    if(start){
        updateStats();
        updateLevel();
    }
}

//Status Bar
function updateLevel() {
    var level = document.getElementById("level");
    setInterval(function() {
        levelcurr++;
        level.innerHTML = "Level " + levelcurr;
        alert("Level UP!");
    }, 40000);
}

function updateBars() {
    energyBar.style.width = energy + "%";
    energyBar.innerText = energy + "%";
    happinessBar.style.width = happiness + "%";
    happinessBar.innerText = happiness + "%";
    hungerBar.style.width = hunger + "%";
    hungerBar.innerText = hunger + "%";
    healthBar.style.width = health + "%";
    healthBar.innerText = health + "%";
}

function updatePet() {
    pet.style.backgroundColor = happiness >= 50 ? "orange" : "gray";
    pet.style.width = happiness / 2 + "px";
    pet.style.height = happiness / 2 + "px";
        
    energyBar.style.width = energy + "%";
    happinessBar.style.width = happiness + "%";
    hungerBar.style.width = hunger + "%";            
    healthBar.style.width = health + "%";
        
    energyBar.textContent = "Energy: " + energy;
    happinessBar.textContent = "Happiness: " + happiness;
    hungerBar.textContent = "Hunger: " + hunger;
    healthBar.textContent = "Health: " + health;
}   
        
function updateStats() {
    setInterval(function() {
        if (levelcurr==1){
            energy -= Math.floor(Math.random() * 3) + 3;
            hunger -= Math.floor(Math.random() * 3) + 3;
            happiness -= Math.floor(Math.random() * 4) + 1;
        }
        if (levelcurr==2){
            energy -= Math.floor(Math.random() * 4) + 5;
            hunger -= Math.floor(Math.random() * 4) + 5;
            happiness -= Math.floor(Math.random() * 4) + 3;
            health -= Math.floor(Math.random() * 4) + 1;
        }
        if (levelcurr==3){
            energy -= Math.floor(Math.random() * 5) + 8;
            hunger -= Math.floor(Math.random() * 5) + 8;
            happiness -= Math.floor(Math.random() * 4) + 3;
            health -= Math.floor(Math.random() * 4) + 3;
        }
        if (energy < 0){
            energy = 0;
        }
        if (happiness < 0){
            happiness = 0;
        }
        if (hunger < 0){
            hunger = 0;
        }
        if(lovemeter>0){
            lovemeter -= 1;
        }
        if(lovemeter==0){
            if(!messageShown1){
                alert("Your pet is getting bored, give it some love!");
                messageShown1 = true;
            }
            depression = setInterval(function(){
                happiness -= Math.floor(Math.random() * 2) + 2;
                updateBars();
                if (lovemeter>=3 && messageShown1) {
                    alert("Your pet is no longer bored!");
                    messageShown1 = false;
                    clearInterval(depression);
                }
                }, 2000);
        }
        updateBars();

        if (energy <= 0 || hunger <= 0) {
            if(!messageShown2){
                alert("Your pet is getting sick, treat it well!")
                messageShown2 = true;
            }
            crisis = setInterval(function(){
                health -= Math.floor(Math.random() * 2) + 2;
                updateBars();
                if (energy > 0 && hunger > 0 && medicineUsed && messageShown2) {
                    alert("Your pet is no longer sick!");
                    messageShown2 = false;
                    clearInterval(crisis);
                }
                }, 2000);
        }

        if (health <= 0) {
            alert("GAME OVER: Your pet has passed away :(");
            location.reload();
        }
        
        if (happiness <= 0){
            alert("GAME OVER: Your pet leaves you :(");
            location.reload();
        }
    }, 5000);
}
        
function sleep() {
    if(energy<100){
        energy += Math.floor(Math.random() * 11) + 15;
        hunger -= Math.floor(Math.random() * 11) + 15;
        if(lovemeter<=3){
            lovemeter++;
        }
        
        if (energy > 100) {
            energy = 100;
        }   
        if (hunger < 0){
            hunger = 0;
        }
        updateBars();
    }
    else{
        alert("Your pet isn't sleepy!");
    }
}
function eat() {
    if(hunger<100){
        hunger += Math.floor(Math.random() * 11) + 15;
        health -= Math.floor(Math.random() * 6) + 5;
        if(lovemeter<=3){
            lovemeter++;
        }
        if (hunger > 100) {
            hunger = 100;
        }
        if (health < 0) {
            health = 0;
        }
        updateBars();
    }
    else{
        alert("Your pet is full!")
    }
}

function play() {
    energy -= Math.floor(Math.random() * 11) + 10;
    happiness += Math.floor(Math.random() * 11) + 15;
    hunger -= Math.floor(Math.random() * 6) + 10;
    if(lovemeter<=3){
        lovemeter++;
    }

    if (energy < 0) {
        energy = 0;
    }
    if (happiness > 100) {
        happiness = 100;
    }
    if (hunger < 0) {
        hunger = 0;
    }
    updateBars();
}

function heal() {
    if(cooldown==false){
        health += Math.floor(Math.random() * 11) + 20;
        happiness += Math.floor(Math.random() * 11);
        energy -= Math.floor(Math.random() * 11) + 10;
        if(lovemeter<=5){
            lovemeter++;
        }
        if (health > 100) {
            health = 100;
        }
        if (happiness > 100) {
            happiness = 100;
        }
        if (energy < 0) {
            energy = 0;
        }
        updateBars();
        medicineUsed = true;
        cooldown=true;
        setTimeout(function() {
            medicineUsed = false;
            cooldown = false;
        }, 20000);
        }
    else{
        alert("You can only heal your pet once every 20 seconds!");
    }
}

    

