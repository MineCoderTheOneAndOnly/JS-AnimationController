class AnimationController {
    constructor() {
        this.animationVariables = {
            
        }

        this.animationClasses = {
            
        }

        this.animationTree = [
            
        ];
    }

    startAnimation(useOldJsonFormat = true) {
        this.useOldJsonFormat = useOldJsonFormat;
        if(useOldJsonFormat){
            this.runAnimation(this.animationTree);
        }
        else{
            this.runAnimation_v2(this.animationTree["animtationStartPoint"]);
        }
    }

    startWithAnimationNameForElement(animationName, elementSelector){//works only with the new json format
        this.runAnimation_v2(
            JSON.parse('{"' + elementSelector + '":["' + animationName + '"]}')
        );
    }

    runAnimation(processList) {
        for (var i = 0; i < processList.length; i++) {
            var selectorObj = processList[i];
            var objToAnim = $(selectorObj["selector"]);
            this.processAnimationDetails(selectorObj["animationDetails"], objToAnim);
        }
    }

    runAnimation_v2(nextAnimation){//next{...} || "animationStartPoint":{...}
        for (var selector in nextAnimation) {
            var objToAnim = $(selector);
            var animNameList = nextAnimation[selector]
            var animationDetails = [];
            for(var i in animNameList){
                var animName = animNameList[i];
                animationDetails.push(this.animationTree[animName]);
            }
            console.log(animationDetails);
            this.processAnimationDetails(animationDetails, objToAnim);
        }
    }

    handleNextAnimations(nextAnimation){
        if(this.useOldJsonFormat){
            this.runAnimation(nextAnimation)
        }
        else{
            this.runAnimation_v2(nextAnimation)
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
                    //this.runAnimation(animationDetails["next"]);
                    this.handleNextAnimations(animationDetails["next"]);
                }
            },
        );
    }

    doDelay(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        objToAnim.delay(duration).queue(() => {
            objToAnim.dequeue();
            //this.runAnimation(animationDetails["next"]);
            this.handleNextAnimations(animationDetails["next"]);
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
                    //this.runAnimation(animationDetails["next"]);
                    this.handleNextAnimations(animationDetails["next"]);
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
                    //this.runAnimation(animationDetails["next"]);
                    this.handleNextAnimations(animationDetails["next"]);
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
                    //this.runAnimation(animationDetails["next"]);
                    this.handleNextAnimations(animationDetails["next"]);
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
                    //this.runAnimation(animationDetails["next"]);
                    this.handleNextAnimations(animationDetails["next"]);
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
                    //this.runAnimation(animationDetails["next"]);
                    this.handleNextAnimations(animationDetails["next"]);
                }
            },
        );
    }

    doScrollTo(animationDetails, objToAnim){
        var duration = this.parseDynamicValue(objToAnim, animationDetails["duration"]);
        var to = this.parseDynamicValue(objToAnim, animationDetails["to"]);
        objToAnim.animate(
            {
                scrollTop:to
            },
            {
                duration: duration,
                queue: false,
                easing: "linear",
                done: () => {
                    //this.runAnimation(animationDetails["next"]);
                    this.handleNextAnimations(animationDetails["next"]);
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