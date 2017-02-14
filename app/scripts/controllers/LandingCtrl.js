(function() {
    //object contructor
     function LandingCtrl() {
         this.heroTitle = "Turn the Music Up!";
     }
 
     angular
         .module('blocJams')
         //The .controller() method has two parameters:
            // The name of the controller.
            // A callback function or an array that injects dependencies, with a callback function as the last item in the array.
            //The last item in the array must be the callback function that executes when the controller is initialized
         .controller('LandingCtrl', LandingCtrl);
 })();