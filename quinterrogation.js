
var base        = new Environment("base");
var meterBar    = new Environment("meterBar");
var meterOverlay = new Environment("meterOverlay");
var msg         = new Entity("msg");

var player      = new Entity("player");
var ai          = new Entity("ai");

var brain       = new Currency("Brain");
var heart       = new Currency("Heart");
var hammer      = new Currency("Hammer");
var meterLimit  = new Currency("meterLimit");
var meter       = new Currency("Meter");

var question;
var flag;

$(function() {
    initTheme();
//    initGame();
    observers();
    playGame();
    window.ondragstart = function() { return false; }

    parent.setGameAttempt(parent.currentIntegratedGame, parent.currentUid);
});

function initTheme() {

        loadConfig(base);
        loadConfig(meterBar);
        loadConfig(meterOverlay);

        initQuiz();

        loadConfig(player);
        player.setState('1');

        loadConfig(ai);
        ai.setState('1');

        $("#base img").attr("id", "qt-base-img");
        $("#ai img").attr("id", "qt-ai-img");
        $("#player img").attr("id", "qt-player-img");
        $("#logo img").attr("id", "qt-game-logo");

        $("#qt-base-img").attr("src", getImg("qt-background"));
        $("#qt-player-img").attr("src", getImg("qt-player"));
        $("#qt-ai-img").attr("src", getImg("qt-ai"));
        $(".qt-bot-overlay-img").attr("src", getImg("qt-bot-overlay"));
        $("#qt-meter-empty").css({background: "url('" + getImg("qt-meter-bar-bg") + "')"});
        $("#qt-meter-filled").css({background: "url('" + getImg("qt-meter-bar-filled") + "')"});
        $("#qt-meter-indicator span").text(getText("qt-meter-text"));
        $("#leftOpt").attr("src", getImg("qt-left-opt-arrow"));
        $("#rightOpt").attr("src", getImg("qt-right-opt-arrow"));
        $("#qt-say-button").attr("src", getImg("qt-say-this"));
        $("#qt-know-more").attr("src", getImg("qt-know-more"));
        $("#qt-speech-bubble-2").attr("src", getImg("qt-options-back"));
        $("#qt-speech-bubble-1").attr("src", getImg("qt-statement-back"));

        initGame();

        $("#qt-meter-filled").css({width: ai.meter.is()+"%"});
        $("#limit").css({left: ai.meterlimit.is()+"%"});

}


function initGame() {

    var random  = randBetween(0, game.ai.length-1);
    ai.createWallet(brain, 0, 10, game.ai[random].brain);
    ai.createWallet(heart, 0, 10, game.ai[random].heart);
    ai.createWallet(hammer, 0, 10, game.ai[random].hammer);
    ai.createWallet(meterLimit, 0, 100, game.ai[random].limit);
    random = randBetween(10,20);
    ai.createWallet(meter, 0, 100, random);
    ai.points = [];

    console.log(ai.brain.is());
    console.log(ai.heart.is());
    console.log(ai.hammer.is());

    ai.points.push(random);


    flag = 0;

}

function playGame() {
    question = getQuestion();


    $('#quiz').fadeOut(function () {
        Question.showQuizPanel(quiz, question);
        $(".option-block").hide();
        optionScroller(0);
    }).fadeIn();
}

function getQuestion() {
    var question = Question.getQuestion(1, flag);
    parent.setQuestionAttempt(Question.id);
    return question;
}

function processAnswer(data) {
    parent.markQuestionAttemptCorrect();

    var points = data.points;
    var brain = parseInt(points[0]);
    var heart = parseInt(points[1]);
    var hammer = parseInt(points[2]);

    points = (ai.brain.is()*brain)+(ai.heart.is()*heart)+(ai.hammer.is()*hammer);
    ai.meter.is(ai.meter.is() + points);

    $(ai.meter).unbind().on('max', function(value, max) {
        ai.meter.is(ai.meter.max);
    });

    $("#qt-meter-filled").animate({
        width: ai.meter.is()+"%"
    }, 500);
    ai.points.push(points);

    flag++;
    if(flag == 10)
        endGame();
    else
        playGame();

    return true;
}

function endGame() {
    $("*").unbind('click');
    $("#qt-meter-filled").fadeOut(250).delay(100).fadeIn(250).delay(100).fadeOut(250).delay(100).fadeIn(250);

    setTimeout(function() {
//        $("#player").css({opacity: 0.9});
//        $("#ai").css({opacity: 0.9});
        if(ai.meter.is() > ai.meterlimit.is())
            victory();
        else
            defeat();
    }, 2500);
}

function victory() {
    $("#message-box").fadeIn();
    $("#message").html("<span>You Win!</span>");
}

function defeat() {
    $("#message-box").fadeIn();
    $("#message").html("<span>You Lose!</span>");
}


function observers() {
    $("#leftOpt").unbind('click').on('click', function() {
        changeOption($(".option-show").attr("id"), "left");
    });
    
    $("#rightOpt").unbind('click').on('click', function() {
        changeOption($(".option-show").attr("id"), "right");
    });

    $("#qt-say-button").unbind('click').on('click', function() {
        $(".option-show").first().trigger('click');
        $(question).unbind('answered').on('answered', function (e, data) {
            processAnswer(data);
        });
    });
}

function changeOption(id, direction) {
    var optionIndex = parseInt(id.charAt(id.length-1));
    switch(direction) {
        case "left":
            if(optionIndex != 0)
                optionIndex--;
            else
                optionIndex = question.options.length - 1;

            optionScroller(optionIndex);
            break;
            
        case "right":
            if(optionIndex != question.options.length - 1)
                optionIndex++;
            else
                optionIndex = 0;
            
            optionScroller(optionIndex);
            break;
    }
}

function optionScroller(optionIndex) {
    $(".option-block").removeClass("option-show");
    $("#option-block-"+optionIndex).addClass("option-show");
    $("#option-block-"+optionIndex).hide();
    $("#option-block-"+optionIndex).fadeIn(500);
}
