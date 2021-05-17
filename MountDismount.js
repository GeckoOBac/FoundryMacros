// Parameters
const MOUNT_NAME = "Rusty";

// Module constants
const MODULE_NAME = "foundryvtt-mountup"; // DO NOT EDIT
const FLAG_NAME = "mount"; // DO NOT EDIT

// Obtaining Rider and Mount Tokens
let rider_token = canvas.tokens.placeables.find(t => t.name === game.user.character.data.name);
let mount_token = canvas.tokens.placeables.find(t => t.name === MOUNT_NAME);

// Check if the rider is already riding something.
if(rider_token.getFlag(MODULE_NAME, FLAG_NAME)) {
   // User token is already mounted, dismount it
   MountUp.dismount(rider_token.id);
   // Placing control on the rider for ease of movement
   mount_token.release();
   rider_token.control();
} else {
   // User token isn't mounted, let's try to mount up
   // First, let's try to see if the rider is in range
   let ruler = new Ruler();
   ruler.waypoints[0] = rider_token.center;
   // Preset for 0 distance, as ruler will be undefined if the tokens overlap
   let distance = 0;
   if(ruler.measure(mount_token.center)[0]) {
     distance = ruler.measure(mount_token.center)[0].distance;
   }
   if(distance <= 5) {
      // Then we attempt to mount up properly
      MountUp.mount(rider_token.id, mount_token.id);

      // Placing control on the mount for ease of movement
      mount_token.control();
      rider_token.release();
   } else ui.notifications.warn("You must be in a square adjacent to your ride to attempt to mount up.");

   ruler.clear();
}