const PIECEXBOX = document.querySelector(".piecesBox");
const PUZZLEBOX = document.querySelector(".puzzleBox");
const PATTERN = document.querySelector(".pattern");
const PUZZLE = document.querySelector(".puzzle");
const PATTERNBUTTON = document.querySelector(".helpButton");
const RESTARTBUTTON = document.querySelector(".restartButton");

var count;
var piecesBoxTab;
var piece, emplacement;

var rowCount, emplacementCount;

/*--Functions--*/
//Help
function showPuzzle()
{
	PATTERN.classList.remove("hide");
	PUZZLE.classList.add("hide");
	PATTERNBUTTON.classList.add("hide");

	setTimeout(function()
	{
		PATTERNBUTTON.classList.remove("hide");
		PATTERN.classList.add("hide");
		PUZZLE.classList.remove("hide");
	}, 1500);
}

//Random
function restart()
{
	location.reload();
}

//Drag & Drop
function allowDrop(ev)
{
    ev.preventDefault();
}
function dragStart(ev)
{
    ev.dataTransfer.setData("text", ev.target.id);
}
function dragEnter(ev)
{
	if(ev.target.closest(".piece"))
    	ev.target.style.border = "3px solid red";
    else
	ev.target.style.border = "2px solid white";
}
function dragNoBorder(ev)
{
	ev.target.style.border = "0";
}
function dragBorder(ev)
{
	ev.target.style.border = "1px dashed black";
}
function dropPuzzle(ev)
{
    ev.preventDefault();
    ev.target.style.border = "0";

    var data = ev.dataTransfer.getData("text");

    if(ev.target.closest(".piece"))
    {
    	//inverser les pièces
    	var firstPiece = ev.target.closest(".piece");
    	var secondPiece = document.getElementById(data);
    	var temp;

    	temp = firstPiece;
    	firstPiece = secondPiece;
    	secondPiece = temp;

    	console.log(firstPiece);
    	console.log(secondPiece);

    	ev.target.replaceChild(secondPiece, firstPiece);
    }
    else
    {
	    ev.target.appendChild(document.getElementById(data));
    }
}
function dropBox(ev)
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    
    if(ev.target.closest(".piece"))
    {
    	console.log("déjà une pièce");
    	//inverser les pièces
    }
    else
    {
	    ev.target.appendChild(document.getElementById(data));
    }
}

//Rotation pièce 90° quand dBclick
function rotate()
{
//.style.transform = "rotate(90deg)";
}

/*--Return--*/
piecesBoxTab = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

//Boite de pièces
piecesBoxTab.sort(function()
{
	return Math.random() - 0.5;
});
count = 0;
while(count < piecesBoxTab.length)
{
	piececontainer = document.createElement("div");
	piece = document.createElement("div");

	piececontainer.classList.add("piececontainer");
	piece.classList.add("piece");
	piece.setAttribute("id", "piece" + piecesBoxTab[count]);
	
	piececontainer.setAttribute("ondragover","allowDrop(event)");
	piececontainer.setAttribute("ondrop","dropBox(event)");
	piececontainer.setAttribute("ondragend","dragBorder(event)");

	piece.setAttribute("draggable","true");
	piece.setAttribute("ondragstart","dragStart(event)");

	PIECEXBOX.appendChild(piececontainer);
	piececontainer.appendChild(piece);
	count++;
}

//Boite Puzzle
rowCount = 0;
while(rowCount <= 3)
{
	row = document.createElement("tr");
	row.classList.add("row");
	PUZZLE.appendChild(row);

	emplacementCount = 0;

	while(emplacementCount <= 3)
	{
		emplacement = document.createElement("td");
		emplacement.classList.add("emplacement");

		emplacement.setAttribute("ondrop","dropPuzzle(event)");
		emplacement.setAttribute("ondragover","allowDrop(event)");
		emplacement.setAttribute("ondragend","dragNoBorder(event)");
		emplacement.setAttribute("ondragenter","dragEnter(event)");
		emplacement.setAttribute("ondragleave","dragNoBorder(event)");

		row.appendChild(emplacement);

		emplacementCount++;
	}


	rowCount++;
}

PATTERNBUTTON.onclick = showPuzzle;
RESTARTBUTTON.onclick = restart;