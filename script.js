const player1=document.getElementById("player1");
const player2=document.getElementById("player2");
const dice=document.getElementById("dice-icon");
const currentScore1=document.getElementById("current-score1");
const currentScore2=document.getElementById("current-score2");
const rollResult1=document.getElementById("roll-result1");
const rollResult2=document.getElementById("roll-result2");
const newGameBtn=document.getElementById("new-game-btn");
const rollBtn=document.getElementById("roll-btn");
const holdBtn=document.getElementById("hold-btn");
const body=document.getElementsByName("body");


const player={active:false};
const diceFaces=["one","two","three","four","five","six"];
const winScore=40;


const roll=()=>{
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    dice.className = `fa-solid fa-dice-${diceFaces[diceRoll - 1]}`;
    return diceRoll;
}   

const hold=()=>{
    if(player.active===1){
        player.active=2;
        player2.classList.add("active-player","active");
        player2.classList.remove("not-active");
        player1.classList.remove("active-player","active");
        player1.classList.add("not-active");
        rollResult1.innerHTML=Number(rollResult1.textContent)+Number(currentScore1.innerHTML);
        currentScore1.innerHTML=0;
    }else if(player.active===2){
        player.active=1;
        player1.classList.add("active-player",'active');
        player2.classList.remove("active-player",'active');
        player2.classList.add("not-active");
        player1.classList.remove("not-active");
        rollResult2.innerHTML=Number(rollResult2.textContent)+Number(currentScore2.innerHTML);
        currentScore2.innerHTML=0;
    }
};

holdBtn.addEventListener('click', hold);

rollBtn.addEventListener('click',()=>{
    diceRoll=roll();
    if(!player.active){
        currentScore1.innerHTML=Number(currentScore1.textContent)+diceRoll;
        player.active=1;
        player1.classList.add("active-player",'active');
        rule(diceRoll,Number(rollResult1.textContent)+Number(currentScore1.textContent));
    }else if(player.active===1){
        currentScore1.innerHTML=Number(currentScore1.textContent)+diceRoll;
        rule(diceRoll,Number(rollResult1.textContent)+Number(currentScore1.textContent));
    }else{
        currentScore2.innerHTML=Number(currentScore2.textContent)+diceRoll;
        rule(diceRoll,Number(rollResult2.textContent)+Number(currentScore2.textContent));
    }
});

newGameBtn.addEventListener("click", ()=>{
    player.active=false;
    player1.classList.remove("active-player","active","not-active","loser","winner");
    player2.classList.remove("active-player","active","not-active","loser","winner");
    currentScore1.innerHTML=0;
    currentScore2.innerHTML=0;
    rollResult1.innerHTML=0;
    rollResult2.innerHTML=0;
});

const rule=(score,total)=>{
    if(score===1){
        if(player.active===1){
            hold();
            rollResult1.textContent=0;
        }else if(player.active===2){
            hold();
            rollResult2.textContent=0;  
        }   
    }
    
    if(total>=winScore){
        const playerWinner=player.active===1?player1:player2;
        const playerLoser=player.active===1?player2:player1;
        playerWinner.classList.add("winner");
        playerLoser.classList.add("loser");
        let speech = new SpeechSynthesisUtterance( `congratulations Player ${player.active} is the winner!`);
        window.speechSynthesis.speak(speech);
        setTimeout(()=>{location.reload()}, 2000);
    }
}