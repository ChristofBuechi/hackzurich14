/**
 * Created by stone on 11.10.2014.
 */
foovieessential = {};
foovieessential.trackPlay = function (e) {
    var _videoId = $(e).attr("_id");
    var payload = {videoId: _videoId};
    var request = $.ajax({
        url: "api/video/view",
        type: "POST",
        data: payload,
        dataType: "json"
    });
}
