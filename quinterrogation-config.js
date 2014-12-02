var config = {};

config.base = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src=''/>"}
    ],
    locations: [
        {name: "qt-bot-overlay", states: [
            {name: "qt-bot-overlay-img", representation: "<img class='qt-bot-overlay-img' src='' />"}
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
            {name: "qt-meter-indicator-text", representation: "<span></span>"}
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
        {name: "default", representation: "<img id='qt-player-img' src='' />"}
    ]
};

config.ai = {
    type: "entity",
    states: [
        {name: "default", representation: "<img id='qt-ai-img' src='' />"}
    ]
};