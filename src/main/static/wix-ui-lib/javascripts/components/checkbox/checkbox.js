(function ($, window, document) {
    'use strict';

    var pluginName = 'Checkbox',

        defaults = {
            checked : false
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    Plugin.prototype.init = function() {

        // Check the checkbox according to defaults or the value that was set by the user
        this.options.checked ? this.$el.addClass('checked'): this.$el.removeClass('checked');

        this.$el.on('click', function(e) {
            var el = $(e.target);
            var checked = false;

            if (!el.hasClass('checkbox')) {
                el = el.parent();
            }

            if (el.hasClass('checked')) {
                el.removeClass('checked');
                checked = false;
            } else {
                el.addClass('checked');
                checked = true;
            }

            var data = {
                type: el.attr('id'),
                checked: checked
            }

            $(document).trigger('checkbox.change', data);

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