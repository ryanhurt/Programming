( function() {

//Game Variables

//a random number... to be generated.
//currently, we are using a static number but it will be changed soon
 
var alienX=0;
var alienY=0;

//player's guess
var guessX=0;
var guessY=0;
    

 
//maximum number of guesses allowed
var maxGuesses=10;
//how many guesses the user has made?
var guessCount=0;
//update the display after each guess
var currentStatus=""; 
var isGuessCorrect=false;
 
   
var inputX =document.querySelector("#guessboxX");
var inputY=document.querySelector("#guessboxY");

var output=document.querySelector("#output");

var button=document.querySelector("#submit");
button.addEventListener("click",onGuessSubmit,false);
    
var alien = document.querySelector("#alien");
var cannon = document.querySelector("#cannon");
var missile = document.querySelector("#missile");    

window.addEventListener("keydown",onEnterPressed,false);
 
startGame();//initializes the game with a random number
 
    
/*Renders the position of the arrow on the scale*/
function render()
{
        //arrow.style.left=playerGuessedNum*3+"px";
    alien.style.left=alienX+"px";
    alien.style.top=alienY+"px";
}
    
function startGame()
{
    
   //generates a random number between 1 and 280 (inclusive)
    alienX= Math.floor(Math.random()*280);//280 is width of background (300) minus the width of the alien (20)
    
    //generate an initial y position for the alien, which is within the top 100 pixels of the play area.
    alienY= Math.floor(Math.random()*100);
    
    //update the initial render position once....
    render();
        
}
    
function onEnterPressed()
{
    if(event.keyCode==13)
        checkNumber();
}
    
function onGuessSubmit()
{
 checkNumber();
}
 
   
function checkNumber()
    {
       
     guessX=parseInt(inputX.value);  
     guessY=parseInt(inputY.value); 
        
    if(isNaN(guessX))
        output.innerHTML="Enter a proper X axis value";
   else if(guessX<1 || guessX>300 )
       output.innerHTML="Enter a X number within a range of 1 and 300";     
    
   else if(isNaN(guessY))
        output.innerHTML="Enter a proper Y axis value";
   else if(guessY<1 || guessY>300 )
       output.innerHTML="Enter a Y number within a range of 1 and 300";
        
   else  playGame();
            
    }
    
 
function playGame()
    {
     
    updateGameStatus();
       
    //check if the guessX is within the x range of alien
        if(guessX>=alienX && guessX<=(alienX+20) )
        {
            //it is, so now check whether guessY is within alien's Y range
            if(guessY>=alienY && guessY<=(alienY+20))
                {
                    //we got a hit!
                    
                    output.innerHTML="Alien Hit! You won."; 
                    isGuessCorrect=true;
                 
                }
            
        }
        
        else //the guess is incorrect
        {   
            alienX= Math.floor(Math.random()*280);
            alienY +=30;
              output.innerHTML=currentStatus+ "<br> Incorrect guess. try again. ";   
        }
        render();
          if(guessCount>=maxGuesses||isGuessCorrect||alienY > 250){
     endGame();
       }  
    }
    
    
    function endGame()
    {
       
        if(!isGuessCorrect&&alienY>250)
        {
          output.innerHTML="Crash!!!!!";  

         }else if(!isGuessCorrect&&alienY<250){
              output.innerHTML="You have reached the maximum number of tries.. Game Over! ";  
         }
        else{
            output.innerHTML="You won the game in "+guessCount+" tries!"; }
       
button.removeEventListener("click",onGuessSubmit,false);
        
window.removeEventListener("keydown",onEnterPressed,false);
 
        button.disabled=true;
        input.disabled=true;
   
    }
    
    function updateGameStatus()
    {
     //increase the count of number of guesses made
        guessCount++;
var remainingGuesses= maxGuesses - guessCount;
        
    currentStatus="Guesses: "+guessCount+", Remaining: "+remainingGuesses;
               
    }
    

}());