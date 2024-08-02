# JS-AnimationController



## Description
This Project was created to make the process of creating bigger animations easier by defining a animation tree in Json.

## Define Animation
The animation is defined using a Json Format.  
Example:  
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

## Define Animation Classes

## Define Animation Variables

## Usage

## Example