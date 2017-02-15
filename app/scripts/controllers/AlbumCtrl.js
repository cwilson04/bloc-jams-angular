 (function() {
     function AlbumCtrl($scope) {
         $scope.song = 'this is a song name';
         $scope.number = 'num';
         $scope.duration = '3.00';
         this.albumData = angular.copy(albumPicasso);
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();
 