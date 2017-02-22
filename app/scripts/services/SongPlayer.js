(function() {
    function SongPlayer() {
        var SongPlayer = {};

        var currentSong = null;
        
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
                currentSong.playing = null;
            }
            
        
        
        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
        
        currentSong = song;
        };


        /**
             * @function SongPlayer.play
             * @desc Update the play method with a condition that checks if the currently playing song is not equal to the song the user clicks on:
             * @param {Object} song
        */     
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                //If the user can trigger the play method on a song that is already set as the  currentSong, then the assumption is that the song must be paused. 
                //conditional statement if (currentBuzzObject.isPaused()) is a check to make sure our assumption is correct.
                } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                 currentBuzzObject.play();
            }
            
       /**
             * @function playSong
             * @desc Plays selected currentBuzzObject
             * @param {Object} song
        */     
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
            


       playSong(song);
       console.log("Play Song");
     }
     
 
};

    SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
    };
    return SongPlayer;
    }
    
    
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();