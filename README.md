# JS-AnimationController



## Description
This Project was created to make the process of creating bigger animations easier by defining a animation tree in Json.

## Define Animation
The animation is defined using a Json Format.  
In the following example the animation will move a div element in a square:  
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

## Define Animation Variables

## Usage

## Example