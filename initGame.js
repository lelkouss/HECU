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
    rooms[0][0] = new Room(0, tiles, borders); //!DO NOT GIVE THE FIRST ROOM A SPAWNER (CURRENT ROOM MUST BE INITIALIZED)
    currentRoom = rooms[0][0];

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 2
                    [0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { //*undefined = random tile, position is by tile id, undefined as last = remaining enemies are given a random tile
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 2, positions: [] },
            Drops: {hp_drop: 6, core_drop: 1}, //*drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 1, positions: [undefined] },
            Drops: {hp_drop: 4, core_drop: 1},
        },
    }
    rooms[0][1] = new Room(1, tiles, borders, spawner_info);
        
    tiles = [       [0, 0, 0, 0, 0, 0, 1], //room 3
                    [0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 1, 0, 1, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{
            Roomba: { num: 5, positions: [0, undefined] },
            Turret: { num: 0, positions: [] },
            Drops: {hp_drop: 2, core_drop: 4},
        },
        wave_2:{
            Roomba: { num: 6, positions: [undefined] },
            Turret: { num: 0, positions: [undefined] }, 
            Drops: {hp_drop: 1, core_drop: 1},
        },
        wave_3:{
            Roomba: { num: 5, positions: [0, 1, 2, 3, 4] },
            Turret: { num: 7, positions: [undefined] }, 
            Drops: {hp_drop: 7, core_drop: 0},
        },
    }
    rooms[0][2] = new Room(2, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 4
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[0][3] = new Room(3, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 5
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[0][4] = new Room(4, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 6
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[0][5] = new Room(5, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 7
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[0][6] = new Room(6, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 8
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[1][0] = new Room(7, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 9
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[1][1] = new Room(8, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 10
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[1][2] = new Room(9, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 11
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[1][3] = new Room(10, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 12
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[1][4] = new Room(11, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 13
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[1][5] = new Room(12, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 14
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[1][6] = new Room(13, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 15
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[2][0] = new Room(14, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 16
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[2][1] = new Room(15, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 17
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[2][2] = new Room(16, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 18
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[2][3] = new Room(17, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 19
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[2][4] = new Room(18, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 20
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[2][5] = new Room(19, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 21
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[2][6] = new Room(20, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 22
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[3][0] = new Room(21, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 23
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[3][1] = new Room(22, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 24
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[3][2] = new Room(23, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 25
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[3][3] = new Room(24, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 26
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[3][4] = new Room(25, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 27
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[3][5] = new Room(26, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 28
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[3][6] = new Room(27, tiles, borders, spawner_info);

    return rooms;
}

