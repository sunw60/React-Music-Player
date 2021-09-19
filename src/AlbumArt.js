import React from 'react'
import './AlbumArt.css'

const AlbumArt = ({ track }) => {
    return (
        <div className = "albumart">
            <img src={track.albumUrlSmall} style = {{height: "325px", width: "325px"}}/>
            <strong> {track.title} </strong>
            <p> {track.artist}</p>
        </div>
    )
}

export default AlbumArt
