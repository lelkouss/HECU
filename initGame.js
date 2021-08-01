 //push all rooms into the global rooms function

 //IMPORTANT
 //*rooms is a 4 by 7 array, init ID should mimic index
function initGame(){
    let tiles = [   [0, 0, 0, 0, 0, 0, 0], //room 1
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    let borders =  ["A_0", "B_1", "C_0", "D_0"];
    let spawner_info = [] //length = number of spawners, content = number of enemies in each spawner
   /*spawner_info = { 
        roomba: {
            num: 2,
            positions: [undefined, 22]
        },
        turret: {
            num: 2,
            positions: [22, 23]
        }
        ex3: {
            num: 3,
            positions: [undefined] //all positions are random
        }
    } */
    rooms[0][0] = new Room(0, tiles, borders); //first room cannot contain a spawner
    currentRoom = rooms[0][0];
    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 2
                    [0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = [2, 4, 7]; 
    rooms[0][1] = new Room(1, tiles, borders, spawner_info);
        
    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 3
                    [0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 1, 0, 1, 0],
                    [0, 1, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = [2, 4, 7];
    rooms[0][2] = new Room(2, tiles, borders, spawner_info);

    return rooms;
}

