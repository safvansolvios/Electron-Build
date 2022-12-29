/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable quotes */
var jQuery = $ = require("jquery");


require("electron-virtual-keyboard/client")(window, jQuery);
$(document).ready(function () 
{
    $('body').not('[id^=react-select]').on('click', 'input[type=text]', function (e) {
        if(window.Portal.IsActive){
            window.Portal.config.LoadKeyBoard();
            $(e.target).focus();
        }
    });
    $.fn.keyboard_custom_keys['^mykey$'] = {
        render: function(kb, $key, modifier) {
            // You can override the key dom element to display anything you
            // want on the key. On this case, we just replace the key text.
            $key.text('Special Key');
        },
        handler: function(kb, $key) {
            // This key simply switche the keyboard keyout to a custom one
            // called 'special'.
            alert('hi');
            kb.showLayout('special');
        }
    };

    $.fn.keyboard_custom_keys['^myClose$'] = {
        render: function(kb, $key, modifier) {
            // You can override the key dom element to display anything you
            // want on the key. On this case, we just replace the key text.
            $key.text('Close');
        },
        handler: function(kb, $key) {
            // This key simply switche the keyboard keyout to a custom one
            // called 'special'.
            kb.hide();
            kb.showLayout('Close');
        }
    };
});

(function () {

   

    var GlobalFun = {
        LoadKeyBoard: function () {
            var keyboard = $('input[type=text]').not('[id^=react-select]').keyboard({ theme: "theme-mac", layout: {
                'normal': [
                    '` 1 2 3 4 5 6 7 8 9 0 - = {backspace:*}',
                    ['{tab} q w e r t y u i o p [ ] \\'],
                    ['{sp:2} a s d f g h j k l ; \' {enter}'],
                    ['{shift:*} z x c v b n m , . / {myClose}'],
                    ['{space}', '0']
                ],
                'shift': [
                    '~ ! @ # $ % ^ & * ( ) _ + {backspace:*}',
                    ['{tab} Q W E R T Y U I O P { } |', '7 8 9'],
                    ['{sp:2} A S D F G H J K L : " {enter}', '4 5 6'],
                    ['{shift:*} Z X C V B N M < > ? {shift:*}', '1 2 3'],
                    ['{space}', '0']
                ]
            }
        });
        }
    };
    window.Portal =
    {
        config: GlobalFun,
        IsActive:true
    };
})();