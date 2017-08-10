$(document).ready(function() {

// Placeholders for chosen character and enemy during fighting
	var myCharacter = {
		name: "",
		life : 0,
		baseattack: 0,
		attack: 0,
		chosen: "no"
	};
	var enemy = {
		name: "",
		life : 0,
		baseattack: 0,
		attack: 0,
		chosen: "no"
	};

// Basic stats for all characters
var characterchoices = {
	ewok : {
		id: 'ewok',
		name:"An Ewok", 
		life: 400, 
		attack: 5
	},
	yoda : {
		id: 'yoda',
		name:"Yoda", 
		life: 200, 
		attack: 20
	},
	chewy : {
		id: 'chewy',
		name:"Chewy", 
		life: 225, 
		attack: 10
	},
	boba : {
		id: 'boba',
		name:"Boba Fett", 
		life: 200, 
		attack: 12
	},
	dm : {
		id: 'dm',
		name:"Darth Maul", 
		life: 200, 
		attack: 15
	},
	vadar : {
		id: 'vadar',
		name:"Darth Vadar", 
		life: 200, 
		attack: 18
	},
	robot : {
		id: 'robot',
		name:"General Grievous", 
		life: 200, 
		attack: 12
	},
	sideous : {
		id: 'sideous',
		name:"Darth Sidious", 
		life: 150, 
		attack: 25
	}
};

// Variables that are used to that a function can be used universally in the code
	var clickcharacter = {};
	var selectedCharacter = "";

// Variable to track the number of dead heros
	var dead = 0;

// Function to determine if ewok was clicked as main character, enemy, or in the middle of a battle
	$("#ewok").click(function(){
		clickedCharacter = characterchoices.ewok;
		selections(ewok);
	});

	$("#dm").click(function(){
		clickedCharacter = characterchoices.dm;
		selections(dm);
	});

	$("#yoda").click(function(){
		clickedCharacter = characterchoices.yoda;		
		selections(yoda);
	});

	$("#chewy").click(function(){
		clickedCharacter = characterchoices.chewy;		
		selections(chewy);
	});

	$("#robot").click(function(){
		clickedCharacter = characterchoices.robot;		
		selections(robot);
	});

	$("#vadar").click(function(){
		clickedCharacter = characterchoices.vadar;		
		selections(vadar);
	});

	$("#sideous").click(function(){
		clickedCharacter = characterchoices.sideous;		
		selections(sideous);
	});

	$("#boba").click(function(){
		clickedCharacter = characterchoices.boba;		
		selections(boba);
	});

//Onclick function to handle the attack button
	$("#attackbtn").click(function(){
		if (enemy.chosen == "yes"){
			$(".gamedescription").css("color", "#cccccc");
			if (myCharacter.life > 0 && enemy.life > 0){
				enemy.life = enemy.life - myCharacter.attack;
				myCharacter.life = myCharacter.life - enemy.attack;
				myCharacter.attack = myCharacter.attack + myCharacter.baseattack;
				$("#chosen .health").text("Health: " + myCharacter.life);
				$("#chosen .attack").text("Attack: " + myCharacter.attack);
				$("#enemy .health").text("Health: " + enemy.life);
				$("#enemy .attack").text("Attack: " + enemy.attack);
			}
			if (myCharacter.life <= 0){
				setTimeout(function(){alert("You have been killed.\nPressing OK Will Resart Game.");}, 100);
				setTimeout(function(){location.reload();}, 500);
			}
			if (enemy.life <= 0){
				$(".gamedescription").text("You killed " + enemy.name + ". Pick another enemy to battle!");
				$("#enemy").css("visibility", "hidden");
				enemy.chosen = "no";
				dead++;
				if (dead == 7) {
					$(".gamedescription").text("You have conquered the galaxy!");
					$(".gamedescription").css("color", "green");
					$("#selectSection").html("");
				}
			}
		}
	});

//Selection function used for onclick events
	function selections (character){
		if (myCharacter.chosen == "no"){
			selectedCharacter = $('#'+character.id).html();
			$("#chosen").html(selectedCharacter);
			$("#chosen").css("visibility", "visible");
			$('#'+character.id).css("visibility", "hidden");
			myCharacter.name = clickedCharacter.name;
			myCharacter.life = clickedCharacter.life;
			myCharacter.attack = clickedCharacter.attack;
			myCharacter.baseattack = clickedCharacter.attack;
			myCharacter.chosen = "yes";
			console.log(myCharacter);
			$(".gamedescription").text("You chose " + myCharacter.name + ". Now select an enemy to battle!");
			$(".fighteralert").text("Select an enemy to do battle against. You must defeat them all to win, so pick wisely.");
		} else if (enemy.chosen == "no"){
			var selectedEnemy = $('#'+character.id).html();
			$("#enemy").html(selectedEnemy);
			$("#enemy").css("visibility", "visible");
			$('#'+character.id).css("visibility", "hidden");
			enemy.name = clickedCharacter.name;
			enemy.life = clickedCharacter.life;
			enemy.attack = clickedCharacter.attack;
			enemy.baseattack = clickedCharacter.attack;
			enemy.chosen = "yes";
			console.log(enemy);
			$(".gamedescription").text("Prepare to battle " + enemy.name + "!");
			$(".notifications").css("visibility", "visible");
			$("#attackbtn").css("visibility", "visible");
			$(".fighteralert").text("These fighters are still waiting in the wings to battle you.");
		} else {
			$(".gamedescription").text("Please finish your current battle before chosen another enemy.");
			$(".gamedescription").css("color", "red");
		}
	}
});