 //*rooms is a 4 by 7 array, init ID should mimic index
 function initGame(){
    let tiles = [   [0, 0, 0, 0, 0, 0, 0], //room 1
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    let borders =  ["A_0", "B_1", "C_1", "D_0"];
    spawner_info = { 
        wave_1:{
            Roomba: { num: 4, positions: [22, 24, 42, 44] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0},
        },
    }
    rooms[0][0] = new Room(0, tiles, borders, spawner_info); //!DO NOT GIVE THE FIRST ROOM A SPAWNER (CURRENT ROOM MUST BE INITIALIZED)
    currentRoom = rooms[0][0];

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 2
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_0", "B_1", "C_0", "D_1"];
    spawner_info = {
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 4, positions: [23, 32, 34, 43] },
            Mantis: { num: 0, positions: [] },
            Drone: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //*drops must be listed last
        },
    }
    rooms[0][1] = new Room(1, tiles, borders, spawner_info);
        
    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 3
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_0", "B_0", "C_0", "D_1"];
    rooms[0][2] = new Room(2, tiles, borders);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 4 - core room
                    [0, 1, 1, 0, 1, 1, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 1, 1, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_0", "B_1", "C_1", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 1, positions: [22] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 4, positions: [0, 6, 60, 66] },
            Drops: {hp_drop: 2, core_drop: 0},
        },
        wave_3:{
            Roomba: { num: 4, positions: [] },
            Turret: { num: 4, positions: [22, 24, 42, 44] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 18, core_drop: 1},
        },
    }
    rooms[0][3] = new Room(3, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 5
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_0", "B_0", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 2, positions: [] },
            Turret: { num: 4, positions: [22, 24, 42, 44] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 2, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[0][4] = new Room(4, tiles, borders, spawner_info);

    tiles = [       [1, 1, 0, 0, 0, 1, 1], //room 6  - core room
                    [1, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 1],
                    [1, 1, 0, 0, 0, 1, 1] ];
    borders =      ["A_0", "B_1", "C_0", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 4, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drone: { num: 0, positions: [] },
            Drops: {hp_drop: 2, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 3, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0},
        },
        wave_3:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [] },
            Mantis: { num: 2, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1},
        },
    }
    rooms[0][5] = new Room(5, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 7
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_0", "B_0", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 2, positions: [] },
            Turret: { num: 2, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 2, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[0][6] = new Room(6, tiles, borders, spawner_info);

    tiles = [       [1, 1, 0, 0, 0, 1, 1], //room 8
                    [1, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 1],
                    [1, 1, 0, 0, 0, 1, 1] ];
    borders =      ["A_1", "B_1", "C_1", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 2, positions: [51, 55] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[1][0] = new Room(7, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 9
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_0", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 4, positions: [0,6,60,66] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 4, positions: [22, 24, 42, 44] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0},
        },
    }
    rooms[1][1] = new Room(8, tiles, borders, spawner_info);

    tiles = [       [1, 1, 0, 0, 0, 1, 1], //room 10
                    [1, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 1],
                    [1, 1, 0, 0, 0, 1, 1] ];
    borders =      ["A_0", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 3, positions: [23, 32, 34, 43] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 4, positions: [11, 15, 51, 55] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 0, core_drop: 0},
        },
    }
    rooms[1][2] = new Room(9, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 11
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_0", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 4, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 0, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 3, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0},
        },
    }
    rooms[1][3] = new Room(10, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 12
                    [0, 0, 0, 0, 0, 1, 0],
                    [0, 1, 1, 0, 0, 1, 0],
                    [0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_1", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 2, positions: [] },
            Turret: { num: 2, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 4, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0},
        },
    }
    rooms[1][4] = new Room(11, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 13
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_0", "B_1", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 2, positions: [] },
            Drops: {hp_drop: 2, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[1][5] = new Room(12, tiles, borders, spawner_info);

    tiles = [       [1, 1, 0, 0, 0, 1, 1], //room 14
                    [1, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 1],
                    [1, 1, 0, 0, 0, 1, 1] ];
    borders =      ["A_1", "B_0", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 4, positions: [] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 2, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[1][6] = new Room(13, tiles, borders, spawner_info);

    tiles = [       [1, 1, 0, 0, 0, 0, 0], //room 15 - L
                    [0, 0, 0, 1, 0, 1, 0],
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 1, 0, 0, 1, 0],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 1, 0, 0, 0, 0, 1] ];
    borders =      ["A_1", "B_0", "C_1", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 3, positions: [] },
            Turret: { num: 2, positions: [undefined] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[2][0] = new Room(14, tiles, borders, spawner_info);

    tiles = [       [1, 1, 1, 0, 1, 1, 1], //room 16 - L
                    [1, 0, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 1, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 0, 1, 1, 1] ];
    borders =      ["A_1", "B_0", "C_1", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 1, positions: [] },
            Turret: { num: 1, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 3, positions: [] },
            Turret: { num: 2, positions: [undefined] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[2][1] = new Room(15, tiles, borders, spawner_info);

    tiles = [       [0, 0, 1, 0, 0, 0, 0], //room 17 - core room
                    [0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 1] ];
    borders =      ["A_1", "B_0", "C_0", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 3, positions: [] },
            Turret: { num: 0, positions: [] },
            Mantis: { num: 1, positions: [] },
            Drone: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 3, positions: [] },
            Turret: { num: 3, positions: [undefined] },
            Mantis: { num: 0, positions: [] }, 
            Drone: { num: 1, positions: [] },
            Drops: {hp_drop: 2, core_drop: 1}, //drops must be listed last

        },
    }
    rooms[2][2] = new Room(16, tiles, borders, spawner_info);

    tiles = [       [0, 0, 1, 0, 0, 1, 0], //room 18 - L
                    [0, 0, 0, 1, 0, 0, 0],
                    [1, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0, 1, 0] ];
    borders =      ["A_1", "B_0", "C_1", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 3, positions: [undefined] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 3, positions: [] },
            Turret: { num: 2, positions: [undefined] }, 
            Drops: {hp_drop: 2, core_drop: 0}, //drops must be listed last

        },
    }
    rooms[2][3] = new Room(17, tiles, borders, spawner_info);

    tiles = [       [1, 0, 0, 0, 0, 0, 0], //room 19 - L
                    [0, 0, 0, 1, 0, 1, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0, 0, 1],
                    [0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_0", "C_1", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [undefined] },
            Mantis: { num: 2, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 4, positions: [undefined] },
            Drops: {hp_drop: 2, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[2][4] = new Room(18, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 20  
                    [0, 1, 1, 0, 1, 1, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 1, 1, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_0", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 6, positions: [] },
            Turret: { num: 0, positions: [undefined] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 6, positions: [] },
            Turret: { num: 2, positions: [undefined] },
            Drops: {hp_drop: 2, core_drop: 0}, //drops must be listed last
 
        },
    }
    rooms[2][5] = new Room(19, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 21 - L
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 1, 0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0],
                    [0, 1, 0, 1, 0, 0, 1],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_0", "C_1", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [undefined] },
            Mantis: { num: 3, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 2, positions: [] },
            Turret: { num: 2, positions: [undefined] }
        },
    }
    rooms[2][6] = new Room(20, tiles, borders, spawner_info);

    tiles = [       [1, 1, 1, 0, 0, 1, 1], //room 22 - L
                    [0, 0, 1, 0, 1, 0, 0],
                    [0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 1],
                    [0, 0, 0, 0, 0, 0, 1] ];
    borders =      ["A_1", "B_1", "C_0", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 2, positions: [] },
            Turret: { num: 0, positions: [undefined] },
            Mantis: { num: 2, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 1, positions: [] },
            Turret: { num: 2, positions: [undefined] }, 
            Mantis: { num: 3, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0 },
        },
    }
    rooms[3][0] = new Room(21, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 23 - L 
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_0", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 6, positions: [] },
            Turret: { num: 0, positions: [undefined] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 2, positions: [undefined] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[3][1] = new Room(22, tiles, borders, spawner_info);

    tiles = [       [1, 1, 0, 0, 0, 0, 1], //room 24 - L
                    [1, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [1, 0, 0, 0, 0, 1, 1] ];
    borders =      ["A_0", "B_1", "C_0", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 1, positions: [] },
            Turret: { num: 2, positions: [undefined] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 2, positions: [] },
            Turret: { num: 2, positions: [undefined] }, 
            Mantis: { num: 0, positions: [] }, 
            Drops: {hp_drop: 1, core_drop: 0}, 
        },
        wave_3:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [undefined] }, 
            Mantis: { num: 3, positions: [] }, 
            Drops: {hp_drop: 1, core_drop: 0}, 
        },
    }
    rooms[3][2] = new Room(23, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 25 - L
                    [0, 0, 0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 1, 0, 0, 1, 0],
                    [0, 1, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_1", "C_0", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 1, positions: [] },
            Turret: { num: 1, positions: [undefined] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 0, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 2, positions: [] },
            Turret: { num: 2, positions: [undefined] }, 
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 0, core_drop: 0}, //drops must be listed last
        },
        
        wave_3:{
            Roomba: { num: 3, positions: [] },
            Turret: { num: 3, positions: [undefined] }, 
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 0, core_drop: 0}, //drops must be listed last
        },
        wave_4:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [undefined] }, 
            Mantis: { num: 2, positions: [] },
            Drops: {hp_drop: 2, core_drop: 0},
        },
    }
    rooms[3][3] = new Room(24, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 26 - L
                    [0, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_0", "C_0", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 1, positions: [] },
            Turret: { num: 0, positions: [undefined] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [undefined] },
            Mantis: { num: 4, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last

        },
    }
    rooms[3][4] = new Room(25, tiles, borders, spawner_info);

    tiles = [       [0, 0, 1, 1, 0, 0, 0], //room 27 - L
                    [0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0],
                    [1, 0, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 1, 1, 0] ];
    borders =      ["A_0", "B_1", "C_0", "D_0"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 2, positions: [] },
            Turret: { num: 2, positions: [undefined] },
            Mantis: { num: 0, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
        wave_2:{
            Roomba: { num: 3, positions: [] },
            Turret: { num: 1, positions: [undefined] }
        },
        wave_3:{ 
            Roomba: { num: 0, positions: [] },
            Turret: { num: 0, positions: [undefined] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0}, //drops must be listed last
        },
    }
    rooms[3][5] = new Room(26, tiles, borders, spawner_info);

    tiles = [       [0, 0, 0, 0, 0, 0, 0], //room 28  - core room
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0, 0, 0],
                    [0, 0, 1, 0, 0, 0, 0] ];
    borders =      ["A_1", "B_0", "C_0", "D_1"];
    spawner_info = { 
        wave_1:{ 
            Roomba: { num: 1, positions: [] },
            Turret: { num: 4, positions: [undefined] },
            Mantis: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 0 }, //drops must be listed last
        },

        wave_2:{
            Roomba: { num: 3, positions: [] },
            Turret: { num: 3, positions: [undefined] }, 
            Mantis: { num: 0, positions: [] }, 
            Drops: {hp_drop: 0, core_drop: 0}, //drops must be listed last
        },
        wave_3:{
            Roomba: { num: 2, positions: [] },
            Turret: { num: 1, positions: [undefined] }, 
            Mantis: { num: 2, positions: [] },
        },
        wave_4:{
            Drone: { num: 1, positions: [] },
            Drops: {hp_drop: 1, core_drop: 1}, //drops must be listed last
        },
    }
    rooms[3][6] = new Room(27, tiles, borders, spawner_info);

    return rooms;
}

