$(document).ready(function() {

});

$(function() {
    var topics = ["rhobh", "vanderpump rules", "bravo tv", "rhony", "rhoa", "rhooc", "project runway", "chrisley knows best", "red carpet", "netflix", "hulu", "tbs", "snl", "vines", "dancing", "mustaches", "nah"];

    var animateGif = new Image();
    var stillGif = new Image();
    var clickToAnimate = $(".clickToAnimate");

    function buttonLoad() {
        $(".buttonArea").empty();
        for (var i = 0; i < topics.length; i++) {
            var tempButton = $("<button class='gifButton'>");
            tempButton.text(topics[i]);

            $(".buttonArea").append(tempButton);
        }
    }

    buttonLoad();


    var apiKey = "zCRjKwWu20KPPk8dK3hLq7GgWq2kEk7R";

    $("body").on("click", ".gifButton", function() {
        clickToAnimate.fadeIn();
        $(".gifHolder").empty();
        tempSearchQuery = $(this).text();
        searchQuery = tempSearchQuery.replace(" ", "+");
        var rating = "pg"
        var gifSearch = "https://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=" + apiKey + "&limit=10&rating=" + rating;

        $.ajax({
            url: gifSearch, 
            method:"GET"
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++){
            var gifDiv = $("<div>");
            gifDiv.attr("data-stillUrl", response.data[i].images.fixed_height_still.url)
            .attr("data-animateGif", response.data[i].images.fixed_height.url)
            .attr("data-rating", response.data[i].rating)
            .attr("data-playing", 0)
            .append(" " + gifDiv.attr("data-stillUrl") + " onerror='errorImg(this)'><p>Rating: " + gifDiv.attr("data-rating") + "</p>")
            .addClass("gifDiv");
                
                $(".gifHolder").append(gifDiv);
               	
            }
        });

    });

    $("body").on("click", ".addButton", function() {
        if ($(this).prev().val() !== ""){
            var tempButton = $("<button class='gifButton'>");
            tempButton.text($(this).prev().val());

            $(".buttonArea").append(tempButton);

            topics[topics.length] = $(this).prev().val();
            buttonLoad();
        }
    });

    $(".gifHolder").on("mouseover", ".gifDiv", function() {
        stillGif.src = $(this).attr("data-stillUrl");
        animateGif.src = $(this).attr("data-animateGif");
    });


    $(".gifHolder").on("click", ".gifDiv", function() {
        if ($(this).attr("data-playing") == 0){
            $(this).children().eq(0).attr("src", $(this).attr("data-animateGif"));
            $(this).html("<img src =" + $(this).attr("data-animateGif") + "><p>Rating: " + $(this).attr("data-rating") + "</p>");
            $(this).attr("data-playing", 1);
        }

        else {
            $(this).children().eq(0).attr("src", $(this).attr("data-stillUrl"));
            $(this).html("<img src=" + $(this).attr("data-stillUrl") + "><p>Rating: " + $(this).attr("data-rating") + "</p>");
            $(this).attr("data-playing", 0);
        }
    });

});

// function errorImg(img){
// $(img).parent().hide();
// }

// giphy api: zCRjKwWu20KPPk8dK3hLq7GgWq2kEk7R
