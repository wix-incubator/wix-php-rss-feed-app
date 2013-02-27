(function ($, window, document, undefined) {
	'use strict';

	var pluginName = 'Accordion',
	defaults = {
		triggerClass : "box",
		triggerCSS : {},
		contentClass : "feature",
		contentCSS : {},
		animationTime : 150,
		activeClass : 'active',
		ease : 'linear'
	};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.$el = $(element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function () {
		this.showFirst();
		this.bindEvents();
		this.applyCSS();
	};

	Plugin.prototype.showFirst = function () {
		var opt = this.options;
		this.$el.find('.' + opt.contentClass).hide();
        this.$el.find('.' + opt.triggerClass + ':first').find('.'+opt.contentClass).css('display','block');
        this.$el.find('.' + opt.triggerClass + ':first').addClass(opt.activeClass);
	};

	Plugin.prototype.applyCSS = function () {
		this.$el.find('.' + this.options.contentClass).css(this.options.contentCSS);
		this.$el.find('.' + this.options.triggerClass).css(this.options.triggerCSS);
	};

	Plugin.prototype.bindEvents = function () {
		var opt = this.options;
		this.$el.on('click', '.' + opt.triggerClass, function (e) {
			var $this = $(this);
			if ($this.find('.' + opt.contentClass).is(':hidden')) {
				$('.' + opt.triggerClass).removeClass(opt.activeClass).find('.' + opt.contentClass).slideUp(opt.animationTime, opt.ease);
				$this.toggleClass(opt.activeClass).find('.'+opt.contentClass).fadeIn('fast').slideDown(opt.animationTime, opt.ease);
                return false;
            }
		});
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