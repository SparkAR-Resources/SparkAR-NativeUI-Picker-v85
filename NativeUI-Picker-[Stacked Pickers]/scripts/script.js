// Stacked Pickers - NativeUI Picker example v88
// by Luke Hurd :: @lukehurd

// This project is meant to demonstrate how to create stacked (or tiered) menus
// using the NativeUI Picker. By loading new configurations on the fly, you can
// create a series of different NativeUI menus within your effect - allowing for
// a "Choose your own adventure" style navigation.

// To clear or remove the NativeUI at any point, just load an empty configuration
// no buttons.

// Load the modules
const NativeUI = require('NativeUI');
const Textures = require('Textures');

// First, we create a Promise and load all the assets we need for our scene
// The following example shows how to load Textures, Materials, and an Object.

Promise.all([

    // Loading Textures for the buttons
    Textures.findFirst('1'),
    Textures.findFirst('2'),
    Textures.findFirst('3'),


]).then(function(results){
    // Assets are loaded, so let's set them all so we can use them later in the script.
    // The assets are all returned in an object called "results" in the order that we 
    // loaded them. Remember, the index starts at 0 so the first asset is always results[0],
    // the next is results[1], etc.

    // Lets set the buttons for the NativeUI Picker
    const button1 = results[0];
    const button2 = results[1];
    const button3 = results[2];

    // Create config for the first picker
    const first = {
      selectedIndex: 0,

      items: [
        {image_texture: button1},
        {image_texture: button1},
        {image_texture: button1}
      ]

    };

    // Create config for the second picker
    const second = {
      selectedIndex: 1,

      items: [
        {image_texture: button2},
        {image_texture: button2},
        {image_texture: button2}
      ]

    };

    // Create config for the third picker
    const third = {
      selectedIndex: 2,

      items: [
        {image_texture: button3},
        {image_texture: button3},
        {image_texture: button3}
      ]

    };

    // Create the NativeUI Picker
    const picker = NativeUI.picker;

    // Load our first picker
    picker.configure(first);

    // Show the NativeUI Picker
    picker.visible = true;

    // This is a monitor that watches for the picker to be used.
    picker.selectedIndex.monitor().subscribe(function(val) {

      // This is a switch that monitors the value of the NativeUI selection.
      // If the user selects the first button, if will load the first picker
      // If the user selects the second button, it will load the second picker
      // If the user selects the third button, it will load the third picker
      switch(val.newValue) {
        case 0:
          picker.configure(first)
          break;
        case 1:
          picker.configure(second)
          break;
        case 2:
          picker.configure(third)
          break;
      }

      // Show the NativeUI Picker
      picker.visible = true;
    
    });

});