
var base        = new Environment("base");
var meterBar    = new Environment("meterBar");

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
    initGame();
    playGame();
    scrollObserver();
});

function initGame() {

    loadConfig(base);
    loadConfig(meterBar);
    initQuiz();

    loadConfig(player);
    player.setState('1');

    loadConfig(ai);
    ai.setState('1');

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
    $("#filled").css({width: ai.meter.is()+"%"});
    $("#limit").css({left: ai.meterlimit.is()+"%"});
    $("#base img").attr("id", "qt-base-img");
    $("#ai img").attr("id", "qt-ai-img");
    $("#player img").attr("id", "qt-player-img");
    $("#logo img").attr("id", "qt-game-logo");

    flag = 0;

}

function playGame() {
    question = getQuestion();

    $('#quiz').fadeOut(function () {
        Question.showQuizPanel(quiz, question);
        $(".option-block").hide();
        optionScroller(0);
    }).fadeIn();

    $(question).unbind().on('answered', function (e, data) {
        processAnswer(data);
    });
}

function getQuestion() {
    var question = Question.getQuestion(1, flag);
    return question;
}

function processAnswer(data) {
    var points = data.points;
    var brain = parseInt(points[0]);
    var heart = parseInt(points[1]);
    var hammer = parseInt(points[2]);

    points = (ai.brain.is()*brain)+(ai.heart.is()*heart)+(ai.hammer.is()*hammer);
    ai.meter.is(ai.meter.is() + points);

    $(ai.meter).unbind().on('max', function(value, max) {
        ai.meter.is(ai.meter.max);
    });

    $("#filled").animate({
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
    if(ai.meter.is() > ai.meterlimit.is())
        victory();
    else
        defeat();
}

function victory() {
    $("#message-box").fadeIn();
    $("#message").html("<span>You Win!</span>");
}

function defeat() {
    $("#message-box").fadeIn();
    $("#message").html("<span>You Lose!</span>");
}


function scrollObserver() {
    $("#leftOpt").unbind().on('click', function() {
        changeOption($(".option-show").attr("id"), "left");
    });
    
    $("#rightOpt").unbind().on('click', function() {
        changeOption($(".option-show").attr("id"), "right");
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
