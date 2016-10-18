(function(){
    
    var that = mainApp.data,
        data = '{ "comics": [ { "url":"https://xkcd.com/1704/", "translations":[ { "find":"no man", "replace":"Gnome Ann" } ] } ]}';
    
    this.getRawData = function(){
        return data;
    };
    
    this.getFormattedData = function(){
        var rawData = JSON.parse(that.getRawData()),
            translations = [];
        rawData.comics.forEach(function(comic){
            translations = translations.concat(comic.translations);
        });
        return translations;
    };

    
}).apply(mainApp.data);