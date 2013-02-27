(function ($, window, document) {
    'use strict';

    var pluginName = 'Slider',
        defaults = {
            value : 0,
            sliderWidth: 80
        };

    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    Plugin.prototype.init = function() {
        this.outputValue = 0;

        this.$bar = $("<div>").addClass('slider-bar');
        this.$knob = $("<div>").addClass('knob');

        $([this.$bar, this.$knob]).appendTo(this.$el);

        var left = $("<span>").addClass('slider-left');
        var right = $("<span>").addClass('slider-right');
        var middle = $("<span>").addClass('slider-middle');

        $([left, middle, right]).appendTo(this.$bar);

        this.$bar.find('.slider-middle').width(this.options.sliderWidth+'px');

        this.setStartValue();

        this.$knob.bind('mousedown', function(event) {
            this.startDrag(event);
        }.bind(this));
    };

    Plugin.prototype.startDrag = function(event) {
        var lastX = event.pageX;

        $(document).bind('mouseup.slider.drag', function() {
            this.unbindSliderDrag();

            var sliderPos = parseInt(this.$knob.css('left'), 10);

            if (sliderPos > this.sliderWidth) {
                return;
            }

            var data = {
                type: this.$el.attr('id'),
                value: this.getSliderValue(sliderPos)
            };

            $(document).trigger("slider.change", data);

        }.bind(this));

        $(document).bind('mousemove.slider.drag', function(event) {
            this.setSliderPosition(event.pageX - lastX);
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
    };


    Plugin.prototype.setStartValue = function() {
        var sliderWidth = this.options.sliderWidth;
        var knob = this.$knob.width();
        var pos = (this.options.value * sliderWidth) - (knob / 2);
        this.$knob.css('left', + pos + 'px');
    }

    Plugin.prototype.getSliderValue = function (pos) {
        var knobOffset = pos + (this.$knob.width() / 2);
        var sliderWidth = this.options.sliderWidth;
        return Math.ceil((knobOffset / sliderWidth)* 10) / 10;
    };

    Plugin.prototype.setSliderPosition = function (xMov) {
        var knob = this.$knob.width();
        var leftMovment = xMov < 0;
        var rightMovment = xMov > 0;
        var leftest = (0 - (knob / 2));
        var rightest = this.options.sliderWidth - (knob / 2);
        var step = this.$knob.position().left + xMov;
        var leftLimit = leftMovment && (step < leftest);
        var rightLimit = rightMovment && (step > rightest);
        var pos = this.$knob.position().left + xMov;

        if (leftLimit || rightLimit) {
            return;
        }

        this.$knob.css('left', + pos + 'px');
    };

    Plugin.prototype.unbindSliderDrag = function () {
        $(document).unbind('mousemove.slider.drag');
        $(document).unbind('mouseup.slider.drag');
    };

    Plugin.prototype.disable = function (event) {
        // If there is a wrapper to the slider, disable it, else disable the slider itself
        if (this.$el.parent().hasClass("slider-container")) {
            this.$el.parent().addClass('disable');
        }
        else {
            this.$el.addClass('disable');
        }

        this.$knob.unbind('mousedown');
    };

    Plugin.prototype.enable = function(event) {
        // If there is a wrapper to the slider, enable it, else enable the slider itself
        if (this.$el.parent().hasClass("slider-container")) {
            this.$el.parent().removeClass('disable');
        }
        else {
            this.$el.removeClass('disable');
        }

        this.$knob.bind('mousedown', function(event) {
            this.startDrag(event);
        }.bind(this));
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);