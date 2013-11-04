/**
 * Init the input elements
 * Init the input  with a start value, a one that was saved in the DB or a default one
 */
function initInputElms() {
    $('#numOfEntries').val(rssModel.settings.numOfEntries);
}

/**
 * Bind events
 * Listen to changes of the elements
 */
function bindEvents () {
	var $rssFeedUrl = $('#rssFeedUrl')
	var $numOfEntriesInput = $('#numOfEntries');
	
	var lastValue = '';
    // user has connected a feed
    $('#connectBtn').click( function(){
		if(lastValue !== $rssFeedUrl.val()){
			lastValue = rssModel.settings.feedInputUrl = $rssFeedUrl.val();
			displayHeader();
			updateSettingsProperty("feedInputUrl", rssModel.settings.feedInputUrl);
		}
    });

    // user has disconnected from the feed
    $('.disconnect-account').click(function(){
        updateSettingsProperty("feedInputUrl", "");
		lastValue = '';
        $rssFeedUrl.val("");
        $rssFeedUrl.focus();

        // hide guest description and show connected description
        $('.loggedIn').addClass('hidden');
        $('.loggedOut').removeClass('hidden');
    });

	
    $numOfEntriesInput.change( function(){
        updateSettingsProperty($numOfEntriesInput.attr("id"), $numOfEntriesInput.val());
    });
}

/**
 * Display a header in the settings form
 * If a user is connected to the widget (inserted a RSS feed link) the user section will be displayed,
 * otherwise the guest section will be displayed
 */
function displayHeader() {

    var guestSection = $('.loggedOut');
    var userSection = $('.loggedIn');

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
		var $feedLink = $('#feedLink');
        if (!result.error) {
            $feedLink.attr('href', result.feed.link);
            $feedLink.text(result.feed.title);
            $('.feed-description').html(result.feed.description);
	    } else {
		 //handle Error
		}
    });
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
        'data': {compId: Wix.Utils.getOrigCompId(), settings: settingsJson},
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

function applySettings() {
    // RSS feed link
    rssModel.settings.feedInputUrl = rssModel.settings.feedInputUrl || "";
    // Number of entries in the RSS feed
    rssModel.settings.numOfEntries = rssModel.settings.numOfEntries || 4;
}


// load google feed scripts - should be done in the beginning
google.load("feeds", "1");

$(document).ready(function() {

	window.rssModel = {};

	// Getting newSettings that was set as parameter in settings.vm
	// Check that newSettings is initialized with value
	rssModel.settings = newSettings || {};
	
	applySettings();
	displayHeader();
	bindEvents();
	initInputElms();	
	
	Wix.UI.initialize();
	
});
