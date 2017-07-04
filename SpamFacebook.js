/*
* Author : Colombet Aurélien
* 
* Description : A script for spamming messages on Facebook chat (working the 04 July 2017)
*/


/*
* Fonction to simulate an event on an element
*/
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

/*
* return an event of pressKey on the keyBoard
*/
function pressChar(char){
    var event = document.createEvent('KeyboardEvent'); // create a key event
  // define the event
  event.initKeyEvent("keypress",       // typeArg,                                                           
                     true,             // canBubbleArg,                                                        
                     true,             // cancelableArg,                                                       
                     null,             // viewArg,  Specifies UIEvent.view. This value may be null.     
                     false,            // ctrlKeyArg,                                                               
                     false,            // altKeyArg,                                                        
                     false,            // shiftKeyArg,                                                      
                     false,            // metaKeyArg,                                                       
                      9,               // keyCodeArg,                                                      
                      char);              // charCodeArg);
  return event;
}

/**
* timeBetweenMessages need to be < at 2500 
**/
function spamMessenger(message, timeBetweenMessages){
  setInterval(function(){
    eventFire(document.getElementsByClassName("_1mf")[0], "click");

    //we simulate keys for messages
    for(var ind = 0; ind < message.length + 1; ind++){
      document.getElementsByClassName("_1mf")[0].dispatchEvent(pressChar(message.charCodeAt(ind)));
    }

    for(var ind = 0; ind < message.length + 1; ind++){
      document.getElementsByClassName("_1mf")[0].dispatchEvent(pressChar(8)); //delete key
    }
    
    var ev = document.createEvent('KeyboardEvent');
    // Send key '13' (= enter)
    ev.initKeyEvent(
        'keydown', true, true, window, false, false, false, false, 13, 0);

    setTimeout(function(){
      eventFire(document.getElementsByClassName("_1mf")[0], "click");
      document.getElementsByClassName("_1mf")[0].dispatchEvent(ev);
    },800);
  },timeBetweenMessages);
}


//Exemple
spamMessenger("Hey you like SPAM ?", 2500);