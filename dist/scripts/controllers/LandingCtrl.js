(function() {
    //object contructor
     function LandingCtrl() {
     }
 
     angular
         .module('blocJams')
         //The .controller() method has two parameters:
            // The name of the controller.
            // A callback function or an array that injects dependencies, with a callback function as the last item in the array.
         .controller('LandingCtrl', LandingCtrl);
 })();