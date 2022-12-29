// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable quotes */
// var jQuery = $ = require("jquery");


// require("electron-virtual-keyboard/client")(window, jQuery);
// $(document).ready(function () 
// {
//     $('body').not('[id^=react-select]').on('click', 'input[type=text]', function (e) {
        

//         // if(window.Portal._keyboard !== undefined && window.Portal._keyboard !== null){
//         //     window.Portal._keyboard.hide();
//         // }
//         $(".virtual-keyboard").remove();
//         if(window.Portal.ActiveKeyBoard)
//         {
//             window.Portal.config.LoadKeyBoard();
//             $(e.target).focus();
//             // let ele = this;
//             // if ($(ele).attr("inputmode"))
//             // {
//             //     console.log($(ele).attr("inputmode"));
//             //     if($(ele).attr("inputmode") === "decimal"){
//             //         window.Portal.config.LoadKeyBoard();
//             //         $(ele.target).focus();
//             //     }
//             //     else
//             //     {
//             //         window.Portal.config.LoadKeyBoard();
//             //         $(ele.target).focus();
//             //     }
//             // }
//             // else{
//             //     window.Portal.config.LoadKeyBoard();
//             //     $(ele.target).focus();
//             // }
//         }
//     });


//     $.fn.keyboard_custom_keys['^mykey$'] = {
//         render: function(kb, $key, modifier) {
//             // You can override the key dom element to display anything you
//             // want on the key. On this case, we just replace the key text.
//             $key.text('Special Key');
//         },
//         handler: function(kb, $key) {
//             // This key simply switche the keyboard keyout to a custom one
//             // called 'special'.
//             kb.showLayout('special');
//         }
//     };

//     $.fn.keyboard_custom_keys['^myClose$'] = {
//         render: function(kb, $key, modifier) {
//             // You can override the key dom element to display anything you
//             // want on the key. On this case, we just replace the key text.
//             $key.text('Close');
//         },
//         handler: function(kb, $key) {
//             // This key simply switche the keyboard keyout to a custom one
//             // called 'special'.
//             kb.hide();
//             kb.showLayout('Close');
//         }
//     };
// });

// (function () {

   

//     var GlobalFun = {
//         LoadKeyBoard: function () {
//            var keyboard = $('input[type=text]').not('[id^=react-select]').keyboard({ theme: "theme-mac",
//             layout:{
//                 "normal": [
//                     "q w e r t y u i o p",
//                     "a s d f g h j k l",
//                     "{caps:*} z x c v b n m {backspace:*} {myClose}",
//                     "{numeric} , {space:*} .  {enter}"
//                 ],
//                 "shift": [
//                     "Q W E R T Y U I O P",
//                     "A S D F G H J K L",
//                     "{lower:*} Z X C V B N M {backspace:*} {myClose}",
//                     "{numeric} , {space:*} . {enter}"
//                 ],
//                 "numeric": [
//                     "1 2 3 4 5 6 7 8 9 0",
//                     "- / : ; ( ) $ & @ \"",
//                     "{symbols:*} {sp} . , ? ! ' {sp} {backspace:*} {myClose}",
//                     "{abc} , {space:*} . {enter}"
//                 ],
//                 "symbols": [
//                     "[ ] { } # % ^ * + =",
//                     "_  | ~ < >",
//                     "{numeric:*} {sp} . , ? ! ' {Sp} {backspace:*} {myClose}",
//                     "{abc} , {space:*} . {enter}"
//                 ]
//             }});
//            // console.log(keyboard);
//            window.Portal._keyboard = keyboard;
//         },
//         LoadNumberKeyBoard : function(){
//           var keyboard = $('input[type=text]').not('[id^=react-select]').keyboard({ theme: "theme-mac",
//            layout:{
//                 "normal": [
//                     "7 8 9",
//                     "4 5 6",
//                     "1 2 3",
//                     ". 0 {backspace:*}",
//                     "{myClose}"
//                 ],
//             }});
//             window.Portal._keyboard = keyboard;
//         }
//     };
//     window.Portal =
//     {
//         config: GlobalFun,
//         _keyboard:null,
//         ActiveKeyBoard:false
//     };
// })();


// // {
// //     "normal": {
// //         "_events": {},
// //         "_eventsCount": 0,
// //         "layout": [
// //             "q w e r t y u i o p",
// //             "a s d f g h j k l",
// //             "{caps:*} z x c v b n m {backspace:*}",
// //             "{numeric} , {space:*} .  {enter}"
// //         ],
// //         "$container": {
// //             "0": {
// //                 "jQuery360056763145600863641": {
// //                     "display": "",
// //                     "events": {
// //                         "touchstart": [
// //                             {
// //                                 "type": "touchstart",
// //                                 "origType": "touchstart",
// //                                 "guid": 12,
// //                                 "namespace": ""
// //                             }
// //                         ],
// //                         "mousedown": [
// //                             {
// //                                 "type": "mousedown",
// //                                 "origType": "mousedown",
// //                                 "guid": 12,
// //                                 "namespace": ""
// //                             }
// //                         ]
// //                     }
// //                 }
// //             },
// //             "length": 1
// //         },
// //         "name": "normal",
// //         "config": {
// //             "individual": false,
// //             "theme": "theme-mac",
// //             "show": false,
// //             "displayOnFocus": true,
// //             "container": null,
// //             "autoPosition": true,
// //             "layout": {
// //                 "normal": [
// //                     "q w e r t y u i o p",
// //                     "a s d f g h j k l",
// //                     "{caps:*} z x c v b n m {backspace:*}",
// //                     "{numeric} , {space:*} .  {enter}"
// //                 ],
// //                 "shift": [
// //                     "Q W E R T Y U I O P",
// //                     "A S D F G H J K L",
// //                     "{lower:*} Z X C V B N M {backspace:*}",
// //                     "{numeric} , {space:*} . {enter}"
// //                 ],
// //                 "numeric": [
// //                     "1 2 3 4 5 6 7 8 9 0",
// //                     "- / : ; ( ) $ & @ \"",
// //                     "{symbols:*} {sp} . , ? ! ' {sp} {backspace:*}",
// //                     "{abc} , {space:*} . {enter}"
// //                 ],
// //                 "symbols": [
// //                     "[ ] { } # % ^ * + =",
// //                     "_  | ~ < >",
// //                     "{numeric:*} {sp} . , ? ! ' {Sp} {backspace:*}",
// //                     "{abc} , {space:*} . {enter}"
// //                 ]
// //             },
// //             "keyTemplate": "<span class=\"key\"></span>",
// //             "customKeys": {
// //                 "^[`0-9~!@#$%^&*()_+-=]$": {},
// //                 "^enter$": {},
// //                 "^shift$": {},
// //                 "^numeric$": {},
// //                 "^abc$": {},
// //                 "^symbols$": {},
// //                 "^caps$": {},
// //                 "^lower$": {},
// //                 "^space$": {},
// //                 "^tab$": {},
// //                 "^backspace$": {},
// //                 "^del(ete)?$": {},
// //                 "^sp$": {},
// //                 "^mykey$": {},
// //                 "^myClose$": {}
// //             }
// //         },
// //         "$layoutContainer": {
// //             "0": {},
// //             "length": 1
// //         }
// //     },
// //     "shift": {
// //         "_events": {},
// //         "_eventsCount": 0,
// //         "layout": [
// //             "Q W E R T Y U I O P",
// //             "A S D F G H J K L",
// //             "{lower:*} Z X C V B N M {backspace:*}",
// //             "{numeric} , {space:*} . {enter}"
// //         ],
// //         "$container": {
// //             "0": {
// //                 "jQuery360056763145600863641": {
// //                     "display": "",
// //                     "events": {
// //                         "touchstart": [
// //                             {
// //                                 "type": "touchstart",
// //                                 "origType": "touchstart",
// //                                 "guid": 12,
// //                                 "namespace": ""
// //                             }
// //                         ],
// //                         "mousedown": [
// //                             {
// //                                 "type": "mousedown",
// //                                 "origType": "mousedown",
// //                                 "guid": 12,
// //                                 "namespace": ""
// //                             }
// //                         ]
// //                     }
// //                 }
// //             },
// //             "length": 1
// //         },
// //         "name": "shift",
// //         "config": {
// //             "individual": false,
// //             "theme": "theme-mac",
// //             "show": false,
// //             "displayOnFocus": true,
// //             "container": null,
// //             "autoPosition": true,
// //             "layout": {
// //                 "normal": [
// //                     "q w e r t y u i o p",
// //                     "a s d f g h j k l",
// //                     "{caps:*} z x c v b n m {backspace:*}",
// //                     "{numeric} , {space:*} .  {enter}"
// //                 ],
// //                 "shift": [
// //                     "Q W E R T Y U I O P",
// //                     "A S D F G H J K L",
// //                     "{lower:*} Z X C V B N M {backspace:*}",
// //                     "{numeric} , {space:*} . {enter}"
// //                 ],
// //                 "numeric": [
// //                     "1 2 3 4 5 6 7 8 9 0",
// //                     "- / : ; ( ) $ & @ \"",
// //                     "{symbols:*} {sp} . , ? ! ' {sp} {backspace:*}",
// //                     "{abc} , {space:*} . {enter}"
// //                 ],
// //                 "symbols": [
// //                     "[ ] { } # % ^ * + =",
// //                     "_  | ~ < >",
// //                     "{numeric:*} {sp} . , ? ! ' {Sp} {backspace:*}",
// //                     "{abc} , {space:*} . {enter}"
// //                 ]
// //             },
// //             "keyTemplate": "<span class=\"key\"></span>",
// //             "customKeys": {
// //                 "^[`0-9~!@#$%^&*()_+-=]$": {},
// //                 "^enter$": {},
// //                 "^shift$": {},
// //                 "^numeric$": {},
// //                 "^abc$": {},
// //                 "^symbols$": {},
// //                 "^caps$": {},
// //                 "^lower$": {},
// //                 "^space$": {},
// //                 "^tab$": {},
// //                 "^backspace$": {},
// //                 "^del(ete)?$": {},
// //                 "^sp$": {},
// //                 "^mykey$": {},
// //                 "^myClose$": {}
// //             }
// //         },
// //         "$layoutContainer": {
// //             "0": {},
// //             "length": 1
// //         }
// //     },
// //     "numeric": {
// //         "_events": {},
// //         "_eventsCount": 0,
// //         "layout": [
// //             "1 2 3 4 5 6 7 8 9 0",
// //             "- / : ; ( ) $ & @ \"",
// //             "{symbols:*} {sp} . , ? ! ' {sp} {backspace:*}",
// //             "{abc} , {space:*} . {enter}"
// //         ],
// //         "$container": {
// //             "0": {
// //                 "jQuery360056763145600863641": {
// //                     "display": "",
// //                     "events": {
// //                         "touchstart": [
// //                             {
// //                                 "type": "touchstart",
// //                                 "origType": "touchstart",
// //                                 "guid": 12,
// //                                 "namespace": ""
// //                             }
// //                         ],
// //                         "mousedown": [
// //                             {
// //                                 "type": "mousedown",
// //                                 "origType": "mousedown",
// //                                 "guid": 12,
// //                                 "namespace": ""
// //                             }
// //                         ]
// //                     }
// //                 }
// //             },
// //             "length": 1
// //         },
// //         "name": "numeric",
// //         "config": {
// //             "individual": false,
// //             "theme": "theme-mac",
// //             "show": false,
// //             "displayOnFocus": true,
// //             "container": null,
// //             "autoPosition": true,
// //             "layout": {
// //                 "normal": [
// //                     "q w e r t y u i o p",
// //                     "a s d f g h j k l",
// //                     "{caps:*} z x c v b n m {backspace:*}",
// //                     "{numeric} , {space:*} .  {enter}"
// //                 ],
// //                 "shift": [
// //                     "Q W E R T Y U I O P",
// //                     "A S D F G H J K L",
// //                     "{lower:*} Z X C V B N M {backspace:*}",
// //                     "{numeric} , {space:*} . {enter}"
// //                 ],
// //                 "numeric": [
// //                     "1 2 3 4 5 6 7 8 9 0",
// //                     "- / : ; ( ) $ & @ \"",
// //                     "{symbols:*} {sp} . , ? ! ' {sp} {backspace:*}",
// //                     "{abc} , {space:*} . {enter}"
// //                 ],
// //                 "symbols": [
// //                     "[ ] { } # % ^ * + =",
// //                     "_  | ~ < >",
// //                     "{numeric:*} {sp} . , ? ! ' {Sp} {backspace:*}",
// //                     "{abc} , {space:*} . {enter}"
// //                 ]
// //             },
// //             "keyTemplate": "<span class=\"key\"></span>",
// //             "customKeys": {
// //                 "^[`0-9~!@#$%^&*()_+-=]$": {},
// //                 "^enter$": {},
// //                 "^shift$": {},
// //                 "^numeric$": {},
// //                 "^abc$": {},
// //                 "^symbols$": {},
// //                 "^caps$": {},
// //                 "^lower$": {},
// //                 "^space$": {},
// //                 "^tab$": {},
// //                 "^backspace$": {},
// //                 "^del(ete)?$": {},
// //                 "^sp$": {},
// //                 "^mykey$": {},
// //                 "^myClose$": {}
// //             }
// //         },
// //         "$layoutContainer": {
// //             "0": {},
// //             "length": 1
// //         }
// //     },
// //     "symbols": {
// //         "_events": {},
// //         "_eventsCount": 0,
// //         "layout": [
// //             "[ ] { } # % ^ * + =",
// //             "_  | ~ < >",
// //             "{numeric:*} {sp} . , ? ! ' {Sp} {backspace:*}",
// //             "{abc} , {space:*} . {enter}"
// //         ],
// //         "$container": {
// //             "0": {
// //                 "jQuery360056763145600863641": {
// //                     "display": "",
// //                     "events": {
// //                         "touchstart": [
// //                             {
// //                                 "type": "touchstart",
// //                                 "origType": "touchstart",
// //                                 "guid": 12,
// //                                 "namespace": ""
// //                             }
// //                         ],
// //                         "mousedown": [
// //                             {
// //                                 "type": "mousedown",
// //                                 "origType": "mousedown",
// //                                 "guid": 12,
// //                                 "namespace": ""
// //                             }
// //                         ]
// //                     }
// //                 }
// //             },
// //             "length": 1
// //         },
// //         "name": "symbols",
// //         "config": {
// //             "individual": false,
// //             "theme": "theme-mac",
// //             "show": false,
// //             "displayOnFocus": true,
// //             "container": null,
// //             "autoPosition": true,
// //             "layout": {
// //                 "normal": [
// //                     "q w e r t y u i o p",
// //                     "a s d f g h j k l",
// //                     "{caps:*} z x c v b n m {backspace:*}",
// //                     "{numeric} , {space:*} .  {enter}"
// //                 ],
// //                 "shift": [
// //                     "Q W E R T Y U I O P",
// //                     "A S D F G H J K L",
// //                     "{lower:*} Z X C V B N M {backspace:*}",
// //                     "{numeric} , {space:*} . {enter}"
// //                 ],
// //                 "numeric": [
// //                     "1 2 3 4 5 6 7 8 9 0",
// //                     "- / : ; ( ) $ & @ \"",
// //                     "{symbols:*} {sp} . , ? ! ' {sp} {backspace:*}",
// //                     "{abc} , {space:*} . {enter}"
// //                 ],
// //                 "symbols": [
// //                     "[ ] { } # % ^ * + =",
// //                     "_  | ~ < >",
// //                     "{numeric:*} {sp} . , ? ! ' {Sp} {backspace:*}",
// //                     "{abc} , {space:*} . {enter}"
// //                 ]
// //             },
// //             "keyTemplate": "<span class=\"key\"></span>",
// //             "customKeys": {
// //                 "^[`0-9~!@#$%^&*()_+-=]$": {},
// //                 "^enter$": {},
// //                 "^shift$": {},
// //                 "^numeric$": {},
// //                 "^abc$": {},
// //                 "^symbols$": {},
// //                 "^caps$": {},
// //                 "^lower$": {},
// //                 "^space$": {},
// //                 "^tab$": {},
// //                 "^backspace$": {},
// //                 "^del(ete)?$": {},
// //                 "^sp$": {},
// //                 "^mykey$": {},
// //                 "^myClose$": {}
// //             }
// //         },
// //         "$layoutContainer": {
// //             "0": {},
// //             "length": 1
// //         }
// //     }
// // }