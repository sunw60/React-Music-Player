import React, { useState, useEffect } from 'react'
import { useDataLayerValue } from './DataLayer.js'
import "./Sidebar.css"
import SidebarComponent from './SidebarComponent.js'
import SpotifyWebApi from 'spotify-web-api-js'
import SearchResult from './SearchResult.js'

const spotifyApi = new SpotifyWebApi({
    clientId:"f84856dbbb614c11a86044b6586840b7",
})

const Sidebar = () => {
    const [{ playlists }, dispatch] = useDataLayerValue();
 
   
    return (
        <div className = "sidebar">
            <img>src</img>
            <h1>
                <SidebarComponent option="Home" />
                <SidebarComponent option="Library" />
                <SidebarComponent option="Search" />
            </h1>
            
            {playlists?.items?.map(playlist => (
                <SidebarComponent key = {playlist.name} option={playlist.name} />
                    
            ))}

        </div>
    )
    
}

export default Sidebar

