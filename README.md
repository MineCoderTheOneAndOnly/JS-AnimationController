# JS-AnimationController

- [JS-AnimationController](#js-animationcontroller)
  - [Description](#description)
  - [Define Animation](#define-animation)
    - [Old Format (NOT RECOMMENDED BUT STILL WORKING)](#old-format-not-recommended-but-still-working)
    - [New Format (RECOMMENDED MORE USER FRIENDLY)](#new-format-recommended-more-user-friendly)
  - [Animation Types](#animation-types)
    - ["type":"animations"](#typeanimations)
    - ["type":"delay"](#typedelay)
    - ["type":"fadeIn"](#typefadein)
    - ["type":"fadeOut"](#typefadeout)
    - ["type":"fadeTo"](#typefadeto)
    - ["type":"scrollTop"](#typescrolltop)
    - ["type":"scrollBottom"](#typescrollbottom)
    - ["type":"scrollTo"](#typescrollto)
  - [Define Animation Classes](#define-animation-classes)
  - [Dynamic Value](#dynamic-value)
  - [Dynamic Value Definitions](#dynamic-value-definitions)
    - ["type":"value"](#typevalue)
    - ["type":"variable"](#typevariable)
    - ["type":"add|sub|mul|div"](#typeaddsubmuldiv)
  - [Define Animation Variables](#define-animation-variables)
  - [Usage](#usage)
  - [Start Animation with specific AnimationName](#start-animation-with-specific-animationname)



## Description
This Project was created to make the process of creating bigger animations easier by defining a animation tree in Json.

## Define Animation
The animation is defined using a Json Format.  
In the following example the animation will move a div element in a square:  

### Old Format (NOT RECOMMENDED BUT STILL WORKING)
```json
[
   {
      "selector":".square",
      "animationDetails":[
         {
            "type":"animations",
            "duration":1000,
            "animations":[
               "moveRight"
            ],
            "next":[
               {
                  "selector":".square",
                  "animationDetails":[
                     {
                        "type":"animations",
                        "duration":1000,
                        "animations":[
                           "moveDown"
                        ],
                        "next":[
                           {
                              "selector":".square",
                              "animationDetails":[
                                 {
                                    "type":"animations",
                                    "duration":1000,
                                    "animations":[
                                       "moveLeft"
                                    ],
                                    "next":[
                                       {
                                          "selector":".square",
                                          "animationDetails":[
                                             {
                                                "type":"animations",
                                                "duration":1000,
                                                "animations":[
                                                   "moveUp"
                                                ],
                                                "next":[
                                                   
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
```
| Json Property | Desccription |
| :--           | :--          |
| `selector`    | The `selector` defines on which elements the animation should be applied |
| `animationDetails`| The `animationDetails` define animation types which should be applied on the selected elements. All entries in the list will be applied and played parallel |

### New Format (RECOMMENDED MORE USER FRIENDLY)
```json
{
   "animtationStartPoint":{
      ".square":[
         "animation0"
      ]
   },
   "animation0":{
      "type":"animations",
      "duration":1000,
      "animations":[
         "moveRight"
      ],
      "next":{
         ".square":[
            "animation1"
         ]
      }
   },
   "animation1":{
      "type":"animations",
      "duration":1000,
      "animations":[
         "moveDown"
      ],
      "next":{
         ".square":[
            "animation2"
         ]
      }
   },
   "animation2":{
      "type":"animations",
      "duration":1000,
      "animations":[
         "moveLeft"
      ],
      "next":{
         ".square":[
            "animation3"
         ]
      }
   },
   "animation3":{
      "type":"animations",
      "duration":1000,
      "animations":[
         "moveUp"
      ],
      "next":{
         
      }
   }
}
```

## Animation Types
### "type":"animations"
Applies css styles to where the element should be animated.
```json
{
   "type":"animations",
   "duration":1000,
   "animations":[],
   "next":[]
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the animation |
| `duration`    | Defines the duration of the animation in `ms` |
| `animations`  | Contains names of defined `animationClasses` which should be applied to the selected elements |
| `next`        | Contains further selected elements with animation which should be played after this animation is done |

### "type":"delay"
Applies a delay before playing the next animations.
```json
{
   "type":"delay",
   "duration":1000,
   "next":[]
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the animation |
| `duration`    | Defines the duration of the delay in `ms` |
| `next`        | Contains further selected elements with animation which should be played after this delay is done |

### "type":"fadeIn"
Applies an fade in animation.
```json
{
   "type":"fadeIn",
   "duration":1000,
   "next":[]
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the animation |
| `duration`    | Defines the duration of the animation in `ms` |
| `next`        | Contains further selected elements with animation which should be played after this animation is done |

### "type":"fadeOut"
Applies an fade out animation.
```json
{
   "type":"fadeOut",
   "duration":1000,
   "next":[]
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the animation |
| `duration`    | Defines the duration of the animation in `ms` |
| `next`        | Contains further selected elements with animation which should be played after this animation is done |

### "type":"fadeTo"
Applies an fade animation with the defined `opacity` value.
```json
{
   "type":"fadeTo",
   "duration":1000,
   "opacity":0,
   "next":[]
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the animation |
| `duration`    | Defines the duration of the animation in `ms` |
| `opacity`     | Defines the opacity to where the animation should fade to |
| `next`        | Contains further selected elements with animation which should be played after this animation is done |

### "type":"scrollTop"
Applies a animation which scrolls to the top. Only works when the element has a scrollbar.
```json
{
   "type":"scrollTop",
   "duration":1000,
   "next":[]
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the animation |
| `duration`    | Defines the duration of the animation in `ms` |
| `next`        | Contains further selected elements with animation which should be played after this animation is done |

### "type":"scrollBottom"
Applies a animation which scrolls to the bottom. Only works when the element has a scrollbar.
```json
{
   "type":"scrollBottom",
   "duration":1000,
   "next":[]
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the animation |
| `duration`    | Defines the duration of the animation in `ms` |
| `next`        | Contains further selected elements with animation which should be played after this animation is done |

### "type":"scrollTo"
Applies a animation which scrolls to the defined `to` position. Only works when the element has a scrollbar.
```json
{
   "type":"scrollTo",
   "duration":1000,
   "to":12,
   "next":[]
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the animation |
| `duration`    | Defines the duration of the animation in `ms` |
| `to`          | Defines the position of the scrollbar to where it should scroll |
| `next`        | Contains further selected elements with animation which should be played after this animation is done |


## Define Animation Classes
The animation classes will be used in the animation type `animations` where the names of animation classes are defined in the `animations` list.  
In the example the animation classes for the square animation are defined:  
```json
{
   "moveRight":{
      "left":"100px"
   },
   "moveDown":{
      "top":"100px"
   },
   "moveLeft":{
      "left":"0px"
   },
   "moveUp":{
      "top":"0px"
   }
}
```
Here you need to define the animation `name` and then inside the animation object you define css style to where the element should be animated to.

## Dynamic Value
Dynamic values can be used to define "formulars" which result in a value.  
Dynamic value are used in:  
+ Values for the properties inside animation classes
+ Parameter value of animation types
  
If you want to extend a value in the code to use dynamic value you need to use the function: `parseDynamicValue(<JQUERY OBJECT FROM WHICH THE FUNCTION CAN GET STUF>, <DYNAMIC VALUE DEFINITION>)`

## Dynamic Value Definitions
If the Dynamic Value Definition has a property named `type` it will try to parse it otherwise it will return the input value.

### "type":"value"
Lets you define a static value its equal to using a normal value like `0` or `"Hello World"`
```json
{
   "type":"value", 
   "value":<VALUE>
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the definition |
| `value`       | Defines the value which should be represented |

### "type":"variable"
Lets you get the value of a defined `Animation Variable` (Animation Variables can also use Dynamic Value)
```json
{
   "type":"variable", 
   "name":<VARNAME>
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the definition |
| `name`        | Defines the name of the variable from where the value should be gotten |

### "type":"add|sub|mul|div"
Lets you use the following math operations:
+ add
+ subtract
+ multiply
+ divide
```json
{
   "type":"add|sub|mul|div", 
   "a":<DYNAMIC VALUE 1>,
   "b":<DYNAMIC VALUE 2>
}
```
| Json Property | Description |
| :--           | :--         |
| `type`        | Defines the type of the definition |
| `a`           | Defines the first dynamic value of the math operation |
| `b`           | Defines the second dynamic value of the math operation |

## Define Animation Variables
You can define variables which can be used in dynamic values. The Value of an Animation Variable can be defined using dynamic value.  
You can define variables like this:
```json
{
   <VARIABLE NAME 1>:<DYNAMIC VALUE 1>
   <VARIABLE NAME 2>:<DYNAMIC VALUE 2>,
   <VARIABLE NAME X>:<DYNAMIC VALUE X>,
}
```
Animation Variables can be read by the dynamic value definition `"type":"variable"`

## Usage
To use the `animationController` you need to:
1. Create `AnimationController` object using `var controller = new AnimationController();`
2. Define Animation inside that array `controller.animationTree = [...]` if you use the old json format or define the Animation inside the object `controller.animationTree = {...}` if you use the new json format
3. Remember to define the used animation classes and variables in `controller.animationClasses` and `controller.animationVariables`
4. After everythin is defined you can start the animation using `controller.startAnimation();` or `controller.startAnimation(false);` if you defined the animation with the new json format
> [!IMPORTANT]  
> JQUERY is required for animationController.js to work.  
> `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>`

## Start Animation with specific AnimationName
To start the animation with another animation name as defined in `"animtationStartPoint"` you can use the function `startWithAnimationNameForElement(animationName, elementSelector)`
| Parameter | Description |
| :--       | :--         |
| `animationName` | The name of the animation |
| `elementSelector` | A CSS selector string to define on which element the animation should be executed |