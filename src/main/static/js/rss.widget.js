/**
 * Class containing widget property and functions
 */
var _rssWidget = (function() {
    /**
     * Load the feed content using google API
     */
    function loadFeed() {
        // Init the feed URL
        initFeedUrl();

        // Create a feed instance that will grab Digg's feed.
        var feed = new google.feeds.Feed(rssModel.settings.feedInputUrl);
        // Set the number of feed entries that will be loaded by this feed
        feed.setNumEntries(rssModel.settings.numOfEntries);
        // Sets the result format
        feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);

        feed.load(function(result) {
            if (!result.error) {
				$('#feedTitle').text(result.feed.title);
                setFeed(result.feed.entries);
            }
        });
    }

    /**
     * If the feed url is initilized than the user already inserted a url, otherwise a default value will be initialize so feed will
     * be displayed to website users
     */
    function initFeedUrl(){
        if (!rssModel.settings.feedInputUrl || rssModel.settings.feedInputUrl == "") {
			//default url
            rssModel.settings.feedInputUrl = "http://rss.cnn.com/rss/edition.rss"
        }
    }

    /**
     * Set feed entries
     * @param entries
     */
    function setFeed(entries) {
		var $feedEntries = $('#feedEntries');
		
		var tpl = '<a class="entry-link" href="{{link}}" target="_blank">' +
			'<div class="feed">' +
				'<div class="title">{{title}}</div>' +
				'<div class="content"><p>{{content}}</p></div>' +
			'</div>' +
		'</a>';
		
        for (var i=0; i<entries.length; i++) {
            var data = entries[i];

			var html = tpl.replace('{{link}}', data.link)
			   .replace('{{title}}', data.title)
			   .replace('{{content}}', data.content)

            $feedEntries.append(html);
        }

        // Remove the border from the last feed class element
        $(".feed:last").css('border-bottom', 'none');
    }
	
	/**
	 * This function init the settings object with default values or with values that were saved in the DB
	 */

	function applySettings() {
		// RSS feed link
		rssModel.settings.feedInputUrl = rssModel.settings.feedInputUrl || "";

		// Number of entries in the RSS feed
		rssModel.settings.numOfEntries = rssModel.settings.numOfEntries || 4;
	}
	
    // Public functions
    return {
        init: function(){
			applySettings();
			loadFeed();
		}
    };

}());


google.load("feeds", "1");

$(document).ready(function() {

	window.rssModel = {
		settings : newSettings || {}
	};
	
	_rssWidget.init();
});


