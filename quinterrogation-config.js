var config = {};

config.base = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='img/background.jpg'/>"}
    ],
    locations: [
        {name: "logo", states: [
            {name: "indicator-img", representation: "<img src='img/game_logo.png' />"}
        ]},
        {name: "message-box", states: [
            {name: "message", representation: "<div id='message'></div>"}
        ]}
    ]
}

config.meterBar = {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: [
        {name: "limit"},
        {name: "filled"},
        {name: "indicator", states: [
            {name: "indicator-text", representation: "<span>mood</span>"}
        ]}
    ]
};

config.player = {
    type: "entity",
    states: [
        {name: "default", representation: "<img src='./img/player.png' />"}
    ]
};

config.ai = {
    type: "entity",
    states: [
        {name: "default", representation: "<img src='./img/ai.png' />"}
    ]
};