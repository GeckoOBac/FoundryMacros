// Parameters
const AURA_DISTANCE = 30; // Grid units

// Initialisation
if (canvas.tokens.controlled.length === 0) {
    return ui.notifications.error("No token is selected!")
}
let token = canvas.tokens.controlled.find(t => t.name === game.user.character.name);
let actor = token.document;

if(actor.getFlag('token-auras', 'aura1.visible') === true) {
   actor.setFlag('token-auras', 'aura1.distance', null);
   actor.setFlag('token-auras', 'aura1.visible', false);
} else {
   actor.setFlag('token-auras', 'aura1.distance', AURA_DISTANCE);
   actor.setFlag('token-auras', 'aura1.visible', true);
}