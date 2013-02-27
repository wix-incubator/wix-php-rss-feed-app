/**
 * A global object containing jquery elements
 **/
var sp ={
    connectButton :  $('#connectBtn'),
    feedInputUrlElm : $('#rssFeedUrl'),
    numOfEntriesInput : $('#numOfEntries'),
    disconnectAccountElm : $('#disconnectAccount'),
    sliders: {widgetBcgCB: {}, feedBcgCB: {}},
    feedLink : $('#feedLink')
}

/**
 * Init color pickers plugins
 * Init the color pickers with a start color, a one that was saved in the DB or a default one
 */
function initColorPickers() {
    $('#titleTextColor').ColorPicker({startWithColor : rssModel.settings.titleTextColor});
    $('#textColor').ColorPicker({startWithColor : rssModel.settings.textColor});
    $('#widgetBcgColor').ColorPicker({startWithColor : rssModel.settings.widgetBcgColor});
    $('#feedBcgColor').ColorPicker({startWithColor : rssModel.settings.feedBcgColor});
}

/**
 * Init sliders plugins
 * Init the sliders with a start value, a one that was saved in the DB or a default one
 */
function initSliders() {
    sp.sliders['widgetBcgCB'] = $('#widgetBcgSlider').Slider({
                                    type: "Value",
                                    value: rssModel.settings.widgetBcgSlider
                                });
    sp.sliders['feedBcgCB'] = $('#feedBcgSlider').Slider({
                                    type: "Value",
                                    value: rssModel.settings.feedBcgSlider
                                });
}

/**
 * Init checkboxes plugins
 * Check or uncheck the checkboxes according to the value was saved in the DB or a default one
 */
function initCheckboxes() {
    $('#widgetBcgCB').Checkbox({ checked: rssModel.settings.widgetBcgCB });

    // Enable or disable the opacity bar according to the checkbox
    if (!rssModel.settings.widgetBcgCB) {
        sp.sliders['widgetBcgCB'].data('plugin_Slider').disable();
    }

    $('#feedBcgCB').Checkbox({ checked: rssModel.settings.feedBcgCB });

    // Enable or disable the opacity bar according to the checkbox
    if (!rssModel.settings.feedBcgCB){
        sp.sliders['feedBcgCB'].data('plugin_Slider').disable();
    }
}

/**
 * Init the input elements
 * Init the input  with a start value, a one that was saved in the DB or a default one
 */
function initInputElms() {
    sp.numOfEntriesInput.val(rssModel.settings.numOfEntries);
}

/**
 * Bind events
 * Listen to changes of the elements
 */
function bindEvents () {
    $(document).on('colorChanged', function(ev, data) {
        updateSettingsProperty(data.type, data.selected_color);
    });

    $(document).on('slider.change', function(ev, data) {
        updateSettingsProperty(data.type, data.value);
    });

    $(document).on('checkbox.change', function(ev, data) {
        if (data.checked) {
            sp.sliders[data.type].data('plugin_Slider').enable();
        }else {
            sp.sliders[data.type].data('plugin_Slider').disable();
        }

        updateSettingsProperty(data.type, data.checked);
    });

    // user has connected a feed
    sp.connectButton.click( function(){
        rssModel.settings.feedInputUrl = sp.feedInputUrlElm.val();

        // hide guest description and show connected description
        displayHeader();

        updateSettingsProperty("feedInputUrl", rssModel.settings.feedInputUrl);
    });

    // user has disconnected from the feed
    sp.disconnectAccountElm.click(function(){
        updateSettingsProperty("feedInputUrl", "");

        sp.feedInputUrlElm.val("");
        sp.feedInputUrlElm.focus();

        // hide guest description and show connected description
        $('.guest').toggleClass('hidden');
        $('.user').toggleClass('hidden');
    });

    sp.numOfEntriesInput.change( function(){
        updateSettingsProperty(sp.numOfEntriesInput.attr("id"), sp.numOfEntriesInput.val());
    });
}

/**
 * Display a header in the settings form
 * If a user is connected to the widget (inserted a RSS feed link) the user section will be displayed,
 * otherwise the guest section will be displayed
 */
function displayHeader() {

    var guestSection = $('.guest');
    var userSection = $('.user');

    // If the feed url is initilized than the user already inserted a url, otherwise the guest section will
    // be displayed and the user will be able to insert a new feed url
    if (!rssModel.settings.feedInputUrl || rssModel.settings.feedInputUrl === "") {
        guestSection.removeClass('hidden');
        userSection.addClass('hidden');
    }
    else {
        loadFeedTitleAndDescription();
        guestSection.addClass('hidden');
        userSection.removeClass('hidden');
    }
}

/**
 * Load the feed with the google api feed
 */
function loadFeedTitleAndDescription() {

    // Create a feed instance that will grab feed.
    var feed = new google.feeds.Feed(rssModel.settings.feedInputUrl);

    // Sets the result format
    feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);

    feed.load(function(result) {
        if (!result.error) {
            sp.feedLink.attr('href', result.feed.link);
            sp.feedLink.html(result.feed.title);
            $('.feed-description').html(result.feed.description);
          }
    });
}

/**
 * Init the plugins elements
 */
function initPlugins () {

    // Init accordion
    $('.accordion').Accordion();

    // Init color pickers
    initColorPickers();

    initSliders();

    initCheckboxes();
}

/**
 * Get a parameter from the url
 * @param parameterName
 * @return {*|null}
 */
function getQueryParameter(parameterName) {
    var url = window.document.URL.toString();

    var index = url.indexOf('?');

    var queryString = url.substring(index + 1, url.length-1);

    var queryArray = queryString.split('&');
    var queryMap = {};
    queryArray.forEach(function(element) {
        var parts = element.split('=');
        queryMap[parts[0]] = decodeURIComponent(parts[1]);
    });

    return queryMap[parameterName] || null;
}

/**
 * Update a settings property in the settings object and update the settings object in the db by posting an ajax request
 * @param key - in the settings object
 * @param value - the new value
 */
function updateSettingsProperty(key, value) {
    var settings = rssModel.settings;
    settings[key] = value;
    updateSettings(settings);
}

/**
 * Updating the settings object in the DB by posting an ajax request
 * @param settingsJson
 */
function updateSettings(settingsJson) {
    var settingsStr = JSON.stringify(settingsJson) || "";
    var compId = Wix.Utils.getOrigCompId();

    $.ajax({
        'type': 'post',
        'url': "/app/settingsupdate",
        'dataType': "json",
        'contentType': 'application/json; chatset=UTF-8',
        'data': JSON.stringify({compId: Wix.Utils.getOrigCompId(), settings: settingsStr}),
        'cache': false,
        'success': function(res) {
            console.log("update setting completed");
            rssModel.settings = settingsJson;
            Wix.Settings.refreshAppByCompIds(compId);
        },
        'error': function(res) {
            console.log('error updating data with message ' + res.responseText);
        }
    });
}

/**
 * Load settings iFrame
 */
function loadSettings() {
    // load google feed scripts - should be done in the beginning
    google.load("feeds", "1");

    $(document).ready(function() {

        window.rssModel = {};

        // Getting newSettings that was set as parameter in settings.vm
        // Check that newSettings is initialized with value
        rssModel.settings = !!newSettings ? newSettings : {};

        applySettings();

        displayHeader();

        bindEvents();

        // Init all plugins
        initPlugins();

        initInputElms();
    })
}

loadSettings();



