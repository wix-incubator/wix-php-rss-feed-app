(function ($, window, document, undefined) {
    "use strict";

    var pluginName = 'ColorPicker',

        defaults = {
            colorPickerTypes: {
                "Simple": "SimpleColorPicker",
                "Advanced": "AdvancedColorPicker"
            },

            colorPickerTabs: {
                "Simple": "Site colors",
                "Advanced": "All colors"
            },

            startWithColor: "#897185",

            ColorPickers: {
                Simple: {},
                Advanced: {}
            },

            preview: "<span id=\"originalColor\"></span><span id=\"selectedColor\"></span>",
            actions: "<button id=\"cancelSelection\" class=\"btn btn-small gray\">Cancel</button><button id=\"selectColor\" class=\"btn btn-small blue\">OK</button>"
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);

        this.options = $.extend({}, this.options, {
            title: "Color Picker",
            html: true,
            content: '<div id="colorPicker"></div>',
            template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-header">' +
                '<h5 class="popover-title"></h5><div class="popover-close"><span class="popover-close-x"></span></div></div><div class="popover-content"></div></div></div>'
        });

        this._defaults = defaults;
        this._name = pluginName;

        this.init("popover", this.$el, this.options);
        this.createColoredElm();

        $(document).bind('click.' + this.type, function (e) {
            this.clearPopovers();
        }.bind(this));
    }

    Plugin.prototype = $.extend({}, $.fn.popover.Constructor.prototype, {

        constructor: Plugin,

        _data: {},

        createColoredElm : function () {
            var inner = $('<span>').addClass('inner');
            inner.css('background-color', this.options.startWithColor);
            this.$el.parent().append(inner);
            this.$el.addClass('color-selector')
        },

        toggle: function(ev) {
            var $tip = this.tip();

            if (!($tip.hasClass('in'))) {
                this.clearPopovers();
                this.show();
            }
            else {
                this.hide();
            }
            this.$el.toggleClass('active');
            this.$el.toggleClass('up');
            this.$el.removeClass('over');

            // simple init view
            $('#picker-main').css('padding-top', '12px');
            $('.popover').css('width', 214 + 'px');

            return false;
        },

        show: function () {
            var $tip, inside, pos, actualWidth, actualHeight, placement, tp;

            if (this.hasContent() && this.enabled) {
                $tip = this.tip();
                this.setContent();

                if (this.options.animation) {
                    $tip.addClass('fade');
                }

                placement = typeof this.options.placement == 'function' ?
                    this.options.placement.call(this, $tip[0], this.$element[0]) :
                    this.options.placement;

                inside = /in/.test(placement);

                $tip.detach().css({ top: 0, left: 0, display: 'block' }).insertAfter(this.$element);

                pos = this.getPosition(inside);

                actualWidth = $tip[0].offsetWidth;
                actualHeight = $tip[0].offsetHeight;

                switch (inside ? placement.split(' ')[1] : placement) {
                    case 'bottom':
                        tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'top':
                        tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'left':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth};
                        break;
                    case 'right':
                        var windowHeight = $(window).height();
                        var triggerPos = (pos.top + pos.height / 2);
                        var popoverOffset = actualHeight / 2;
                        var popoverOverflow = popoverOffset - (windowHeight - (triggerPos-$(window).scrollTop()));
                        var arrowPos = 50;

                        if (popoverOverflow > 0) {
                            triggerPos -= popoverOverflow + 10;
                            arrowPos += (((popoverOverflow + 10) / actualHeight) * 100);
                        }
                        $('.arrow').css('top', arrowPos + '%');
                        tp = {top: triggerPos - popoverOffset, left: pos.left + pos.width};
                        break;
                }

                $tip.offset(tp).addClass(placement).addClass('in');

            }
        },

        clearPopovers : function () {
            $('.popover').each(function () {
                $(this).removeClass('in');
                $(this).remove();
            });

            $('.color-selector').each(function () {
                $(this).removeClass('active');
                $(this).removeClass('up');
                $(this).removeClass('over');
            })
        },

        setContent: function() {
            var $tip = this.tip();

            $tip.css('height', "364px");
            var title = defaults.colorPickerTabs["Simple"],
                content = this.getContent();

            $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
            $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content);

            this.startColorPicker($tip.find('#colorPicker'));

            $tip.removeClass('fade top bottom left right in')
        },

        startColorPicker: function(node) {
            this.options.node = $('<div>', { id: "picker-main" }).appendTo(node);

            this.createContainers();
            this.renderColorPickers();
            this.renderButtons();
            this.showFirstPicker();
            this.renderPreview();
            this.bindEvents();
        },

        createContainers: function() {
            var opt = this.options;

            this.paletteContainer = $('<div>', { id: "palettes" })
                .appendTo(opt.node);


            this.preview = $('<div>', { id: "preview" })
                .appendTo(opt.node)
                .html(opt.preview)
                .css('display', 'none');

            this.createTabs();

            this.actions = $('<div>', { id: "actions" })
                .appendTo(opt.node.parent());
        },

        createTabs: function() {
            if (Object.keys(this.options.ColorPickers).length > 1) {
                var tabs = $('<div>', { id:"tabs" });
                this._hasTabs = true;
                this.options.node.append(tabs);
            }
        },

        renderPreview: function () {
            var color = this.$el.parent().find('.inner').css('background-color');
            this.options.node.find("#originalColor").css('background-color', color);
            this.options.node.find("#selectedColor").css('background-color', color);
        },

        renderColorPickers: function() {
            $.each(this.options.ColorPickers, function(picker, key) {
                var pickerName = this.options.colorPickerTypes[picker];
                var pickerOptions = this.options.ColorPickers[picker];

                pickerOptions.wrapperId = "colorpicker_" + new Date().getTime();
                pickerOptions.initColor =  this.$el.parent().find('.inner').css('background-color');

                var pickerWrapper = $('<div>', { id: pickerOptions.wrapperId })
                    .appendTo(this.options.node.find('#palettes'));

                pickerWrapper[pickerName](pickerOptions);
                pickerWrapper.hide();

                this._data[picker] = {
                    options: pickerOptions,
                    view: this.$el,
                    type: picker,
                    self: this
                };

                if (this._hasTabs) {
                    $('<a>', {})
                        .html(this.options.colorPickerTabs[picker])
                        .appendTo(this.options.node.find('#tabs'))
                        .attr('picker_id', pickerOptions.wrapperId)
                        .bind('click', { pickerId: pickerOptions.wrapperId, type: picker, self: this }, this.onTabSelect);
                }
            }.bind(this));
        },

        onTabSelect: function(ev) {
            if ($(ev.target).hasClass('active')) {
                return;
            }

            var pickers = $('#palettes').children();

            this.$target = $(ev.target);

            $.each(pickers, function(picker) {
                $(pickers[picker]).hide();

                if (this.$target.attr('picker_id') != $(pickers[picker]).attr('id')) {
                    this.$target.show()
                }
            }.bind(this));

            $('#tabs').find('.active').removeClass('active');
            $(ev.target).addClass('active');
            $('#' + ev.data.pickerId).fadeIn();

            if (ev.data.type === "Advanced") {
                $('.popover').css('width', '382px');
                $('#picker-main').css('padding-top', '6px');
                $('#preview').show();
            } else {
                $('.popover').css('width', '214px');
                $('#picker-main').css('padding-top', '12px');
                $('#preview').hide();
            }

            $('[picker_id='+ev.data.pickerId+']').hide();

            $.each($('#tabs').children(), function(trigger) {
                var $trigger = $($('#tabs').children()[trigger]);
                if (this.$target.attr('picker_id') != $trigger.attr('picker_id')) {
                    $trigger.show();
                }
            }.bind(this));

            // set popover title
            var title = defaults.colorPickerTabs[ev.data.type];
            ev.data.self.$tip.find('.popover-title')['html'](title);

            return false;
        },

        renderButtons: function() {
            $('<button>', { id: "selectColor" })
                .html(this.options.actions)
                .find('button').addClass('btn btn-large')
                .appendTo(this.actions);
        },

        bindEvents: function() {
            var $tip = this.tip();
            $(document).bind("colorChangedPreview", this.onColorChange.bind(this));

            $tip.bind('click', function () {
                return false;
            });

            this.actions.find('#cancelSelection').click(function() {
                this.closePopover();
                return false;
            }.bind(this));

            $tip.find('.popover-close').click(function() {
                this.closePopover();
                return false;
            }.bind(this));

            this.actions.find('#selectColor').click(function() {
                var selectedColor = this.preview.find('#selectedColor').data('selected');

                if (!selectedColor || !selectedColor.hex) {
                    this.closePopover();
                    return false;
                } else {
                    this.$el.parent().find(".inner").css("background-color", selectedColor.hex);
                }

                this.closePopover();

                var data = {
                    type: this.$el.attr('id'),
                    selected_color: selectedColor.hex
                }

                $(document).trigger('colorChanged', data);

                return false;
            }.bind(this));
        },

        closePopover : function () {
            this.hide();
            this.$el.removeClass('active');
            this.$el.removeClass('up');
        },

        onColorChange: function(ev, data) {
            var selected = this.preview.find('#selectedColor');
            selected.css('background-color', data.hex);
            selected.data('selected', data);
        },

        showFirstPicker: function() {
            $(this.paletteContainer.children()[0]).show();
            $(this.options.node.find('#tabs').children()[0]).hide();
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

    $.fn[pluginName].Constructor = Plugin;

})(jQuery, window, document);