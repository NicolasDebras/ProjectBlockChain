// finisher.js
function initFinisherHeader() {
    new FinisherHeader({
        "count": 90,
        "size": {
            "min": 1,
            "max": 20,
            "pulse": 0
        },
        "speed": {
            "x": {
                "min": 0,
                "max": 0.4
            },
            "y": {
                "min": 0,
                "max": 0.1
            }
        },
        "colors": {
            "background": "#2558a2",
            "particles": [
                "#ffffff",
                "#87ddfe",
                "#acaaff",
                "#1bffc2",
                "#f88aff"
            ]
        },
        "blending": "screen",
        "opacity": {
            "center": 0,
            "edge": 0.4
        },
        "skew": -2,
        "shapes": [
            "c",
            "s",
            "t"
        ]
    });
}

 document.addEventListener("DOMContentLoaded", initFinisherHeader);
