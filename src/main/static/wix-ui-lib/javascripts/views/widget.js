var _yelpWidget = (function() {
    var sp = {
        reviewsElement: $('#userReviews'),
        title: $('#businessTitle'),
        userReviews: $('#userReviews'),
        widgetBody: $('.widget-body')
    };

    var _yelp = {};

    function init() {
        _yelp.widget = $('#yelpWidget');
        _yelp.logo = $('#yelpLogo');
        _yelp.reviewers = $('#reviewesCount');

        // make sure we have valid settings
        applyDefaultSettings();

        // flat model properties
        _yelp.reviewsCount = yelpModel.businessData.getReviewCount();
        _yelp.reviews = yelpModel.businessData.getReviews();
        _yelp.buttonSize = yelpModel.settings.buttonSize;
        _yelp.title = yelpModel.businessData.getName();

        _yelp.widgetBGColor = yelpModel.settings.widgetTransparent ? 'transparent' : yelpModel.settings.widgetBGColor;
        _yelp.reviewsBGColor = yelpModel.settings.reviewsTransparent ? 'transparent' : yelpModel.settings.reviewsBGColor;
        _yelp.headlineTextColor = yelpModel.settings.headlineTextColor;
        _yelp.reviewsTextColor = yelpModel.settings.reviewsTextColor;

        _yelp.onClickAction = yelpModel.settings.onClickAction || "doNothing";

        if (yelpModel.settings.toggleReviews === "showReviews") {
            $(sp.reviewsElement).removeClass('hidden');
        }
        else {
            $(sp.reviewsElement).addClass('hidden');
        }
        setTitle(_yelp.title);
        setStars(_yelp.buttonSize);
        setReviews(_yelp.reviews);
        setReviewsCount(_yelp.reviewsCount);
        setOnClickAction(_yelp.onClickAction);
        setColors(_yelp.widgetBGColor, _yelp.reviewsBGColor, _yelp.headlineTextColor, _yelp.reviewsTextColor);
    }

    function setOnClickAction(action) {
        if (action === "gotoYelpProfile") {
            $("#clickable-area").click(function() {
                window.open(yelpModel.businessData._data.url, "_blank");
            });
        }
    }

    function setColors(bgColor, rbgColor, hTextColor, rTextColor) {
        if (bgColor)
            sp.widgetBody.css('background-color', bgColor);
        if (rbgColor)
            sp.userReviews.css('background-color', rbgColor);
        if (hTextColor)
            sp.title.css('color', hTextColor);
        if (rTextColor)
            $('#userReviews').children().css('color', rTextColor);
    }

    function setTitle(title) {
        if (!title) {
            return;
        }
        sp.title.html(title);
    }

    function setReviewsCount(count) {
        if (!_yelp) {
            return;
        }

        _yelp.reviewers.html(count + ' Reviews');
    }

    function setReviews(reviews, businessId) {
        for (var i=0; i<reviews.length; i++) {
            var data = reviews[i];
            var reviewTime = fixDateMSFormat(reviews[i].time_created);

            // get tempalte
            var userReview = $("#userReview").html();

            // compile template
            var review = Handlebars.compile(userReview)({
                reviewId: data.id,
                userId: yelpModel.businessData._data.id,
                userAvatar: data.user.image_url,
                userName: data.user.name,
                userRating: data.rating_image_url,
                reviewDate: dateToMDY(new Date(reviewTime)),
                reviewText: data.excerpt
            });

            // append compiled template
            sp.reviewsElement.append(review);
        }
    }

    function setStars(size) {
        if (!_yelp) {
            return;
        }

        $("#yelpStars").find('img').attr('src', yelpModel.businessData.getRatingImageUrl(size));
        $("#yelpStars").attr('href', 'http://yelp.com/biz/' + yelpModel.settings.businessId);
        $("#yelpStars").show();
    }

    function dateToMDY(date) {
        var d = date.getDate();
        var m = date.getMonth()+1;
        var y = date.getFullYear();
        return '' + (m<=9?'0'+m:m) +'/'+ (d<=9?'0'+d:d) + '/' + y;
    }

    function fixDateMSFormat(ms) {
        var msStr = ms.toString();

        if (msStr.length < 13) {
            for (var i=msStr.length; i<13; i++) {
                ms = ms * 10;
            }
        }
        return ms;
    }

    return {
        init: init,
        setReviewsCount: setReviewsCount,
        setStars: setStars
    }
}());

function showYelpBusinessInfo() {
    _yelpWidget.init();
}

$(document).ready(function() {
    window.yelpModel = {};

    readsettings(function(text) {
        try {
            yelpModel.settings = !!text ? JSON.parse(text) : {};
        }
        catch(e) {
            return;
        }

        applyDefaultSettings();

        if (!yelpModel.settings.businessId) {
            yelpModel.settings.businessId = "wix-lounge-sf-san-francisco"; // businessId
        }

        if (yelpModel.settings.businessId) {
            _WixYelp.Init(yelpModel.settings.businessId, function(yelpData){
                if (yelpData === null) {
                    return;
                }

                yelpModel.businessData = yelpData;
                showYelpBusinessInfo();
            });
        }
    }, Wix.Utils.getCompId());
});

