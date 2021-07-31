function createDoors(borders) {
    let doors = [];
    for(const border of borders) {
        let door = new Door(border);
        if(door.exists) {
            doors.push(new Door(border));
        }
    }
    return doors;
}

class Door {
    constructor(border) {
        let array = border.split("_");

        switch(array[0]) {
            case "A":   this.direction = "up";
                        this.x = 97;
                        this.y = 0;
                        this.spawn_x = 97;
                        this.spawn_y = 150;
                        this.width = 25;
                        this.height = 22;
                break;
            case "B":   this.direction = "right";
                        this.x = 197;
                        this.y = 82;
                        this.spawn_x = 30;
                        this.spawn_y = 82;
                        this.width = 22;
                        this.height = 20;
                break;
            case "C":   this.direction = "down";
                        this.x = 97;
                        this.y = 162;
                        this.spawn_x = 97;
                        this.spawn_y = 23;
                        this.width = 25;
                        this.height = 20;
                break;
            case "D":   this.direction = "left";
                        this.x = 0;
                        this.y = 82;
                        this.spawn_x = 187;
                        this.spawn_y = 82;
                        this.width = 22;
                        this.height = 20;
                break;
        }

        (array[1] == "0") ? this.exists = false : this.exists = true;
        this.available = true;
    }
}