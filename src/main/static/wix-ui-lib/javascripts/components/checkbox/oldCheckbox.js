(function ($, window, document) {
	'use strict';

	var pluginName = 'Checkbox',

	defaults = {};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.$el = $(element);
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	Plugin.prototype.init = function() {
        this._btnGroup = $(this.$el).children();

        $(this._btnGroup).each(function(btn) {
            var check = $('<span>').addClass('check');
            var btn = $(this[btn]);
            btn.prepend(check);
        }.bind(this._btnGroup));

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

            $(document).trigger('checkboxChanged', data);

        }.bind(this));

        var checkedItems = this.options.checked;

        // if button group donesn't match the data spec, ignore
        if (this._btnGroup.length < checkedItems.length) {
            return;
        }

        for (var i=0; i<checkedItems.length; i++) {
            $(this._btnGroup[checkedItems[i]]).addClass('checked');
        }
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