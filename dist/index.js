"use strict";
var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');
var touchaudio = new Audio("se/pickup01.mp3");
var powupaudio = new Audio("se/powerup10.mp3");
var gameoveraudio = new Audio("se/nc137849.mp3");
var penaltyaudio = new Audio("se/魔王魂  レトロ22.mp3");
var bgmaudio = new Audio("se/New World (online-audio-converter.com).mp3");
var chargeaudio = new Audio("se/electric_chain.mp3");
var start = Date.now();
var penaltycou = 0;
var spacex = true;
var check = true;
function main() {
    context.transform(1, 0, 0, -1, 0, canvas.height);
    context.fillStyle = 'rgb(00,255,00)';
    setInterval(gameLoop, 4);
    document.addEventListener("keydown", KeyDownFunc);
    document.addEventListener("keyup", KeyUpFunc);
    document.addEventListener("keydown", KeyspacedownFunc);
    document.addEventListener("keyup", KeyspaceupFunc);
}
function gameLoop() {
    tick += 1;
    draw();
}
var tick = 0;
var box = new Box(new Vector(640, 360), 30, 30);
var boxVector = new Vector(-1, 0);
var player = new Box(new Vector(150, 285), 150, 30);
var npc = new Box(new Vector(1130, 210), 200, 30);
var block1 = new Box(new Vector(730, 540), 200, 30);
var block2 = new Box(new Vector(730, 0), 200, 30);
var speed = 1;
function draw() {
    bgmaudio.play();
    context.fillStyle = 'rgb(00,00,00)';
    context.fillRect(0, 0, 1280, 720);
    context.fillStyle = 'rgb(255,255,255)';
    box.location = box.location.add(boxVector);
    if (box.location.y >= 690) {
        boxVector = new Vector(boxVector.x, -boxVector.y);
    }
    if (box.location.y <= 0) {
        boxVector = new Vector(boxVector.x, -boxVector.y);
    }
    if (box.location.x >= 1250) {
        box.location = new Vector(640, 360);
        boxVector = new Vector(-1, 0);
        bgmaudio.pause();
        gameoveraudio.play();
        speed = 0;
        var end = Date.now();
        var timesec = (end - start + penaltycou * 5000) / 1000;
        alert("Congratulations！ タイムは" + timesec + "秒！\nその内、ペナルティは" + penaltycou * 5 + "秒!(味方ゴール1回につきペナルティ5秒)");
        location.reload();
    }
    if (box.location.x <= 0) {
        box.location = new Vector(640, 360);
        boxVector = new Vector(-1, 0);
        penaltyaudio.play();
        penaltycou = penaltycou + 1;
        speed = 0;
    }
    if (box.isAttatch(player)) {
        speed += 0.45;
        var dy = box.getCenter().y - player.getCenter().y;
        boxVector = new Vector(speed, 0);
        boxVector = boxVector.addRotation(dy * 0.5);
        touchaudio.play();
    }
    if (box.isAttatch(npc)) {
        speed += 0.5;
        var dy = box.getCenter().y - npc.getCenter().y;
        boxVector = new Vector(-speed, 0);
        boxVector = boxVector.addRotation(dy * 0.5);
        touchaudio.play();
    }
    if (box.isAttatch(block1)) {
        var dy = box.getCenter().y - block1.getCenter().y;
        boxVector = new Vector(-speed, 0);
        boxVector = boxVector.addRotation(dy * 0.5);
        touchaudio.play();
    }
    if (box.isAttatch(block2)) {
        var dy = box.getCenter().y - block2.getCenter().y;
        boxVector = new Vector(-speed, 0);
        boxVector = boxVector.addRotation(dy * 0.5);
        touchaudio.play();
    }
    if (upFlag == true) {
        if (!(player.location.y > 560)) {
            player.location = player.location.add(new Vector(0, 2.5));
        }
    }
    if (downFlag == true) {
        if (!(player.location.y < 0)) {
            player.location = player.location.add(new Vector(0, -2.5));
        }
    }
    // if(spaceFlag == true){
    //    if(spacex == true ){
    //    let playerbox1:Box = new Box(new Vector(player.location.x+100,player.location.y+150),150,30)
    //    if(box.isAttatch(playerbox1)){
    //       speed +=0.25;
    //       const dy = box.getCenter().y - playerbox1.getCenter().y
    //       boxVector = new Vector(speed,0.001)
    //       boxVector = boxVector.addRotation(dy*0.5)
    //       touchaudio.play();
    //    }
    //    let playerbox2:Box = new Box(new Vector(player.location.x+100,player.location.y-150),150,30)
    //    if(box.isAttatch(playerbox2)){
    //       speed +=0.25;
    //       const dy = box.getCenter().y - playerbox2.getCenter().y
    //       boxVector = new Vector(speed,0.001)
    //       boxVector = boxVector.addRotation(dy*0.5)
    //       touchaudio.play();
    //    }
    //    context.fillStyle = 'rgb(00,00,255)';
    //    playerbox1.fill(context);
    //    playerbox2.fill(context);
    //    powupaudio.play();
    //    var spaceFlagreset = function(){console.log("hogentyo"),spaceFlag = false; spacex =false; powupaudio.pause();};
    //    function hoge(x:boolean){
    //       if(x = true)
    //       setTimeout(spaceFlagreset, 5000);
    //       x = false;
    //    }
    //    setTimeout(spaceFlagreset, 5000);
    // }
    // }
    console.log(spaceFlag);
    console.log(spacex);
    if ((spaceFlag == true) && (spacex == true) && (check == true)) {
        spacex = false;
        check = false;
        var checking = function () { check = true; console.log("hoge"); };
        setTimeout(checking, 5000);
        var spaceFlagreset = function () { spacex = true; chargeaudio.play(); };
        setTimeout(spaceFlagreset, 12000);
    }
    if ((spacex == false) && (check == false)) {
        var playerbox1 = new Box(new Vector(player.location.x + 100, player.location.y + 150), 150, 30);
        if (box.isAttatch(playerbox1)) {
            speed += 0.25;
            var dy = box.getCenter().y - playerbox1.getCenter().y;
            boxVector = new Vector(speed, 0.001);
            boxVector = boxVector.addRotation(dy * 0.5);
            touchaudio.play();
        }
        var playerbox2 = new Box(new Vector(player.location.x + 100, player.location.y - 150), 150, 30);
        if (box.isAttatch(playerbox2)) {
            speed += 0.25;
            var dy = box.getCenter().y - playerbox2.getCenter().y;
            boxVector = new Vector(speed, 0.001);
            boxVector = boxVector.addRotation(dy * 0.5);
            touchaudio.play();
        }
        context.fillStyle = 'rgb(00,00,255)';
        playerbox1.fill(context);
        playerbox2.fill(context);
        powupaudio.play();
    }
    // function deletuptimer(){clearTimeout(upnpc2fun)};
    // function deletdowntimer(){clearTimeout(downnpc2fun)};
    // function upnpc2(){return npc2.location = npc2.location.add(new Vector(0,1))};
    // function downnpc2(){return npc2.location = npc2.location.add(new Vector(0,-1))};
    // let upnpc2fun = setInterval(upnpc2,1);
    // let downnpc2fun = setInterval(downnpc2,1);
    // while (true) {
    // upnpc2fun
    // setInterval(deletuptimer,5000)
    // downnpc2fun
    // setInterval(deletdowntimer,5000)
    // }
    if (npc.getCenter().y < box.location.y) {
        if (!(npc.location.y > 520)) {
            npc.location = npc.location.add(new Vector(0, 2));
        }
    }
    if (npc.getCenter().y > box.location.y) {
        if (!(npc.location.y < 0)) {
            npc.location = npc.location.add(new Vector(0, -2));
        }
    }
    ;
    // if(spacex == false){
    //    let spacexcharge = function(){spacex = true;};
    //    setTimeout(spacexcharge,10000);
    // };
    context.fillStyle = 'rgb(255,255,255)';
    box.fill(context);
    player.fill(context);
    npc.fill(context);
    context.fillStyle = 'rgb(255,00,00)';
    block1.fill(context);
    block2.fill(context);
    context.font = "35px serif";
    context.transform(1, 0, 0, -1, 0, canvas.height);
    var xstring = "spaceで分身発動 recharge..." + String(spacex);
    context.fillStyle = 'rgb(255,255,255)';
    context.fillText(xstring, 30, 50);
    context.transform(1, 0, 0, -1, 0, canvas.height);
}
var upFlag = false;
var downFlag = false;
var spaceFlag = false;
function KeyDownFunc(event) {
    if (event.keyCode == 38) {
        upFlag = true;
    }
    if (event.keyCode == 40) {
        downFlag = true;
    }
}
function KeyUpFunc(event) {
    if (event.keyCode == 38) {
        upFlag = false;
    }
    if (event.keyCode == 40) {
        downFlag = false;
    }
}
function KeyspacedownFunc(event) {
    if (event.keyCode == 32) {
        spaceFlag = true;
    }
}
function KeyspaceupFunc(event) {
    if (event.keyCode == 32) {
        spaceFlag = false;
    }
}
