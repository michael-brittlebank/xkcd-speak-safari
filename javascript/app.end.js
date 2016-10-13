/*
 Main extension logic
 */
var app = {};

(function(){
    //variables
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


/*
 Message handler
 */

function handleGlobalMessage(message){
    if (message.name === 'returnData'){
        console.log('data returned',message.message);
        app.start();
    } else if (message.name === 'returnSettings'){
        //todo
    }
}

safari.self.addEventListener("message", handleGlobalMessage, false);


/*
 DOM loaded/extension init
 */

safari.self.tab.dispatchMessage('getData','Get JSON data for text replacements');