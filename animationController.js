class AnimationController {
    constructor() {
        this.animationVariables = {
            /*centerX:{
                "type":"centerX"
            },
            fiveSecs: 5000*/
        }

        this.animationClasses = {
            /*"expand500Right":{
                //"width": "500px"
                "width": {"type":"variable", "name":"centerX"}
            },
            "expand500Down":{
                "height": "500px"
            },
            "expand1000Right":{
                "width": "1000px"
            },
            "fadeTo":{
                "opacity":0.5
            }*/
        }

    this.animationTree = [
        /* {
            "selector": "#test",
            "animationDetails": [
                {
                    "type":"scrollBottom",
                    "duration": 20000,
                    "next": []
                }
            ]
        } */
    ];

        /*this.animationTree = [
            {
                "selector": "#test",
                "animationDetails": [
                    {
                        "type":"scrollBottom",
                        "duration": 20000,
                        "next": []
                    }
                ]
            }
        ];*/

        /*this.animationTree = [
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
        ];*/
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
                case "scrollTop":
                    this.doScrollTop(animationDetails, objToAnim);
                    break;
                case "scrollBottom":
                    this.doScrollBottom(animationDetails, objToAnim);
                    break;
                case "scrollTo":
                    this.doScrollTo(animationDetails, objToAnim);
                    break;
            }
        }
    }

    parseDynamicValue(obj, dynamicValue){
        if(!dynamicValue.hasOwnProperty("type"))
            return dynamicValue

        switch(dynamicValue["type"]){
            case "globalCenterX"://{"type":"centerX"}
                return obj.offset().left + obj.width() / 2;
            case "globalCenterY"://{"type":"centerY"}
                return obj.offset().top + obj.height() / 2;
            case "localCenterX"://{"type":"centerX"}
                return obj.width() / 2;
            case "localCenterY"://{"type":"centerY"}
                return obj.height() / 2;
            case "posX"://{"type":"posX"}
                return obj.position().left;
            case "posY"://{"type":"posY"}
                return obj.position().top;
            case "value"://{"type":"value", "value":<VALUE>}
                return dynamicValue["value"]
            case "variable"://{"type":"variable", "name":<VARNAME>}
                if(this.animationVariables.hasOwnProperty(dynamicValue["name"])){
                    var varDef = this.animationVariables[dynamicValue["name"]];//return dynamicValue structure
                    var res = this.parseDynamicValue(obj, varDef);
                    return res;
                }
                else{
                    return 0;
                }
            case "add"://{"type":"add", "a":<VALUE1>, "b":<VALUE2>}
                var a = this.parseDynamicValue(obj, dynamicValue["a"]);
                var b = this.parseDynamicValue(obj, dynamicValue["b"]);
                return a + b;
            case "sub"://{"type":"sub", "a":<VALUE1>, "b":<VALUE2>}
                var a = this.parseDynamicValue(obj, dynamicValue["a"]);
                var b = this.parseDynamicValue(obj, dynamicValue["b"]);
                return a - b;
            case "mul"://{"type":"mul", "a":<VALUE1>, "b":<VALUE2>}
                var a = this.parseDynamicValue(obj, dynamicValue["a"]);
                var b = this.parseDynamicValue(obj, dynamicValue["b"]);
                return a * b;
            case "div"://{"type":"div", "a":<VALUE1>, "b":<VALUE2>}
                var a = this.parseDynamicValue(obj, dynamicValue["a"]);
                var b = this.parseDynamicValue(obj, dynamicValue["b"]);
                return a / b;
            case "parent"://{"type":"parent", "nextOperation":<DYNAMICVALUE>}
                var parent = obj.parent();
                return this.parseDynamicValue(parent, dynamicValue["nextOperation"]);
            default:
                return dynamicValue;
        }
    }












    doAnimation(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        var style = this.createAnimationStyle(animationDetails, objToAnim);
        objToAnim.animate(
            style,
            {
                duration: duration,
                queue: false,
                easing: "linear",
                done: () => {
                    this.runAnimation(animationDetails["next"]);
                }
            },
        );
    }

    doDelay(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        objToAnim.delay(duration).queue(() => {
            objToAnim.dequeue();
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
                easing: "linear",
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
                easing: "linear",
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
        objToAnim.animate(
            {
                opacity: opacity
            },
            {
                duration: duration,
                queue: false,
                easing: "linear",
                done: () => {
                    this.runAnimation(animationDetails["next"]);
                }
            }
        );
    }

    doScrollTop(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        objToAnim.animate(
            {
                scrollTop:0
            },
            {
                duration: duration,
                queue: false,
                easing: "linear",
                done: () => {
                    this.runAnimation(animationDetails["next"]);
                }
            },
        );
    }

    doScrollBottom(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        objToAnim.animate(
            {
                scrollTop:objToAnim.prop("scrollHeight")
            },
            {
                duration: duration,
                queue: false,
                easing: "linear",
                done: () => {
                    this.runAnimation(animationDetails["next"]);
                }
            },
        );
    }

    doScrollTo(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        var to = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        objToAnim.animate(
            {
                scrollTop:to
            },
            {
                duration: duration,
                queue: false,
                easing: "linear",
                done: () => {
                    this.runAnimation(animationDetails["next"]);
                }
            },
        );
    }












    
    createAnimationStyle(details, objToAnim) {
        var styleToAnimate = {};

        for(var i = 0; i < details["animations"].length; i++){
            var animName = details["animations"][i];
            if(this.animationClasses.hasOwnProperty(animName)){
                var props = this.animationClasses[animName];
                for (var key in props) {
                    //styleToAnimate[key] = props[key];
                    styleToAnimate[key] = this.parseDynamicValue(objToAnim, props[key]);
                }
            }
        }

        return styleToAnimate;
    }
}