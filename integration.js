function getImg(str){
    return defaultImages.path+defaultImages[str]
    if(parent.getImageInGame(parent.currentIntegratedGame,str) === 403)
        return defaultImages.path+defaultImages[str]
    else
        return parent.getImageInGame(parent.currentIntegratedGame,str)
}

function getText(str){
    return defaultText[str]
    if(parent.getTextInGame(parent.currentIntegratedGame,str) === 403)
        return defaultText[str]
    else
        return parent.getTextInGame(parent.currentIntegratedGame,str)
}

window.getImg= getImg
window.getText = getText

//this is the object which contains path for default text and images
defaultImages  ={}
defaultImages.path = "img/";
defaultImages["qt-logo"] = "game_logo.png";
defaultImages["qt-background"] = "background.jpg";
defaultImages["qt-statement-back"] = "speech_bubble_1.png";
defaultImages["qt-options-back"] = "speech_bubble_2.png";
defaultImages["qt-player"] = "player.png";
defaultImages["qt-ai"] = "ai.png";
defaultImages["qt-say-this"] = "say_button.png";
defaultImages["qt-know-more"] = "know_more.png";
defaultImages["qt-left-opt-arrow"] = "leftOpt.png";
defaultImages["qt-right-opt-arrow"] = "rightOpt.png";
defaultImages["qt-meter-bar-bg"] = "meterbar_bg.png";
defaultImages["qt-meter-bar-filled"] = "meter_filled.png";
defaultImages["qt-bot-overlay"] = "bot_overlay.png";

defaultText = {};
defaultText["qt-meter-text"] = "mood";





window.defaultImages = defaultImages;
