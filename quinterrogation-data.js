function getImg(str){
    if(parent.getImageInGame(parent.currentIntegratedGame,str) === 403)
        return defaultImages.path+defaultImages[str]
    else
        return parent.getImageInGame(parent.currentIntegratedGame,str)
}

window.user = {};
user.credits = 205;
//this is the object which contains path for default text and images
defaultImages  ={}
defaultImages.path = "img/quinterrogation/";
defaultImages.game_logo = "game_logo.png";
defaultImages["qt-base-img"] = "background.jpg";
defaultImages["qt-player-img"] = "player.png";
defaultImages["qt-ai-img"] = "ai.png";


game = {};

game.ai = [
    {
        name: "AI1",
        brain: 1,
        heart: 2,
        hammer: 2,
        limit: 70
    },
    {
        name: "AI2",
        brain: 3,
        heart: 1,
        hammer: 1,
        limit: 75
    },
    {
        name: "AI3",
        brain: 2,
        heart: 3,
        hammer: 0,
        limit: 80
    }

];

