function drawMap(){
$('#canvas_div').addClass('pointer');

    let max_col = rooms[0].length;
    let max_row = rooms.length;

    canvasBuffer.fill(255);
    canvasBuffer.stroke(0);
    for (let [i, _rooms] of rooms.entries()) {
        for (const [j, room] of _rooms.entries()) {
            //console.log(i * max_col, j * max_row, width/max_col, height/max_row);
            if(room != undefined)
                room.visited ? canvasBuffer.fill(0, 100, 100) : canvasBuffer.fill(200);
            canvasBuffer.rect(j * 219/max_col, i * 184/max_row, 219/max_col, 184/max_row);   
            if(room == currentRoom){
                canvasBuffer.image(spritePlayerIcon, j * 219/max_col + 6, i * 184/max_row + 12.5, 20, 20)
            }
            //teleport to a previously visited room
            if(mouseToMapTile(j * 219/max_col, i * 184/max_row, 219/max_col, 184/max_row, room) && mouseIsPressed && room != undefined && room.visited && enemies.length == 0 && spawners.length == 0){
                currentRoom = room;
                bullets = [] //clear all bullets
                spawners = [];
                enemies = []; 
                player.room = currentRoom; // update player view of the room
                doors = currentRoom.doors; //update the doors in the new room
            }
        }
    }

    image(canvasBuffer,0,0);
}

function mouseToMapTile(x, y, w, h, room){
    if(mouseX/3 > x && mouseX/3 < x+w && mouseY/3 > y && mouseY/3 < y+h){
        //draw spaceguy icon over the room
        if(room != undefined && room.visited){
            canvasBuffer.tint(255, 127);
            canvasBuffer.image(spritePlayerIcon, x + 6, y + 12.5, 20, 20)
            canvasBuffer.tint(255, 255);
        }
        return true;
    }
    return false;
}

