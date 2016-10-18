(function(){
    
    var that = endApp.helpers;

    this.replaceString = function(context, find, replace){
        return context.replace(new RegExp(find, 'gi'), replace);
    };

}).apply(endApp.helpers);