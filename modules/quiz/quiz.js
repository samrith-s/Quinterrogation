var quiz;

config.quiz = {
    type: "environment",
    states: [
        {name: "default", representation: "<div id='statement-area'></div>" +
         "" +
            "<div id='options-area'>" +
                "<div id='leftOpt'>" +
                    "<img src='img/arrow-left.png' />" +
                "</div>" +
                "<div id='options-list'></div>" +
                "<div id='rightOpt'>" +
                    "<img src='img/arrow-right.png' />" +
                "</div>" +
            "</div>"
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
    $('#statement-area').html(question.name);
    $('.option-block').remove();
    for (var i in question.options) {
        $('#options-list').append('<div class="option-block" id="option-block-' + i + '">' + question.options[i].name + '</div>');
    }
    $('.option-block').unbind('click').on('click', function () {
        $this = $(this);
        $(question).trigger("answered", [question.checkAnswer(question.options[parseInt($this.attr("id").split("option-block-")[1])])]);
    });
};


