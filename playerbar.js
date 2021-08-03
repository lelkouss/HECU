

$(document).ready(function(){
    let heart = '<img src="./assets/hp_unit_filled.png" alt="player health" class = "heart">';
    let empty_heart = '<img src="./assets/hp_unit_empty.png" alt="player health" class = "heart">';

    let filled_core = '<img src="./assets/core_unit_filled.png" alt="collected cores" class = "cores pop-out"></img>';
    let empty_core = '<img src="./assets/core_unit_empty.png" alt="uncollected cores" class = "cores pop-out"></img>';

    window.updatePlayerHearts = () => {  //display hearts, call window.updatePlayerHearts() to refresh the player's hearts
        if(typeof player !== "undefined"){
            $("#player_health_container").empty();
            $("#player_health_container").append('<img src="./assets/hp_meter.png" alt="HP Meter" style="position: absolute; left: 15px; top: 30%; height: 50%; width: auto">');
            for (let i = 0; i < player.health; i++) {
                $("#player_health_container").append(heart);
            }
            let empty_hp = 10-player.health;
            for (let i = 0; i < empty_hp; i++) {
                $("#player_health_container").append(empty_heart);
            }
        }
    }

    window.updatePlayerCores = () => { //display cores, call window.updatePlayerCores() to refresh colleted cores
        if(typeof player !== "undefined"){
            $("#found_keys_container").empty();
            for (let i = 0; i < 0; i++) { //add filled cores
                $("#found_keys_container").append(filled_core);
            }
            let unfound_cores = 4 - 0;
            for (let i = 0; i < unfound_cores; i++) { //add unfilled cores
                $("#found_keys_container").append(empty_core);
            }
            $("#found_keys_container").append('<img src="./assets/core_meter.png" alt="core meter"  style = "position: absolute; right: 0px; top: 35%; height: 45%; width: auto"></img>'); //show core meter

        }
    }

    $('#btn-img-yes').click(function() { //reset the game on yes
        resetGame();
    })
    $('#btn-img-no').click(function() { //move back to the title screen on no
        console.log("object");
        $('#start-game').css('display', 'flex');
        $('#start-game').toggleClass('move-to-left');
        $('#score').empty() //hide score
        $('#game-over').hide();
        noLoop();
    })
    $('#start-btn').click(function(){ //start the game on title screen btn
        $('#start-game').toggleClass('move-to-left');
        $('#game-over').hide();
        loop();
    })
    $('#map-container').click(()=>{
        $('#canvas_div').toggleClass('pointer'); //change the cursor to a pointer
        display_map ? display_map = false : display_map = true; //show the map
    })

})

window.onload = function() {
    document.getElementById("game_audio").play();
}