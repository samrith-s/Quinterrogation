var config = {};

config.base = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='img/background.jpg'/>"}
    ],
    locations: [
        {name: "logo", states: [
            {name: "logo", representation: "<img src='img/game_logo.png' />"}
        ]},
        {name: "message-box", states: [
            {name: "message", representation: "<div id='message'></div>"}
        ]},
    ]
}

config.msg = {
    type: "environment",
    states: [
    ],
    locations: [
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
        {name: "qt-meter-empty"},
        {name: "limit"},
        {name: "qt-meter-filled"},
        {name: "qt-meter-indicator", states: [
            {name: "qt-meter-indicator-text", representation: "<span>mood</span>"}
        ]}
    ]
};


config.meterOverlay = {
    type: "environment",
    states: [
        {name: "default"}
    ],
    locations: [
        {name: "qt-meter-overlay"}
    ]
}

config.player = {
    type: "entity",
    states: [
        {name: "default", representation: "<img id='qt-player-img' src='./img/player.png' />"}
    ]
};

config.ai = {
    type: "entity",
    states: [
        {name: "default", representation: "<img id='qt-ai-img' src='./img/ai.png' />"}
    ]
};