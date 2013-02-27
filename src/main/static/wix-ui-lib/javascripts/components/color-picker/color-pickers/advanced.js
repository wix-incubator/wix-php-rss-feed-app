/**
 * base 64 decode/encode polyfill
 */
(function () {

    var
        object = typeof window != 'undefined' ? window : exports,
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        INVALID_CHARACTER_ERR = (function () {
            // fabricate a suitable error object
            try { document.createElement('$'); }
            catch (error) { return error; }}());

    // encoder
    // [https://gist.github.com/999166] by [https://github.com/nignag]
    object.btoa || (
        object.btoa = function (input) {
            for (
                // initialize result and counter
                var block, charCode, idx = 0, map = chars, output = '';
                // if the next input index does not exist:
                //   change the mapping table to "="
                //   check if d has no fractional digits
                input.charAt(idx | 0) || (map = '=', idx % 1);
                // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
                output += map.charAt(63 & block >> 8 - idx % 1 * 8)
                ) {
                charCode = input.charCodeAt(idx += 3/4);
                if (charCode > 0xFF) throw INVALID_CHARACTER_ERR;
                block = block << 8 | charCode;
            }
            return output;
        });

    // decoder
    // [https://gist.github.com/1020396] by [https://github.com/atk]
    object.atob || (
        object.atob = function (input) {
            input = input.replace(/=+$/, '')
            if (input.length % 4 == 1) throw INVALID_CHARACTER_ERR;
            for (
                // initialize result and counters
                var bc = 0, bs, buffer, idx = 0, output = '';
                // get next character
                buffer = input.charAt(idx++);
                // character found in table? initialize bit storage and add its ascii value;
                ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
                ) {
                // try to find character in table (0-63, not found => -1)
                buffer = chars.indexOf(buffer);
            }
            return output;
        });

}());

(function ($, window, document, undefined) {
    'use strict';

    var pluginName = 'AdvancedColorPicker',

        defaults = {
            initColor : '#20872',
            palettePicker : "acpPalettePicker",
            paletteSlider : "acpPaletteSlider",
            slider : "acpSlider",
            selector : "acpSelector",
            template:
                "<div class=\"advanced-color-palette\">" +
                    "<div id=\"acpPalettePicker\" class=\"acp-picker-palette\">" +
                    "<div id=\"acpSelector\" class=\"acp-selector\"></div>" +
                    "</div>" +
                    "<div id=\"acpPaletteSlider\" class=\"acp-slider-palette\">" +
                    "<div id=\"acpSlider\" class=\"acp-slider\"></div>" +
                    "</div>"  +
                "</div>" +
                "<div class=\"readouts\">" +
                    "<label>H<input type=\"text\" id=\"acpReadoutInput_H\" class=\"acp-readout-input\"/>&deg;</label>" +
                    "<label>S<input type=\"text\" id=\"acpReadoutInput_S\" class=\"acp-readout-input\"/>%</label>" +
                    "<label>L<input type=\"text\" id=\"acpReadoutInput_L\" class=\"acp-readout-input\"/>%</label>" +
                    "<hr/>" +
                    "<label id=\"acpReadout_HEX\">Hex #<input type=\"text\" id=\"acpReadoutInput_HEX\" class=\"acp-readout-input\"/></label>" +
                "</div>",
            draggable : false,
            readout : "acpReadoutWrapper",
            readoutInput: "acpReadoutInput",
            readouts: ['H', 'S', 'L', 'HEX'],
            palettePickerSize : 150,
            paletteSliderHeight: 150,
            sliderHeight : 12,
            selectorSize : 10
        };

    // Contain the present location of the slider bar
    var _sliderPosY = 0;

    // Private members for holding the two formats of the color
    var _hexColor = 0;
    var _hslParts = 0;

    window.ieG = (function (dir, stops) {
        var grd = {
            open : '<?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.0" width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>',
            close : '</linearGradient></defs><rect width="100%" height="100%" style="fill:url(#g);" /></svg>',
            dirs : {
                left : 'x1="0%" y1="0%" x2="100%" y2="0%"',
                right : 'x1="100%" y1="0%" x2="0%" y2="0%"',
                top : 'x1="0%" y1="0%" x2="0%" y2="100%"',
                bottom : 'x1="0%" y1="100%" x2="0%" y2="0%"'
            }
        };
        return function (dir, stops) {
            var r = '<linearGradient id="g" ' + grd.dirs[dir] + ' spreadMethod="pad">';
            stops.forEach(function (stop) {
                r += '<stop offset="' + stop.offset + '" stop-color="' + stop.color + '" stop-opacity="' + stop.opacity + '"/>';
            });
            r = 'data:image/svg+xml;base64,' + btoa(grd.open + r + grd.close);
            return r;
        };
    })();

    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = $.extend({}, Plugin.prototype, {

        Constants: {
            hslGrad: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PiA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgdmVyc2lvbj0iMS4wIiB3aWR0aD0iMTAwJSIgICAgIGhlaWdodD0iMTAwJSIgICAgICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPiAjRkYwMDAwLCAjRkZGRjAwLCAjMDBGRjAwLCAjMDBGRkZGLCAjMDAwMEZGLCAjRkYwMEZGLCAjRkYwMDAwICAgPGRlZnM+ICAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im15TGluZWFyR3JhZGllbnQxIiAgICAgICAgICAgICAgICAgICAgIHgxPSIwJSIgeTE9IjAlIiAgICAgICAgICAgICAgICAgICAgIHgyPSIwJSIgeTI9IjEwMCUiICAgICAgICAgICAgICAgICAgICAgc3ByZWFkTWV0aG9kPSJwYWQiPiAgICAgICA8c3RvcCBvZmZzZXQ9IjAlIiAgIHN0b3AtY29sb3I9IiNGRjAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPiAgICAgICA8c3RvcCBvZmZzZXQ9IjIwJSIgICBzdG9wLWNvbG9yPSIjRkZGRjAwIiBzdG9wLW9wYWNpdHk9IjEiLz4gICAgICAgPHN0b3Agb2Zmc2V0PSI0MCUiICAgc3RvcC1jb2xvcj0iIzAwRkYwMCIgc3RvcC1vcGFjaXR5PSIxIi8+ICAgICAgIDxzdG9wIG9mZnNldD0iNjAlIiAgIHN0b3AtY29sb3I9IiMwMDAwRkYiIHN0b3Atb3BhY2l0eT0iMSIvPiAgICAgICA8c3RvcCBvZmZzZXQ9IjgwJSIgc3RvcC1jb2xvcj0iI0ZGMDBGRiIgc3RvcC1vcGFjaXR5PSIxIi8+ICAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGMDAwMCIgc3RvcC1vcGFjaXR5PSIxIi8+ICAgICA8L2xpbmVhckdyYWRpZW50PiAgIDwvZGVmcz4gICAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgICAgICBzdHlsZT0iZmlsbDp1cmwoI215TGluZWFyR3JhZGllbnQxKTsiIC8+IDwvc3ZnPg==',
            photoshopG1: window.ieG('bottom', [{
                offset : '0%',
                color : 'black',
                opacity : '1'
            }, {
                offset : '100%',
                color : 'black',
                opacity : '0'
            }])
        },

        init: function() {
            this.setContent();
            this.setConstants();
            this.InitColorFormats();
            this.renderSlider();
            this.setSliderPos(this._hslParts.h);
            this.renderPicker(this.parseHslColor(this.multHslParts(this._hslParts)));
            this.setSelectorPos(this._hslParts);
            this.$el.find('#' + this.options.readoutInput + "_" + this.options.readouts[3]).val(this._hexColor.toUpperCase());
            this.updateHslReadoutValues(this.multHslParts(this._hslParts));
            this.bindEvents();
        },

        setContent: function() {
            this.$el.addClass('advanced-viewer');
            $(this.options.template).appendTo(this.$el);
            this.$el.parent().css('overflow','hidden');
        },

        paddingHex: function(hex) {
            var hexStr = hex.toString().replace('#', '');

            while (hexStr.length < 6) {
                hexStr = '0' + hexStr;
            }

            return hexStr;
        },

        createReadout: function(name) {
            var opt = this.options;

            var input = $('<input>', {
                id: opt.readoutInput + "_" + name,
                class: "acp-readout-input"
            });

            return $('<div>', {
                id: opt.readout + "_" + name,
                class: "acp-readout"
            }).append(input);
        },

        updateHslReadoutValues: function(hslParts) {
            var opt = this.options;

            this.$el.find('#' + opt.readoutInput + "_" + opt.readouts[0]).val(Math.floor(hslParts.h));
            this.$el.find('#' + opt.readoutInput + "_" + opt.readouts[1]).val(Math.floor(hslParts.s));
            this.$el.find('#' + opt.readoutInput + "_" + opt.readouts[2]).val(Math.floor(hslParts.l));
        },

        getHslColor : function(colorHex, parse) {
            var hslParts = this.convertHexToHslParts(colorHex);
            hslParts = this.multHslParts(hslParts);

            return parse? this.parseHslColor(hslParts) : hslParts;
        },

        multHslParts : function(hslParts) {
            return {
                h: hslParts.h *360,
                s: hslParts.s * 100,
                l: hslParts.l * 100
            };
        },

        setConstants: function() {
            var opt = this.options;

            this._SLIDER_PALETTE_HEIGHT = opt.paletteSliderHeight;
            this._PICKER_PALETTE_HEIGHT = opt.palettePickerSize;
            this._PICKER_PALETTE_WIDTH = opt.palettePickerSize;
            this._SLIDER_OFFSET = opt.sliderHeight / 2;
            this._SELECTOR_OFFSET_X = opt.selectorSize / 2;
            this._SELECTOR_OFFSET_Y = opt.selectorSize / 2;
        },

        renderPicker: function(color) {
            var opt = this.options;
            var palettePicker = this.$el.find('#' + opt.palettePicker);
            if (window.ieG) {
                var photoshopG2 = window.ieG('left', [
                    {
                        offset : '0%',
                        color : color,
                        opacity : '1'
                    },
                    {
                        offset : '100%',
                        color : 'white',
                        opacity : '1'
                    }
                ]);
                palettePicker.css("background-image", 'url("' + this.Constants.photoshopG1 + '"),url("' + photoshopG2 + '")');
            } else {
                palettePicker.css("background-image", '-webkit-linear-gradient(bottom, black, rgba(0,0,0,0)),-webkit-linear-gradient(left, ' + color + ', white)');
                palettePicker.css("background-image", '-moz-linear-gradient(bottom, black, rgba(0,0,0,0)),-moz-linear-gradient(left, ' + color + ', white)');
            }
        },

        renderSlider: function() {
            var opt = this.options;
            var sliderPlt = this.$el.find('#' + opt.paletteSlider);

            if (window.ieG) {
                sliderPlt.css("background-image", 'url("' + this.Constants.hslGrad + '")');
            } else {
                sliderPlt.css("background-image", '-webkit-linear-gradient(top, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)');
                sliderPlt.css("background-image", '-moz-linear-gradient(top, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)');
            }
        },

        colorFromPosPicker: function(pos) {
            var hVal = (this._sliderPosY/ (this._SLIDER_PALETTE_HEIGHT - 1)) * 360;
            var sVal = 100 - pos.x * 100;
            var lVal = (pos.y * -50) + (50 * pos.x) + 50 - (pos.y * pos.x * 50);

            return { h : hVal, s : sVal, l : lVal };
        },

        colorFromPosSlider: function(pos) {
            return {h : pos.y * 360, s : 100, l : 50 };
        },

        convertHexToHslParts: function(colorHex) {
            colorHex = this.paddingHex(colorHex);

            if (colorHex === "000000") {
                return {
                    h : 0,
                    s : 0,
                    l : 0
                }
            }

            var colorRgb = this.Utils.hexToRgb(colorHex);
            var colorHsl = this.Utils.rgbToHsv(colorRgb.r, colorRgb.g, colorRgb.b);

            return {
                h : colorHsl[0],
                s : colorHsl[1],
                l : colorHsl[2]
            };
        },

        setSelectorPos: function(hslParts) {
            var opt = this.options;
            var pos = { x : 0, y : 0 };

            pos.x = ((100 - (hslParts.s * 100)) / 100);
            pos.y = (((hslParts.l * 100) + (-50 * pos.x) - 50) / ((-50 * pos.x) - 50));
            pos.y = pos.y * (this._PICKER_PALETTE_HEIGHT - 1);
            pos.x = pos.x * (this._PICKER_PALETTE_WIDTH - 1);

            var selector = this.$el.find('#' + opt.selector);

            selector.css("top", parseInt(pos.y - this._SELECTOR_OFFSET_Y) + 'px');
            selector.css("left", parseInt(pos.x - this._SELECTOR_OFFSET_X) + 'px');
        },

        setSliderPos: function(hPart) {
            var opt = this.options;

            this._sliderPosY =  (hPart * (this._SLIDER_PALETTE_HEIGHT - 1));

            this.$el.find('#' + opt.slider).css("top", this._sliderPosY - this._SLIDER_OFFSET);
        },

        parseHslColor: function(hsl) {
            return 'hsl(' + hsl.h + ', ' + hsl.s + '% , ' + hsl.l + '%)';
        },

        offsetPosFromEvent: function(e) {
            return {
                x : (e.offsetX || (e.clientX - e.target.offsetLeft)),
                y : (e.offsetY || (e.clientY - e.target.offsetTop))
            };
        },

        RenderByHslInputs: function() {
            var opt = this.options;
            var hsl = { h: 0, s: 0, l:0 };
            hsl.h = this.$el.find('#' + opt.readoutInput + "_" + opt.readouts[0]).val();
            hsl.s = this.$el.find('#' + opt.readoutInput + "_" + opt.readouts[1]).val();
            hsl.l = this.$el.find('#' + opt.readoutInput + "_" + opt.readouts[2]).val();

            var hslFormat = this.parseHslColor(hsl);
            this.renderPicker(hslFormat);

            this._hslParts.h = (hsl.h / 360).toFixed(3);
            this._hslParts.s = (hsl.s / 100).toFixed(3);
            this._hslParts.l = (hsl.l / 100).toFixed(3);

            this.setHexValue(this._hslParts);

            this.setSliderPos(this._hslParts.h);
            this.setSelectorPos(this._hslParts);
        },

        setHexValue : function (hslParts) {
            var opt = this.options;

            this._hexColor = this.convertHslToHex(hslParts);
            this.$el.find('#' + opt.readoutInput + "_" + opt.readouts[3]).val(this._hexColor);
        },

        colorChanged : function (color) {
            this.$el.trigger('colorChangedPreview', {
                hex: '#' + this._hexColor,
                hsl: color
            });
        },

        unbindSliderDrag: function() {
            $(document).unbind('mousemove.slider.drag');
            $(document).unbind('mouseup.slider.drag');
        },

        setSliderPosition: function($slider, $bar, newPos) {

            this._sliderPosY = newPos.y;

            newPos.x = newPos.x / ($bar.width() - 1);
            newPos.y = newPos.y / ($bar.height() - 1);

            var color = this.colorFromPosSlider(newPos);

            this.renderPicker(this.parseHslColor(color));

            this._hslParts = {h: (color.h / 360).toFixed(3), s: (color.s / 100).toFixed(3), l: (color.l/ 100).toFixed(3)};
            this.updateHslReadoutValues(color);

            this.setHexValue(this._hslParts);

            this.colorChanged(this.parseHslColor(color));
        },

        unbindSelectorDrag: function() {
            $(document).unbind('mousemove.selector.drag');
            $(document).unbind('mouseup.selector.drag');
        },

        setSelectorPosition: function($selector, $palette, newPos) {

            newPos.x = newPos.x / ($palette.width() - 1);
            newPos.y = newPos.y / ($palette.height() - 1);

            var color = this.colorFromPosPicker(newPos);

            this._hslParts = {h: (color.h / 360).toFixed(3), s: (color.s / 100).toFixed(3), l: (color.l/ 100).toFixed(3)};
            this.updateHslReadoutValues(color);

            this.setHexValue(this._hslParts);

            this.colorChanged(this.parseHslColor(color));
        },

        bindEvents : function () {
            var $slider = this.$el.find('#' + this.options.slider);
            var $paletteSlider = this.$el.find('#' + this.options.paletteSlider);
            var $selector = this.$el.find('#' + this.options.selector);
            var $palettePicker = this.$el.find('#' + this.options.palettePicker);

            $slider.bind('mousedown', function(event) {
                var lastY = event.pageY;
                $(document).bind('mouseup.slider.drag', function() {
                    this.unbindSliderDrag();

                }.bind(this));

                $(document).bind('mousemove.slider.drag', function(event) {

                    var yMov = (event.pageY - lastY);
                    var newPos = {x: 0, y: 0};
                    newPos.y = $slider.position().top + yMov;
                    newPos.x = $slider.position().left;

                    if ( ((yMov < 0) && (newPos.y  <= (0 - this._SLIDER_OFFSET))) ||
                        (yMov >= 0) && (newPos.y > ($paletteSlider.height() - 1 - this._SLIDER_OFFSET))) {
                        return;
                    }

                    $slider.css('top', + newPos.y + 'px');
                    newPos.y = newPos.y + this._SLIDER_OFFSET;
                    this.setSliderPosition($slider, $paletteSlider, newPos);

                    lastY = event.pageY;
                }.bind(this));

                // cancel out any text selections
                document.body.focus();

                // prevent text selection in IE
                document.onselectstart = function () { return false; };
                // prevent IE from trying to drag an image
                event.target.ondragstart = function() { return false; };

                // prevent text selection (except IE)
                return false;
            }.bind(this));

            $paletteSlider.click( function(e) {
                var opt = this.options;

                if (e.target.className === 'acp-slider') {
                    return;
                }

                var newPos = this.offsetPosFromEvent(e);

                $slider.css('top', + (newPos.y - this._SLIDER_OFFSET) + 'px');

                this.setSliderPosition($slider, $paletteSlider, newPos);

                return false;

            }.bind(this));

            $selector.bind('mousedown', function(event) {
                var lastY = event.pageY;
                var lastX = event.pageX;

                $(document).bind('mouseup.selector.drag', function() {
                    this.unbindSelectorDrag();

                }.bind(this));

                $(document).bind('mousemove.selector.drag', function(event) {

                    var yMov = (event.pageY - lastY);
                    var xMov = (event.pageX - lastX);
                    var newPos = {x: 0, y: 0};
                    newPos.y = $selector.position().top + yMov;
                    newPos.x = $selector.position().left + xMov;

                    if ( ((yMov < 0) && (newPos.y  <= (0 - this._SELECTOR_OFFSET_Y))) ||
                         ((yMov >= 0) && (newPos.y > ($palettePicker.height() - 1 - this._SELECTOR_OFFSET_Y))) ||
                         ((xMov < 0) && (newPos.x  <= (0 - this._SELECTOR_OFFSET_X))) ||
                         ((xMov >= 0) && (newPos.x > ($palettePicker.width() - 1 - this._SELECTOR_OFFSET_X))) ) {
                        return;
                    }

                    $selector.css('top', + newPos.y + 'px');
                    $selector.css('left', + newPos.x + 'px');

                    newPos.y = newPos.y + this._SELECTOR_OFFSET_Y;
                    newPos.x = newPos.x + this._SELECTOR_OFFSET_X;

                    this.setSelectorPosition($selector, $palettePicker, newPos);

                    lastY = event.pageY;
                    lastX = event.pageX;
                }.bind(this));

                // cancel out any text selections
                document.body.focus();

                // prevent text selection in IE
                document.onselectstart = function () { return false; };
                // prevent IE from trying to drag an image
                event.target.ondragstart = function() { return false; };

                // prevent text selection (except IE)
                return false;
            }.bind(this));

            $palettePicker.click( function(e) {
                var opt = this.options;

                if (e.target.className === 'acp-selector') {
                    return;
                }

                var pos = this.offsetPosFromEvent(e);
                var selector = $selector;

                selector.css("top", (pos.y - this._SELECTOR_OFFSET_Y) + 'px');
                selector.css("left", (pos.x - this._SELECTOR_OFFSET_X) + 'px');

                this.setSelectorPosition($selector, $palettePicker, pos);

                return false;

            }.bind(this));

            this.$el.find('.' +  "acp-readout-input").keyup( function (e) {
                if (e.target.id === (this.options.readoutInput + "_" + this.options.readouts[3])) {
                    var hex = this.$el.find('#' + this.options.readoutInput + "_" + this.options.readouts[3]).val();

                    if (hex.length > 6) {
                        return false;
                    }

                    this._hexColor = this.paddingHex(hex);
                    this._hslParts  = this.convertHexToHslParts(hex);

                    this.updateHslReadoutValues(this.multHslParts(this._hslParts));

                    this.setSliderPos(this._hslParts.h);

                    this.renderPicker(this.parseHslColor(this.multHslParts(this._hslParts)));
                    this.setSelectorPos( this._hslParts);
                }
                else {
                    this.RenderByHslInputs();
                }

                this.colorChanged(this.parseHslColor(this.multHslParts(this._hslParts)));
            }.bind(this));
        },

        Utils: {
            rgbToHex: function(r, g, b) {
                r = parseInt(r);
                g = parseInt(g);
                b = parseInt(b);

                return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            },

            hexToRgb: function(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r : parseInt(result[1], 16),
                    g : parseInt(result[2], 16),
                    b : parseInt(result[3], 16)
                }
                    : null;
            },

            rgbToHsv: function(r, g, b) {
                r = r / 255,
                    g = g / 255,
                    b = b / 255;
                var max = Math.max(r, g, b),
                    min = Math.min(r, g, b);
                var h,
                    s,
                    v = max;

                var d = max - min;
                s = max === 0 ? 0 : d / max;

                if (max == min) {
                    h = 0; // achromatic
                } else {
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }

                return [h, s, v];
            },

            hsvToRgb: function(h, s, v) {
                var r,
                    g,
                    b;

                var i = Math.floor(h * 6);
                var f = h * 6 - i;
                var p = v * (1 - s);
                var q = v * (1 - f * s);
                var t = v * (1 - (1 - f) * s);

                switch (i % 6) {
                    case 0:
                        r = v,
                            g = t,
                            b = p;
                        break;
                    case 1:
                        r = q,
                            g = v,
                            b = p;
                        break;
                    case 2:
                        r = p,
                            g = v,
                            b = t;
                        break;
                    case 3:
                        r = p,
                            g = q,
                            b = v;
                        break;
                    case 4:
                        r = t,
                            g = p,
                            b = v;
                        break;
                    case 5:
                        r = v,
                            g = p,
                            b = q;
                        break;
                }

                return [r * 255, g * 255, b * 255];
            }
        },

        convertRgbStrToHex:function (color) {
            var start = color.indexOf("(");
            var rgbColor = color.substring(start + 1, color.length - 1);
            var rgbParts = rgbColor.split(',');
            return this.Utils.rgbToHex(parseInt(rgbParts[0]), parseInt(rgbParts[1]), parseInt(rgbParts[2]));
        },

        convertHslStrToHslParts: function (color) {
            var start = color.indexOf("(");
            var hslStr = color.substring(start + 1, color.length - 1);
            var hslParts = hslStr.split(',');

            return {
                h: (parseInt(hslParts.h) / 360).toFixed(3),
                s: (parseInt(hslParts.s.remove(hslParts.s.length-1)) / 100).toFixed(3),
                l: (parseInt(hslParts.l.remove(hslParts.l.length-1)) / 100).toFixed(3)
            };
        },

        convertHslToHex: function (hslParts) {
            var rgb = this.Utils.hsvToRgb(hslParts.h, hslParts.s, hslParts.l);
            return this.Utils.rgbToHex(rgb[0], rgb[1], rgb[2]);
        },

        divHslParts: function (hslParts) {
            return { h: hslParts / 360, s: hslParts.s / 100, l: hslParts.l / 100};
        },

        InitColorFormats: function() {
            if (this.options.initColor.indexOf('hsl') != -1) {
                this._hslParts = this.convertHslStrToHslParts(this.options.initColor);
                this._hexColor = this.paddingHex(this.convertHslToHex(this._hslParts));
            }
            else if (this.options.initColor.indexOf('rgb') != -1) {
                this._hexColor = this.paddingHex(this.convertRgbStrToHex(this.options.initColor));
                this._hslParts = this.convertHexToHslParts(this._hexColor);
            }
            else {
                this._hexColor = this.paddingHex(this.options.initColor);
                this._hslParts = this.convertHexToHslParts(this._hexColor);
            }

            this._hslParts = { h: this._hslParts.h.toFixed(3), s: this._hslParts.s.toFixed(3), l: this._hslParts.l.toFixed(3)};
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

