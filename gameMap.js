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

           if(room != undefined) //color rooms based on whether they've been visited
            room.visited ? canvasBuffer.fill(0, 100, 120) : canvasBuffer.fill(150);
        
            canvasBuffer.rect(j * 175/max_col + center_x, i * 175/max_col + center_y, 175/max_col, 175/max_col);   

            for(const visited_ of visited_rooms){ //show the visited rooms
                if(room.id == visited_.id){
                    room.visited = true;

                    for(let ii = 0; ii < room.drops.length; ii++){
                        if(room.drops[ii] instanceof Core){
                            canvasBuffer.image(spriteCoreDrop, j * 175/max_col + center_x + 6, i * 175/max_col + center_y + 6, 13, 13)
                            ii = room.drops.length;
                        } else if(room.drops[ii] instanceof Syringe){
                            canvasBuffer.image(spriteSyringeDrop, j * 175/max_col + center_x + 6, i * 175/max_col + center_y + 6, 13, 13)
                            ii = room.drops.length;
                        }
                    }


                    canvasBuffer.noStroke(0);
                    canvasBuffer.fill(0);
                    for(const [ii, room_door] of room.doors.entries()){ //draw the doors connecting visited rooms
                        room_door.available = true;
                        if(room_door.exists && room_door.available){
                            if(ii == 0){
                                canvasBuffer.rect(j * 175/max_col + center_x + 175/(2*max_col) - 2.5, i * 175/max_col + center_y, 5, 1.5);   
                            } else if(ii == 1){
                                canvasBuffer.rect(j * 175/max_col + center_x + 175/max_col - 1.5, i * 175/max_col + center_y + 175/(2*max_col) - 2.5, 1.5, 5);   
                            } else if(ii == 2){
                                canvasBuffer.rect(j * 175/max_col + center_x + 175/(2*max_col) - 2.5, i * 175/max_col + center_y + 175/(max_col) - 1.5, 5, 1.5);   
                            } else{
                                canvasBuffer.rect(j * 175/max_col + center_x, i * 175/max_col + center_y + 175/(2*max_col) - 2.5, 1.5, 5);   
                            }
                        }
                    }
                    canvasBuffer.stroke(0);
                }
            }

            if(room == currentRoom){ //draw player icon on current room
                canvasBuffer.image(spritePlayerIcon, j * 175/max_col + 6 + center_x, i * 175/max_col + 6 + center_y, 13, 13)
            }

            //teleport to a previously visited room
            if(mouseToMapTile(j * 175/max_col + center_x, i * 175/max_col + center_y, 175/max_col, 175/max_col, room) && mouseIsPressed && room.visited && room != undefined && !show_boss_room){
                if(enemies.length == 0 && spawners.length == 0){
                    if(visited_rooms.indexOf(currentRoom) == -1){
                        visited_rooms.push(currentRoom);
                    }
                    currentRoom = room;
                    bullets = [] //clear all bullets
                    player.room = currentRoom; // update player view of the room
                    doors = currentRoom.doors; //update the doors in the new room
                    player.x = doors[0].spawn_x;//set player spawn
                    player.y = doors[0].spawn_y;
                }
                $('#canvas_div').toggleClass('pointer'); //change the pointer back to crosshair
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
        if(room != undefined && room.visited && enemies.length == 0 && spawners.length == 0 && !show_boss_room){ //!show_boss_room
            canvasBuffer.tint(255, 127);
            canvasBuffer.image(spritePlayerIcon, x + 6, y + 6, 13, 13);
            canvasBuffer.noTint(); //not having this will break the game
        }
        return true;
    }
    return false;
}

