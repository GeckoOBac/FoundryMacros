// Parameters
const ATKR_NAME = "Rusty";
const ATT_NAME = "int";
const ATK_NAME = "Force-empowered Rend";
const DMG_DIE = "1d8";

// Initialisation variables
let actor_data = game.user.character.data.data;
let attacker = game.actors.find(actor => actor.name === ATKR_NAME);
let char_data = {prof: actor_data.attributes.prof, attMod: actor_data.abilities[ATT_NAME].mod};

// Attack Roll
let attackRollOptions = {
   rollMode: "roll",
   fastForward: true,
//  advantageSettings: [{}],
   parts: ["@prof", "@attMod"],
   data: char_data,
   chatMessage: false
};

game.dnd5e.dice.d20Roll(attackRollOptions ).then(attack_roll => {
// Attack roll results for crit/fumble
   let attack_class = "";
   let attack_crit = false;
   let attack_fumble = false;
   
   switch(attack_roll.results[0]) {
      case 1:
         attack_fumble = true;
         attack_class = "min fumble";
         break;
      case 20:
         attack_crit = true;
         attack_class = "max critical";
         break;
      default:
         break;
   }

   let damageRollOptions = {
      rollMode: "roll",
      fastForward: true,
      critical: attack_crit,
      parts: [DMG_DIE, "@prof"],
      data: char_data,
      chatMessage: false
   };
   
   game.dnd5e.dice.damageRoll(damageRollOptions ).then(damage_roll => {
      // Defining the chat message look
      let messageContent = `${ATK_NAME}
      <div class="dice-roll">
         <div class="dice-result">
            <div class="dice-formula">${attack_roll.formula}</div>
            <div class="dice-tooltip" style="display: none;">
               <section class="tooltip-part">
                  <div class="dice">
                     <header class="part-header flexrow">
                        <span class="part-formula">${attack_roll.dice[0].formula}</span>
                        <span class="part-total">${attack_roll.results[0]}</span>
                     </header>
                     <ol class="dice-rolls">
                         <li class="roll die d20 ${attack_class}">${attack_roll.results[0]}</li>
                     </ol>
                  </div>
               </section>
            </div>
            <h4 class="dice-total ${attack_class}"> ${attack_roll.total}</h4>
         </div>
      </div><br/>
      <div class="dice-roll">
         <div class="dice-result">
            <div class="dice-formula">${damage_roll.formula}</div>
            <div class="dice-tooltip" style="display: none;">
               ${iterateDice(damage_roll)}
            </div>
            <h4 class="dice-total"> ${damage_roll.total}</h4>
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
         result += `<li class="roll die d${die.faces}">${die_roll.result}</li>`;
      }
     
      // Close the section of the tooltip
      result += `</ol>
               </div>
             </section>`;
   }
   
   return result;
}
