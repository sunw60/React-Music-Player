import React from 'react'
import './SidebarComponent.css'
import SpotifyWebApi from 'spotify-web-api-js'

const Playlist = ({ option, id, choosePlaylist }) => {

const pickPlaylist = () =>{
    choosePlaylist(id)
}
    return (
        <div className="sidebarcomponent" onClick = { pickPlaylist }>
            <p>{option}</p>
        </div>
    )
}

export default Playlist
