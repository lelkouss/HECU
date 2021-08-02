

$(document).ready(function(){
    let heart = '<img src="./assets/player_heart.png" alt="player heart" class = "heart pop-out"></img>';
    //let keys = '<img src="./assets/keys.png" alt="collected keys" class = "keys pop-out"></img>';

    window.updatePlayerHearts = () => {  //display hearts, call window.updatePlayerHearts() to refresh the player's hearts
        if(typeof player !== "undefined"){
            $("#player_health_container").empty();
            for (let i = 0; i < player.hearts; i++) {
                $("#player_health_container").append(heart);
            }
        }
    }

    /*window.updatePlayerKeys = () => { //display hearts, call window.updatePlayerHearts() to refresh colleted keys
        if(typeof player !== "undefined"){
            $("#found_keys_container").empty();
            for (let i = 0; i < player.hearts; i++) {
                $("#player_health_container").append(heart);
            }
        }
    } */

    $('body').click(() => {
        $("#player_health_container").toggleClass('pop-in');
    });
})