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
    rooms[0][0] = new Room(0, tiles, borders); //DO NOT GIVE THE FIRST ROOM A SPAWNER (CURRENT ROOM MUST BE INITIALIZED)
    currentRoom = rooms[0][0];

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 2
                    [0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { //create spawner
        wave_1:{
            Roomba: { //name of enemy class
            num: 3, //number of enemies
            positions: [0, undefined] //undefined == random tile, undefined as last = randomize pos of remaining objects
            },
            Turret: {
                num: 1,
                positions: [3] //position is by tile id
            }},
        wave_2:{
            Roomba: {
                num: 2,
                positions: [undefined]
                },
            Turret: {
                num: 2,
                positions: [undefined]
            }},
    }
    rooms[0][1] = new Room(1, tiles, borders, spawner_info);
        
    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 3
                    [0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 1, 0, 1, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{
            Roomba: { 
            num: 1, 
            positions: [0, undefined] 
            },
            Turret: {
                num: 0,
                positions: []
            }},
        wave_2:{
            Roomba: {
                num: 6,
                positions: [undefined]
                },
            Turret: {
                num: 0,
                positions: [undefined]
            }},
        wave_3:{
            Roomba: {
                num: 5,
                positions: [0, 1, 2, 3, 4]
                },
            Turret: {
                num: 7,
                positions: [undefined]
            }},
    }
    rooms[0][2] = new Room(2, tiles, borders, spawner_info);

    return rooms;
}

