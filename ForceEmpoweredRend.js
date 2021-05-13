// Retrieve the user's default character data.
let actor_data = game.user.character.data.data;
let rusty = game.actors.find(actor => actor.name === "Rusty");
let the_speaker = ChatMessage.getSpeaker({ actor: rusty });

let char_data = {prof: actor_data.attributes.prof, intMod: actor_data.abilities.int.mod};

// Roll for attack
let attack_roll = new Roll("1d20 + @prof + @intMod", char_data);
let r1 = attack_roll.roll();
let message1 = r1.toMessage({ flavor: `Force-Empowered Rend - Attack Roll`, speaker: the_speaker}, {create: false});

let damage_roll = new Roll("1d8 + @prof", char_data);
damage_roll.roll().toMessage({ flavor: `Damage (Force)`, speaker: the_speaker}, {create: false});