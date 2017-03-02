(function() {
    //Inject the Fixtures service into the SongPlayer service. Then use the getAlbum method to store the album information:
    function SongPlayer(Fixtures) {
        
        var SongPlayer = {};
        
        /**
         * @desc Active song object from list of songs
         * @type {Object}
        */
        
         SongPlayer.currentSong = null;
        
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
                preload: true
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
            playSong(song);
        };
        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
    
    

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
    
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
        
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
     angular
         .module('blocJams')
          .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
    