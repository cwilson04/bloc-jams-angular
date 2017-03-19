(function() {
    //Inject the Fixtures service into the SongPlayer service. Then use the getAlbum method to store the album information:
    function SongPlayer($rootScope, Fixtures) {
        
        var SongPlayer = {};
        
        /**
         * @desc Active song object from list of songs
         * @type {Object}
        */
        
         SongPlayer.currentSong = null;
         
         /**
            * @desc Current playback time (in seconds) of currently playing song
            * @type {Number}
         */
        SongPlayer.currentTime = null;
        
        /**
             * @desc Active album object from album collection
             * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
             * @desc Buzz object audio file
             * @type {Object}
        */
        var currentBuzzObject = null;
         
        //when song row is selected the setSong function fires
        
        /**
             * @function setSong
             * @desc Stops currently playing song and loads new audio file as currentBuzzObject
             * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                //currentBuzzObject fires when song is playing and we move to new song row
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
       
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true,
                volume: SongPlayer.volume
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
        
            SongPlayer.currentSong = song;
        };
        
   
        /**
             * @function SongPlayer.play
             * @desc Update the play method with a condition that checks if the currently playing song is not equal to the song the user clicks on:
             * @param {Object} song
        */     
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
        //If the user can trigger the play method on a song that is already set as the  currentSong, then the assumption is that the song must be paused. 
        //conditional statement if (currentBuzzObject.isPaused()) is a check to make sure our assumption is correct.
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
            
       /**
             * @function playSong
             * @desc Plays selected currentBuzzObject
             * @param {Object} song
        */     
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
    
    

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
//stopSong function (1)Stop the current Buzz object: currentBuzzObject.stop();(2)Set the playing property of the song object to null: song.playing = null;
//Replace all instances when these two lines of code are used together with the stopSong function.        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
    
        SongPlayer.previous = function() {
            console.log("inside previous button function");
//We use the getSongIndex function to get the index of the currently playing song and then decrease that index by one.
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            console.log("currentSongIndex", currentSongIndex);
//what should happen when the user is on the first song and clicks the previous button?
//stop the currently playing song, and
//set the value of the currently playing song to the first song.
             if (currentSongIndex < 0) {
                currentSongIndex = currentAlbum.songs.length - 1;
//conditional that moves to the previous song and automatically plays it
             }
             
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if(currentSongIndex >= currentAlbum.songs.length) {
                currentSongIndex = 0;
            }
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.volume = 60;
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
            currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };
        
        return SongPlayer;
    }
    
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
    