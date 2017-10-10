var currBreakLength = 5;
var currSessionLength = 25;
var timeLeft;

var timerRunning = false;
var intervalId;

var sessionOrBreak = "Session" ; 


var calcTimeLeftInSecs = () => (sessionOrBreak == "Session") ? timeLeft = currSessionLength * 60 : timeLeft = currBreakLength * 60 ;

var setInnerText = (elId, elInnerText ) =>  document.getElementById(elId).innerText =  elInnerText;


var convertSecsToMMSS = seconds => {

    var minutes = Math.floor(seconds / 60).toString();

    if (minutes.length == 1)
    
        minutes = "0" + minutes;

    var leftOverSeconds = (seconds % 60).toString();

    if (leftOverSeconds.length == 1 ) 
    
        leftOverSeconds = "0" + leftOverSeconds;

    return minutes + ":" + leftOverSeconds ;


};

var stopTimer = () => {
          
        clearInterval(intervalId);
        timerRunning = false;
        
    
    };
        
            
var startTimer = () => {
    
    setInnerText('time-left', convertSecsToMMSS(timeLeft));
    intervalId = setInterval( countDown, 1000 );
    timerRunning = true;
    

};
    

var countDown = () => { 
    
    if (timeLeft <= 0 ) {

              
        stopTimer();

        (sessionOrBreak == "Session") ? sessionOrBreak = "Break" : sessionOrBreak = "Session";

        setInnerText('timer-label',sessionOrBreak );  

        calcTimeLeftInSecs();        

        startTimer();

    }

    else
        setInnerText('time-left', convertSecsToMMSS(timeLeft -= 1))



};






window.addEventListener("load", event => {

   

    setInnerText('break-length',currBreakLength );
    setInnerText('session-length',currSessionLength );
    setInnerText('time-left',currSessionLength );
    setInnerText('timer-label',sessionOrBreak );

    calcTimeLeftInSecs();

    // Decrement Break
    var elBreakDecrement = document.getElementById("break-decrement");

    elBreakDecrement.addEventListener("click", () => setInnerText('break-length', currBreakLength > 1 ? currBreakLength -= 1 : currBreakLength));

  
    // Increment Break
    var elBreakIncrement = document.getElementById("break-increment");
    elBreakIncrement.addEventListener("click", () => setInnerText('break-length',currBreakLength < 60 ? currBreakLength += 1 : currBreakLength));   
           


    // Reset
    var elReset = document.getElementById("reset");

    elReset.addEventListener("click", () => { 
        
  
        stopTimer();
        setInnerText('break-length', currBreakLength = 5 ) ;
        setInnerText('session-length', currSessionLength = 25 ) ;  
        sessionOrBreak = "Session";  
        setInnerText('timer-label',sessionOrBreak );    
        calcTimeLeftInSecs();
        setInnerText('time-left', convertSecsToMMSS(timeLeft));
        
    });


     // Decrement Session
    var elSessionDecrement = document.getElementById("session-decrement");
     
    elSessionDecrement.addEventListener("click", () => { 
        
        setInnerText('session-length', currSessionLength > 1 ? currSessionLength -= 1: currSessionLength);
        setInnerText('time-left', currSessionLength);
        calcTimeLeftInSecs();
        
    
    });


    // Increment Session
    var elSessionIncrement = document.getElementById("session-increment");
    
    elSessionIncrement.addEventListener("click", () => {
        
        setInnerText('session-length', currSessionLength < 60 ? currSessionLength += 1 : currSessionLength);
        setInnerText('time-left', currSessionLength);
        calcTimeLeftInSecs();
        

    });


    // Start_Stop Toggle
    var elStartStop = document.getElementById('start_stop');

    elStartStop.addEventListener("click", () => timerRunning ? stopTimer() : startTimer());
    

});

