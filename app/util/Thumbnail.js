Ext.define('ISS.util.Thumbnail', {
    extend: 'Ext.Base',
    singleton: true,
    getUrl: function(title) {

        // This is a little complicated because there are two async calls:
        // First, get the page ID. If that returns a good ID, then make another
        // call to get the URL. If everything returns what we want, run
        // deferred.resolve(). Otherwise, if anything goes wrong anywhere,
        // run deferred.reject().

        var deferred = Ext.create('Ext.Deferred');
        determinePageId(title);
        return deferred.promise;

        function determinePageId(title) {
            Ext.data.JsonP.request({
                url: 'http://en.wikipedia.org/w/api.php',
                params: {
                    action: 'query',
                    titles: title,
                    format: 'json',
                    redirects: true
                },
                success: function(response) {
                    var pageId = extractPageId(response);
                    if (pageId === -1) {
                        deferred.reject(false);
                    } else {
                        getThumbnailUrlByPageId(pageId);
                    }
                },
                failure: function() {
                    deferred.reject(false);
                }
            });

            function extractPageId(response) {
                var page = response.query.pages;
                pageId = -1;
                var keys = Ext.Object.getKeys(page);
                for (var i = 0; i < keys.length; i++) {
                    pageId = Ext.Number.from(keys[i], -1);
                    break;
                }
                return pageId;
            }

            function getThumbnailUrlByPageId(pageId) {
                Ext.data.JsonP.request({
                    url: 'http://en.wikipedia.org/w/api.php',
                    params: {
                        action: 'query',
                        prop: 'pageimages',
                        format: 'json',
                        pageids: pageId
                    },
                    success: function(response) {
                        var thumbnail = response.query.pages[pageId].thumbnail;
                        if (thumbnail) {
                            deferred.resolve(thumbnail.source);
                        } else {
                            deferred.reject(false);
                        }
                    },
                    failure: function() {
                        deferred.reject(false);
                    }
                });

            }
        }
    }
});
