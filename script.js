audio = document.getElementById("audio");
sfx = document.getElementById("sfx");
image = document.getElementById("avatar").firstChild;
left = document.getElementsByClassName("arrow-left");
right = document.getElementsByClassName("arrow-right");
num = document.getElementById("num");

const max_avatar = 4;
imagecurr = 1;

function loadMusic(){
    audio.setAttribute("src", "assets/music.mp3");
}

function image_left(){
    if(imagecurr>1){
        imagecurr--;
        image.setAttribute("src", "assets/animal" + imagecurr + "_1" + ".png");
    }
    else{
        imagecurr=max_avatar;
        image.setAttribute("src", "assets/animal" + imagecurr + "_1" + ".png");
    }
    num.firstChild.nodeValue = "(" + imagecurr + "/4)";
}

function image_right(){
    if(imagecurr<max_avatar){
        imagecurr++;
        image.setAttribute("src", "assets/animal" + imagecurr + "_1" + ".png");
    }
    else{
        imagecurr=1;
        image.setAttribute("src", "assets/animal" + imagecurr + "_1" + ".png");
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
    if (time >= 0 && time <= 10){
        a.innerHTML = "Good Morning " + myname + "!";
    }
    else if (time >= 11 && time <= 17){
        a.innerHTML = "Good Afternoon " + myname + "!";
    }
    else if (time >= 18 && time < 24){
        a.innerHTML = "Good Evening " + myname + "!";
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
    image.setAttribute("src", "assets/animal" + sessionStorage.getItem("avatar") + "_" + levelcurr + ".png");
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
const notif = document.getElementById("notif");
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

function startGame(){
    audio.setAttribute("src", "assets/game.mp3");
    notif.innerHTML = "Welcome owner!";
    var guide = document.getElementById("guideMenu");
    guide.parentNode.removeChild(guide);
    start = true;
    if(start){
        gameOver();
        gameEvent();
        updateStats();
        updateLevel();
        sleepButton.addEventListener("click", sleep);
        playButton.addEventListener("click", startPetGame);
        eatButton.addEventListener("click", eat);
        healButton.addEventListener("click", heal);
    }
}

function gameEvent(){
    setInterval(function(){
    if(lovemeter==0){
        if(!messageShown1){
            notif.innerHTML = "Your pet is getting bored, give it some love!";
            messageShown1 = true;
            depression = setInterval(function(){
            happiness -= Math.floor(Math.random() * 3) + 3;
            updateBars();
            if (lovemeter>=3 && messageShown1) {
                notif.innerHTML = "Your pet is no longer bored!";
                messageShown1 = false;
                clearInterval(depression);
            }
            }, 2000);
        }
    }
    
    if (energy <= 0 || hunger <= 0) {
        if(!messageShown2){
            medicineUsed = false;
            notif.innerHTML = "Your pet is getting sick, treat it well!";
            messageShown2 = true;
            crisis = setInterval(function(){
            health -= Math.floor(Math.random() * 3) + 3;
            updateBars();
            if (energy > 0 && hunger > 0 && medicineUsed && messageShown2) {
                notif.innerHTML = "Your pet is no longer sick!";
                messageShown2 = false;
                clearInterval(crisis);
            }
            }, 2000);
        }
    }}, 2000);
}

function gameOver(){
    gameOverShown = false;
    setInterval(function() {
    if (health <= 0 && !gameOverShown) {
        gameOverShown = true;
        alert("GAME OVER: Your pet has passed away :(");
        location.reload();
    }
    if (happiness <= 0 && !gameOverShown){
        gameOverShown = true;
        alert("GAME OVER: Your pet leaves you :(");
        location.reload();
    }
    }, 1000);
}

function updateLevel() {
    var level = document.getElementById("level");
    setInterval(function(){
        if(!gameOverShown){
            if(levelcurr<3){
                happiness += Math.floor(Math.random() * 4) + 5;
                health += Math.floor(Math.random() * 4) + 5;
                sfx.setAttribute("src", "assets/levelup.mp3");
                levelcurr++;
                level.innerHTML = "Level " + levelcurr;
                updateAvatar();
                notif.innerHTML = "Level UP!!!";
            }
            else if(levelcurr==3){
                happiness += Math.floor(Math.random() * 4) + 5;
                health += Math.floor(Math.random() * 4) + 5;
                sfx.setAttribute("src", "assets/levelup.mp3");
                levelcurr++;
                level.innerHTML = "Level MAX";
                notif.innerHTML = "Level UP!!!";
            }
            else{
                alert("GAME WON! Congratulations :)");
                location.reload();
            }
        }
    }, 40000);
}

//Status Bar
function updateBars() {
    energyBar.style.width = energy + "%";
    energyBar.innerText = energy + "%";
    happinessBar.style.width = happiness + "%";
    happinessBar.innerText = happiness + "%";
    hungerBar.style.width = hunger + "%";
    hungerBar.innerText = hunger + "%";
    healthBar.style.width = health + "%";
    healthBar.innerText = health + "%";

    if(hunger<=20){
        hungerBar.setAttribute("class", "fill-red");
    }
    else{
        hungerBar.setAttribute("class", "fill");
    }

    if(energy<=20){
        energyBar.setAttribute("class", "fill-red");
    }
    else{
        energyBar.setAttribute("class", "fill");
    }
    if(happiness<=20){
        happinessBar.setAttribute("class", "fill-red");
    }
    else{
        happinessBar.setAttribute("class", "fill");
    }
    if(health<=20){
        healthBar.setAttribute("class", "fill-red");
    }
    else{
        healthBar.setAttribute("class", "fill");
    }
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
            happiness -= Math.floor(Math.random() * 3) + 1;
        }
        if (levelcurr==2){
            energy -= Math.floor(Math.random() * 4) + 5;
            hunger -= Math.floor(Math.random() * 4) + 5;
            happiness -= Math.floor(Math.random() * 3) + 3;
            health -= Math.floor(Math.random() * 3) + 1;
        }
        if (levelcurr==3){
            energy -= Math.floor(Math.random() * 5) + 8;
            hunger -= Math.floor(Math.random() * 5) + 8;
            happiness -= Math.floor(Math.random() * 3) + 3;
            health -= Math.floor(Math.random() * 3) + 3;
        }

        if (levelcurr==4){
            energy -= Math.floor(Math.random() * 5) + 10;
            hunger -= Math.floor(Math.random() * 5) + 10;
            happiness -= Math.floor(Math.random() * 5) + 3;
            health -= Math.floor(Math.random() * 5) + 3;
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
        updateBars();
    }, 5000);
}
        
function sleep() {
    if(energy<100){
        sfx.setAttribute("src", "assets/sleep.mp3");
        energy += Math.floor(Math.random() * 11) + 15;
        hunger -= Math.floor(Math.random() * 6) + 10;
        if(lovemeter<3){
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
        notif.innerHTML = "Your pet isn't sleepy!";
    }
}
function eat() {
    if(hunger<100){
        sfx.setAttribute("src", "assets/eat.mp3");
        hunger += Math.floor(Math.random() * 11) + 15;
        health -= Math.floor(Math.random() * 4) + 5;
        if(lovemeter<3){
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
        notif.innerHTML = "Your pet is full!";
    }
}

function play() {
    energy -= Math.floor(Math.random() * 5) + 8;
    if(hunger<=15 || energy<=15){
        happiness += Math.floor(Math.random() * 11) + 5;
    }
    else{
        happiness += Math.floor(Math.random() * 6) + 20;
        hunger -= Math.floor(Math.random() * 5) + 8;
    }
    if(lovemeter<3){
        lovemeter += 3;
        if(lovemeter > 3){
            lovemeter == 3;
        }
    }
    if (energy < 0) {
        energy = 0;
    }
    if (happiness > 100){
        happiness = 100;
    }
    if (hunger < 0) {
        hunger = 0;
    }
    updateBars();
}

function heal() {
    if(cooldown==false){
        sfx.setAttribute("src", "assets/heal.mp3");
        health += Math.floor(Math.random() * 11) + 20;
        happiness -= Math.floor(Math.random() * 11);
        energy -= Math.floor(Math.random() * 6) + 15;
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
        notif.innerHTML = "You can only heal your pet once every 20 seconds!";
    }
}

//Play Game
//Initializing Variable
canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext('2d');
var isGameRunning = false;
var petX = 10;
var petY = 10;
var gridSize = 20;
var tileSize = 15;
var foodX = 15;
var foodY = 15;
var xVelocity = 0;
var yVelocity = 0;
var tail = 1;

function startPetGame() {
    for(i=0;i<3;i++){
        document.getElementsByClassName("avatarContainer")[i].style.display = "none";
    }
    sleepButton.style.display = "none";
    playButton.style.display = "none";
    eatButton.style.display = "none";
    healButton.style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    if(!isGameRunning){
        petGame = setInterval(game, 1000/15);
    }
}

// Fungsi untuk memulai permainan
function game() {
	// Check if the game is over
	if (tail > 3) {
		tail = 1;
		document.getElementById("gameContainer").style.display = "none";
        for(i=0;i<3;i++){
            sleepButton.style.display = "block";
            playButton.style.display = "block";
            eatButton.style.display = "block";
            healButton.style.display = "block";
            document.getElementsByClassName("avatarContainer")[i].style.display = "block";
        }
        play();
        clearInterval(petGame);
		return;
	}

	// Update posisi ular
	petX += xVelocity;
	petY += yVelocity;

	// Cek jika ular keluar dari layar
	if (petX < 0) {
		petX = gridSize - 1;
	} else if (petX > gridSize - 1) {
		petX = 0;
	} else if (petY < 0) {
		petY = gridSize - 1;
	} else if (petY > gridSize - 1) {
		petY = 0;
	}

	// Set background
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	// Set makanan
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);

	// Set ular
	canvasContext.fillStyle = 'green';
	canvasContext.fillRect(petX * tileSize, petY * tileSize, tileSize, tileSize);

	// Cek jika ular makan makanan
	if (foodX === petX && foodY === petY) {
		foodX = Math.floor(Math.random() * gridSize);
		foodY = Math.floor(Math.random() * gridSize);
		tail++;
	}

	// Set arah ular
	document.onkeydown = function(event) {
		switch (event.keyCode) {
			case 65:
				xVelocity = -1;
				yVelocity = 0;
				break;
			case 87:
				xVelocity = 0;
				yVelocity = -1;
				break;
			case 68:
				xVelocity = 1;
				yVelocity = 0;
				break;
			case 83:
				xVelocity = 0;
				yVelocity = 1;
				break;
		}
	}

	document.onkeyup = function(event) {
		switch (event.keyCode) {
			case 65:
				if (xVelocity === -1) {
					xVelocity = 0;
					yVelocity = 0;
				}
				break;
			case 87:
				if (yVelocity === -1) {
					xVelocity = 0;
					yVelocity = 0;
				}
				break;
			case 68:
				if (xVelocity === 1) {
					xVelocity = 0;
					yVelocity = 0;
				}
				break;
			case 83:
				if (yVelocity === 1) {
					xVelocity = 0;
					yVelocity = 0;
				}
				break;
		}
	};
}

