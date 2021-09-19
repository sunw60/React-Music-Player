import React, { useState, useEffect } from 'react'
import SpotifyPlayer from "react-spotify-web-playback";
import './Player.css';

const Player = ({ token, trackUri }) => {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

       return ( 
       <SpotifyPlayer 
       className="player"
       token={ token } 
       showSaveIcon 
       magnifySliderOnHover 
       uris={trackUri ? [trackUri] : []} 

       callback = {state => {
           if (!state.isPlaying) {
            setPlay(false)
           } 
       }}
       play={play}
       styles={{
       activeColor: 'green',
       color: 'white',
       bgColor: '#282828',
       trackNameColor: 'white',
       sliderColor: 'white',
       loaderColor: 'black',
       sliderHandleColor: "white",
       sliderTrackColor: "gray",
       height: 50,
       }}
       />
       )
    
}

export default Player
