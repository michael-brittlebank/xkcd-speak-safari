var app = {};

function handleGlobalMessage(message){
    if (message.name === 'returnData'){
        console.log('data returned',message.message);
    } else if (message.name === 'returnSettings'){
        //todo
    }
}

safari.self.addEventListener("message", handleGlobalMessage, false);

//DOM has loaded, get data and settings
safari.self.tab.dispatchMessage('getData','Get JSON data for text replacements');