(function(){
    var that = app;

    this.start = function(){
        console.log('ive started');
        var documentTree = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false),
            nodeValue;
        while(documentTree.nextNode()) {
            nodeValue = documentTree.currentNode.nodeValue;
            documentTree.currentNode.nodeValue = that.replaceString(nodeValue,'Google','Yahoo');
        }
        console.log('im done');
    };

    this.replaceString = function(context, find, replace){
        return context.replace(new RegExp(find, 'gi'), replace);
    };

}).apply(app);