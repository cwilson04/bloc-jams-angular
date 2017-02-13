//et up state configuration using an Angular provider. 
//Providers are services used by Angular modules to either configure or define default behavior for a certain Angular module.
(function() {
     function config($stateProvider, $locationProvider) {
//By setting the html5Mode method's enabled property to true, the hashbang URLs are disabled; that is, users will see clean URLs without the hashbang. 
         $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
         $stateProvider
         .state('landing', {
             url: '/',
             templateUrl: '/templates/landing.html'
         })
         .state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'
         })
         .state('collection', {
             url: '/collection',
             templateUrl: '/templates/collection.html'
         });
     }
 
     angular
//The second argument is the list of external modules that blocJams depends on, known as dependency injection. 
//After we add an external module's script source, we can inject the module into the application by adding it to the array:
         .module('blocJams', ['ui.router'])
         .config(config);
 })();