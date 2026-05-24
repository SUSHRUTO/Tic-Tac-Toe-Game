import { useState } from "react";

function App() {

const [playerX,setPlayerX]=useState("");
const [playerO,setPlayerO]=useState("");
const [gameStarted,setGameStarted]=useState(false);

const [board,setBoard]=useState(Array(9).fill(null));
const [isXTurn,setIsXTurn]=useState(true);

const winningCombinations=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

let winner=null;
let winningCells=[];

for(let combo of winningCombinations){

const[a,b,c]=combo;

if(
board[a] &&
board[a]===board[b] &&
board[a]===board[c]
){
winner=board[a];
winningCells=combo;
}

}

const draw=
!winner &&
board.every(cell=>cell!==null);

const currentPlayer=
isXTurn
?
playerX
:
playerO;

const winnerName=
winner==="X"
?
playerX
:
playerO;

const handleClick=(index)=>{

if(
board[index] ||
winner
)return;

const updated=[...board];

updated[index]=
isXTurn
?
"X"
:
"O";

setBoard(updated);

setIsXTurn(!isXTurn);

};

const resetGame=()=>{

setBoard(
Array(9).fill(null)
);

setIsXTurn(true);

};

const newPlayers=()=>{

setPlayerX("");
setPlayerO("");

setBoard(
Array(9).fill(null)
);

setGameStarted(false);

setIsXTurn(true);

};

const startGame=()=>{

if(
playerX.trim() &&
playerO.trim()
){
setGameStarted(true);
}

};

const getLineStyle=()=>{

if(winningCells.length===0)
return {};

const map={

0:[16,16],
1:[50,16],
2:[84,16],

3:[16,50],
4:[50,50],
5:[84,50],

6:[16,84],
7:[50,84],
8:[84,84]

};

const start=
map[winningCells[0]];

const end=
map[winningCells[2]];

const dx=end[0]-start[0];
const dy=end[1]-start[1];

const length=
Math.sqrt(
dx*dx+dy*dy
);

const angle=
Math.atan2(
dy,
dx
)*180/Math.PI;

return{

left:`${start[0]}%`,
top:`${start[1]}%`,
width:`${length}%`,
transform:
`rotate(${angle}deg)`,

transformOrigin:
"left"

};

};

return(

<div className="min-h-screen bg-[#f7f3e9] flex justify-center items-center p-6">

<div className="w-full max-w-2xl bg-[#fffdf6] rounded-3xl p-8 shadow-2xl relative overflow-hidden">

{/* notebook lines */}

<div className="absolute inset-0 opacity-25">

{
[...Array(25)].map((_,i)=>(

<div
key={i}
className="border-b border-blue-300"
style={{
marginTop:"28px"
}}
></div>

))
}

</div>

{/* notebook margin */}

<div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-400 opacity-60"></div>


<div className="relative z-10 ml-16">

<h1
className="
text-5xl
text-center
mb-8
text-gray-800
"
style={{
fontFamily:"cursive"
}}
>

✏️ Tic Tac Toe

</h1>


<div className="mb-8">

<p>Name : ____________</p>

<p>Class : ____________</p>

<p>Date : ____________</p>

</div>


{
!gameStarted
?

(

<div className="mt-8 flex flex-col gap-4">

<input
placeholder="Player 1 Name"
value={playerX}
onChange={(e)=>
setPlayerX(
e.target.value
)}
className="
p-4
rounded-xl
border
bg-white
"
/>

<input
placeholder="Player 2 Name"
value={playerO}
onChange={(e)=>
setPlayerO(
e.target.value
)}
className="
p-4
rounded-xl
border
bg-white
"
/>

<button
onClick={startGame}
className="
bg-gray-800
text-white
p-4
rounded-full
hover:scale-105
transition
"
>

🎮 Start Tic Tac Toe Match

</button>

</div>

)

:

(

<>

<div
className="
text-center
text-2xl
font-bold
my-8
"
style={{
fontFamily:"cursive"
}}
>

{
winner
?
`🎉 ${winnerName} Wins`
:
draw
?
"🤝 Match Draw"
:
`✍️ ${currentPlayer}'s Turn`
}

</div>


<div className="relative grid grid-cols-3 gap-4 max-w-md mx-auto">

{
board.map((cell,index)=>(

<button

key={index}

onClick={()=>
handleClick(index)
}

className={`

h-28
rounded-xl
border-2
border-gray-600
text-6xl
font-bold
bg-[#fffef8]

${
winningCells.includes(index)
?
"bg-yellow-200"
:
""
}

hover:scale-105
transition

`}

style={{

fontFamily:"cursive",

color:
cell==="X"
?
"#2563eb"
:
"#dc2626"

}}

>

{cell}

</button>

))
}


{
winner &&

<div

className="
absolute
h-[6px]
bg-black
rounded-full
"

style={
getLineStyle()
}

></div>

}


</div>


<div className="flex justify-center gap-4 mt-10">

<button
onClick={resetGame}
className="
bg-gray-800
text-white
px-8
py-4
rounded-full
hover:scale-105
transition
"
>

🧽 Erase & Start Again

</button>


<button
onClick={newPlayers}
className="
bg-blue-700
text-white
px-8
py-4
rounded-full
hover:scale-105
transition
"
>

👥 New Players

</button>

</div>

</>

)

}

</div>

</div>

</div>

);

}

export default App;