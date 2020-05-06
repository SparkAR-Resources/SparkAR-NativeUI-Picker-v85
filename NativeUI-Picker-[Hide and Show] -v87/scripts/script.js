// Load the modules
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Patches = require('Patches');

// Start our promise
Promise.all([

    // Loading Textures for the buttons
    Textures.findFirst('1'),
    Textures.findFirst('2')


]).then(function(results){
    
    // Promise is returned so let's get to work
    const button1 = results[0];
    const button2 = results[1]

   
    // This is the normal NativeUI configuration
    const configuration = {
      selectedIndex: 0,

      items: [
        {image_texture: button1},
        {image_texture: button2}
      ]

    };

    // This is an empty NativeUI configuration
    // that we'll load when the camera flips to the back
    const empty = {
      selectedIndex: 0,
      items: [
      ]
    };

    // Create the NativeUI Picker
    const picker = NativeUI.picker;

    // This monitors the back camera from the patch editor
    Patches.outputs.getBoolean('backCameraActive').then(signal => {
      
      // Fire the monitor when the filter starts so we know
      // if we are starting on the front or back camera
      signal.monitor({fireOnInitialValue: true}).subscribe(val => {
        
        // If the value is true load the empty configuration
        // and set the visiblity to false. Otherwise, load the 
        // normal configuration for the NativeUI Picker
        if(val.newValue){
            picker.configure(empty);
            picker.visible = false;
        } else {
            picker.configure(configuration);
            picker.visible = true;
        }

      });
    });

});

