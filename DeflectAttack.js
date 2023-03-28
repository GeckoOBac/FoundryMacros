// Parameters
const ATKR_NAME = "Rusty";
const ATT_NAME = "int";
const ATK_NAME = "Deflect Attack";
const DMG_DIE = "1d4";
const DMG_TYPE = "Force";

// Initialisation variables
let actor_data = game.user.character.data.data;
let attacker = game.actors.find(actor => actor.name === ATKR_NAME);
let char_data = {prof: actor_data.attributes.prof, attMod: actor_data.abilities[ATT_NAME].mod};


   let damageRollOptions = {
      rollMode: "roll",
      fastForward: true,
      critical: false,
      parts: [DMG_DIE, "@attMod"],
      data: char_data,
      chatMessage: false
   };
   
   game.dnd5e.dice.damageRoll(damageRollOptions ).then(damage_roll => {
      // Defining the chat message look
      let messageContent = `
	  <div class="beyond20-header">
	    <img class="beyond20-character-avatar" src="Rusty.png" data-edit="img" title="${ATK_NAME}" width="37" height="37">
	    <details open="">
		  <summary>
		    <a>${ATK_NAME}</a>
		  </summary>
		  <div class="beyond20-description">${ATKR_NAME} imposes disadvantage on the attack roll of one creature it can see that is within 5 feet of it, provided the attack roll is against a creature other than the defender. Additionally the attacker takes force damage equal to ${DMG_DIE}+${char_data.attMod}</div>
		</details>
	  </div>
      Damage
      <div class="dice-roll">
         <div class="dice-result">
            <div class="dice-formula">${damage_roll.formula}</div>
            <div class="dice-tooltip" style="display: none;">
               ${iterateDice(damage_roll)}
            </div>
	<h4 class="dice-total"> ${damage_roll.total} (${DMG_TYPE})</h4>
         </div>
      </div>`;
      
      let chatData = {
         user: game.user.id,
         speaker: ChatMessage.getSpeaker({ actor: attacker }),
         content: messageContent,
         sound: "sounds/dice.wav"
      };
      ChatMessage.create(chatData, {});
   });


// Function to iterate on dice results to create the tooltip section
function iterateDice(roll) {
   let result = "";
   
   // Iterate on the various types of dice
   let die;
   for(die of roll.dice) {
      result += `<section class="tooltip-part">
                    <div class="dice">
                       <header class="part-header flexrow">
                          <span class="part-formula">${die.formula}</span>
                          <span class="part-total">${die.total}</span>
                       </header>
                       <ol class="dice-rolls">`;
     
     // Iterate on the dice results for this die type
      let die_roll;
      for(die_roll of die.results) {
         result += `<li class="roll die d${die.faces} ${die_roll.result == 1 ? "min" : (die_roll.result == die.faces ? "max" : "")}">${die_roll.result}</li>`;
      }
     
      // Close the section of the tooltip
      result += `</ol>
               </div>
             </section>`;
   }
   
   return result;
}