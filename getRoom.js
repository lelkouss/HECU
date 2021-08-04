
function getRoom(room_ID, direction){

    let col = room_ID % 7; //compute the index of the current room
    let row = Math.floor(room_ID/7);
    let found_room = null;

    let dir_ = direction.toLowerCase();

    if(dir_ == "up" && row > 0){
        found_room = rooms[row-1][col];
    } else if(dir_ == "down" && row < 3){
        found_room = rooms[row+1][col];
    } else if(dir_ == "left" && col > 0){
        found_room = rooms[row][col-1];
    } else if(dir_ == "right" && col < 6){
        found_room = rooms[row][col+1];
    } else{
        console.log("INVALID DIRECTION IN getRoom()");
    }

    //return the current room if there is an issure with the found room (door should've be closed)
    return (found_room == undefined || found_room == null) ? rooms[row][col] : found_room;
}


function moveRooms(door){
    currentRoom = getRoom(currentRoom.id, door.direction); //change current room
    player.x = door.spawn_x;
    player.y = door.spawn_y;
    bullets = [] //clear all bullets
    player.room = currentRoom; // update player view of the room
    for(let room_spawner of currentRoom.spawners) //initialize the rooms enemies
        room_spawner.enemyList = initEnemies(room_spawner.enemies);
    spawners = currentRoom.spawners; //change spawners to the current rooms (deep clone)
    currentRoom.visited = true;
}