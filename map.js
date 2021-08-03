function drawMap(){
    initGame();
    console.log(rooms);
    for (const room of rooms) {
        console.log(room);
        room.display();
    }
    noLoop();
}