(function ($, window, document) {
    'use strict';

    var pluginName = 'Radio',
        defaults = {};

    // The actual plugin constructor
    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    Plugin.prototype.init = function() {
        if (this.options.el) {
            this._btnGroup = $(this.$el).find(this.options.el);
        } else {
            this._btnGroup = $(this.$el).children();
        }

        $(this._btnGroup).each(function(btn) {
            var check = $('<span>').addClass('check');
            var btn = $(this[btn]);
            btn.prepend(check);
        }.bind(this._btnGroup));

        $(this._btnGroup[this.options.checked]).addClass('checked');

        this.$el.on('click', function (e) {
            this.checkRadio($(e.target));
        }.bind(this));
    };

    Plugin.prototype.checkRadio = function (el) {
        if (el.hasClass('checked')) {
            return;
        }

        if (el.hasClass('radiobuttons')) {
            return;
        }

        if (!el.hasClass('radiobutton')) {
            el = el.parent();
        }

        $(this._btnGroup).each(function(btn) {
            $(this[btn]).removeClass('checked');
        }.bind(this._btnGroup));


        el.addClass('checked');

        var data = {
            type: el.attr('id'),
            checked: true
        }

        $(document).trigger('radioButton.change', data);
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