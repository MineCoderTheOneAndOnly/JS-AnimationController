class AnimationController {
    constructor() {
        this.animationVariables = {
            centerX:{
                "type":"centerX"
            },
            fiveSecs: 5000
        }

        this.animationClasses = {
            "expand500Right":{
                "width": "500px"
            },
            "expand500Down":{
                "height": "500px"
            },
            "expand1000Right":{
                "width": "1000px"
            },
            "fadeTo":{
                "opacity":0.5
            }
        }

        this.animationTree = [
            {
                "selector": "#test",
                "animationDetails": [
                    {
                        "type":"animations",
                        "duration": {"type":"variable", "name":"fiveSecs"},
                        "animations": ["expand500Right"],
                        "next": [
                            {
                                "selector": "#test",
                                "animationDetails": [
                                    {
                                        "type":"animations",
                                        "duration": 5000,
                                        "animations": ["expand500Down"],
                                        "next": [

                                        ]
                                    }
                                ]
                            },
                            {
                                "selector": "#test",
                                "animationDetails": [
                                    {
                                        "type":"delay",
                                        "duration": 2000,
                                        "next": [
                                            {
                                                "selector": "#test",
                                                "animationDetails": [
                                                    {
                                                        "type":"animations",
                                                        "duration": 2000,
                                                        "animations": ["expand1000Right"],
                                                        "next": [
                                                            {
                                                                "selector": "#test",
                                                                "animationDetails": [
                                                                    {
                                                                        "type":"fadeOut",
                                                                        "duration": 2000,
                                                                        "next": [
                                                                            {
                                                                                "selector": "#test1",
                                                                                "animationDetails": [
                                                                                    {
                                                                                        "type":"fadeOut",
                                                                                        "duration": 5000,
                                                                                        "next": [
                                                
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "selector": "#test",
                                                                                "animationDetails": [
                                                                                    {
                                                                                        "type":"fadeTo",
                                                                                        "duration": 5000,
                                                                                        "opacity": 0.5,
                                                                                        "next": [
                                                
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "selector": "#test1",
                "animationDetails": [
                    {
                        "type":"animations",
                        "duration": 10000,
                        "animations": ["expand500Right", "expand500Down"],
                        "next": []
                    }
                ]
            }
        ];
    }

    startAnimation() {
        this.runAnimation(this.animationTree);
    }

    runAnimation(processList) {
        for (var i = 0; i < processList.length; i++) {
            var selectorObj = processList[i];
            var objToAnim = $(selectorObj["selector"]);
            this.processAnimationDetails(selectorObj["animationDetails"], objToAnim);
        }
    }

    processAnimationDetails(detailsList, objToAnim) {
        for (var i = 0; i < detailsList.length; i++) {
            var animationDetails = detailsList[i];

            switch(animationDetails["type"]){
                case "animations":
                    this.doAnimation(animationDetails, objToAnim);
                    break;
                case "delay":
                    this.doDelay(animationDetails, objToAnim);
                    break;
                case "fadeIn":
                    this.doFadeIn(animationDetails, objToAnim);
                    break;
                case "fadeOut":
                    this.doFadeOut(animationDetails, objToAnim);
                    break;
                case "fadeTo":
                    this.doFadeTo(animationDetails, objToAnim);
                    break;
            }
        }
    }

    parseDynamicValue(obj, dynamicaValue){
        if(!dynamicaValue.hasOwnProperty("type"))
            return dynamicaValue

        switch(dynamicaValue["type"]){
            case "centerX"://{"type":"centerX"}
                return obj.width() / 2;
            case "centerY"://{"type":"centerY"}
                return obj.height() / 2;
            case "value"://{"type":"value", "value":<VALUE>}
                return dynamicaValue["value"]
            case "variable"://{"type":"variable", "name":<VARNAME>}
                if(this.animationVariables.hasOwnProperty(dynamicaValue["name"])){
                    var varDef = this.animationVariables[dynamicaValue["name"]];//return dynamicValue structure
                    return this.parseDynamicValue(obj, varDef);
                }
                return 0;
            default:
                return dynamicaValue;
        }
    }












    doAnimation(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        var style = this.createAnimationStyle(animationDetails);
        objToAnim.animate(
            style,
            {
                duration: duration,
                queue: false,
                done: () => {
                    this.runAnimation(animationDetails["next"]);
                }
            },
        );
    }

    doDelay(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        objToAnim.delay(duration).queue(() => {
            this.runAnimation(animationDetails["next"]);
        });
    }

    doFadeIn(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        objToAnim.animate(
            {
                opacity: 1
            },
            {
                duration: duration,
                queue: false,
                done: () => {
                    this.runAnimation(animationDetails["next"]);
                }
            }
        );
        /* objToAnim.fadeIn({
            duration: duration,
            queue: false}, 
            () => {
                this.runAnimation(animationDetails["next"]);
            }
        ); */
    }

    doFadeOut(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        objToAnim.animate(
            {
                opacity: 0
            },
            {
                duration: duration,
                queue: false,
                done: () => {
                    this.runAnimation(animationDetails["next"]);
                }
            }
        );
        /* objToAnim.fadeOut(
            {
                duration: duration,
                queue: false,
                done: () => {
                    this.runAnimation(animationDetails["next"]);
                }
            }
        ); */
    }

    doFadeTo(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        var opacity = this.parseDynamicValue(objToAnim, animationDetails["opacity"]);
        console.log(opacity + " => " + duration);
        objToAnim.animate(
            {
                opacity: opacity
            },
            {
                duration: duration,
                queue: false,
                done: () => {
                    console.log("Done");
                    this.runAnimation(animationDetails["next"]);
                }
            }
        );
    }












    
    createAnimationStyle(details) {
        var styleToAnimate = {};

        for(var i = 0; i < details["animations"].length; i++){
            var animName = details["animations"][i];
            if(this.animationClasses.hasOwnProperty(animName)){
                var props = this.animationClasses[animName];
                for (var key in props) {
                    styleToAnimate[key] = props[key];
                }
            }

        }

        return styleToAnimate;
    }
}