/*
 Main extension logic
 */
var endApp = {
    helpers: {}
};

(function(){
    //variables
    var that = endApp;
    
    //functions
    this.start = function(jsonData){
        var documentTree = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false),
            nodeValue;
        while(documentTree.nextNode()) {
            if (documentTree.currentNode.nodeType === Node.TEXT_NODE) {
                nodeValue = documentTree.currentNode.nodeValue;
                for(var i = 0; i < jsonData.length; i++){
                    documentTree.currentNode.nodeValue = that.helpers.replaceString(nodeValue, jsonData[i].find, jsonData[i].replace);
                }
            }
        }
    };

}).apply(endApp);


/*
 Message handler
 */

function handleGlobalMessage(message){
    if (message.name === 'returnData'){
        endApp.start(message.message);
    } else if (message.name === 'returnSettings'){
        //todo
    }
}

safari.self.addEventListener("message", handleGlobalMessage, false);


/*
 DOM loaded/extension init
 */

safari.self.tab.dispatchMessage('getData','Get JSON data for text replacements');