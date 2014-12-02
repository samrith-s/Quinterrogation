var quiz;

config.quiz = {
    type: "environment",
    states: [
        {name: "default", representation:
            "<div id='statement-area'>" +
                "<img src='img/speech_bubble_1.png' id='qt-speech-bubble-1' />" +
                "<div id='statement-text'>" +
                "</div>" +
            "</div>" +
         "" +
            "<div id='options-area'>" +
                "<img src='img/speech_bubble_2.png' id='qt-speech-bubble-2' />" +

            "</div>" +

            "<div id='botOpt'>" +
//                "<div id='leftOpt'>" +
                   "<img id='leftOpt' src='img/leftOpt.png' />" +
//                "</div>" +

                "<img src='img/say_button.png' id='qt-say-button' />" +

//                "<div id='rightOpt'>" +
                    "<img id='rightOpt' src='img/rightOpt.png' />" +
//                "</div>" +
            "</div>" +

            "<img id='qt-know-more' src='img/know_more.png' />"
        }
    ]
};

function initQuiz() {
    quiz = new Environment("quiz");
    loadConfig(quiz);
    quiz.setState('default');
    loadQuestionBank();
}


function loadQuestionBank() {
    for (var i in   questionbank.questions) {
        var q = questionbank.questions[i];
        var opts = ["a", "b", "c", "d"];
        var optsz = ["", "correct", "points"];
        var options = [];
        var optiones = {};
        for(var i=0; i<opts.length; i++) {
                var temp1 = "opt" + opts[i] + optsz[0];
                var temp2 = "opt" + opts[i] + optsz[1];
                var temp3 = "opt" + opts[i] + optsz[2];

                optiones.option = i+1;
                optiones.name = q[temp1];
                optiones.correct = q[temp2];
                optiones.points = q[temp3];

                options.push(optiones);
                optiones = {};
        }

        new Question(q.statement, q.image, q.weight, options, q.help);
    }
    console.log(Question.all[0]);
    return true;
}


var Question = Class({
    initialize: function (name, image, weight, options, help) {

        this.name = name;
        this.image = image;
        this.weight = weight || 1;
        this.options = options;
        this.help = help;
        Question.all.push(this);
        log.add('Question: ' + name + ' created')
    },
    checkAnswer: function (option) {
        var thisAnswer = $.grep(this.options, function (a) {
            return ( a == option );
        })[0];
        return {name: thisAnswer.name, correct: thisAnswer.correct, weight: this.weight, points: thisAnswer.points, help: this.help}
    }
});

Question.all = [];

Question.getByWeight = function (weight) {
    var questions = $.grep(Question.all, function (a) {
        return ( a.weight == weight );
    });
    return questions[randBetween(0, questions.length - 1)]
};

Question.getQuestion = function(weight, flag) {
    var questions = $.grep(Question.all, function (a) {
        return ( a.weight == weight );
    });
    return questions[flag];
}

Question.showQuizPanel = function (obj, question) {
    $('#statement-text').html(question.name);
    $('.option-block').remove();
    for (var i in question.options) {
        $('#options-area').append('<div class="option-block" id="option-block-' + i + '">' + question.options[i].name + '</div>');
    }
    $('.option-block').unbind('click').on('click', function () {
        $this = $(this);
        $(question).trigger("answered", [question.checkAnswer(question.options[parseInt($this.attr("id").split("option-block-")[1])])]);
    });
};


