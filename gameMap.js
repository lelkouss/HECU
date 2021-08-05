let show_boss_room = false;

function drawMap(){

    let max_col = rooms[0].length;
    let center_x = 22;
    let center_y = 40;

    canvasBuffer.fill(0, 150);
    canvasBuffer.rect(0, 0, width, height);

    canvasBuffer.stroke(0);
    for (let [i, _rooms] of rooms.entries()) {
        for (const [j, room] of _rooms.entries()) {

            for(const visited_ of visited_rooms){
                if(room.id == visited_.id){
                    room.visited = true;
                }
            }

           if(room != undefined)
            room.visited ? canvasBuffer.fill(0, 100, 120) : canvasBuffer.fill(150);
        
            canvasBuffer.rect(j * 175/max_col + center_x, i * 175/max_col + center_y, 175/max_col, 175/max_col);   
            if(room == currentRoom){
                canvasBuffer.image(spritePlayerIcon, j * 175/max_col + 6 + center_x, i * 175/max_col + 6 + center_y, 13, 13)
            }

            if(room != undefined){ //draw doors to each room
                let room_doors = [...room.doors];
               canvasBuffer.noStroke(0);
                for(const [ii, room_door] of room_doors.entries()){
                    if(room_door.exists && room_door.available){
                        if(ii == 0){
                            canvasBuffer.fill(100, 0, 0);
                            canvasBuffer.rect(j * 175/max_col + center_x + 175/(2*max_col) - 5, i * 175/max_col + center_y, 10, 3);   
                        } else if(ii == 1){
                            canvasBuffer.fill(0, 0, 100);
                            canvasBuffer.rect(j * 175/max_col + center_x + 175/max_col - 3, i * 175/max_col + center_y + 175/(2*max_col) - 5, 3, 10);   
                        } else if(ii == 2){
                            canvasBuffer.fill(100, 0, 0);
                            canvasBuffer.rect(j * 175/max_col + center_x + 175/(2*max_col) - 5, i * 175/max_col + center_y + 175/(max_col) - 3, 10, 3);   
                        } else{
                            canvasBuffer.fill(0, 0, 100);
                            canvasBuffer.rect(j * 175/max_col + center_x, i * 175/max_col + center_y + 175/(2*max_col) - 5, 3, 10);   
                        }
                    }
                }
                canvasBuffer.stroke(0);

            }

            //teleport to a previously visited room
            if(mouseToMapTile(j * 175/max_col + center_x, i * 175/max_col + center_y, 175/max_col, 175/max_col, room) && mouseIsPressed && room != undefined){
                if(enemies.length == 0 && spawners.length == 0){
                    currentRoom = room;
                    bullets = [] //clear all bullets
                    player.room = currentRoom; // update player view of the room
                    doors = currentRoom.doors; //update the doors in the new room
                    player.x = doors[0].spawn_x;//set player spawn
                    player.y = doors[0].spawn_y;
                }
                display_map = false;
                
            }
        }
    }

    if(show_boss_room){ //show the boss on the map
        canvasBuffer.image(spriteBossIcon, 2 * 175/max_col + 6 + center_x, 6 + center_y, 13, 13);
    }

    image(canvasBuffer,0,0);
}

function mouseToMapTile(x, y, w, h, room){
    if(mouseX/3 > x && mouseX/3 < x+w && mouseY/3 > y && mouseY/3 < y+h){ //don't allow teleport after collecting all cores
        //draw spaceguy icon over the room
        if(room != undefined && room.visited && enemies.length == 0 && spawners.length == 0){ //!show_boss_room
            canvasBuffer.tint(255, 127);
            canvasBuffer.image(spritePlayerIcon, x + 6, y + 6, 13, 13);
            canvasBuffer.noTint(); //not having this will break the game
        }
        return true;
    }
    return false;
}

