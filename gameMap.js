function drawMap(){
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
        }
    }
    image(canvasBuffer,0,0);
}