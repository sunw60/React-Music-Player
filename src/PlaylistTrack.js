import React from 'react'

const PlaylistTrack = ({ track, uri, choosePlaylistTrack }) => {
     const playSong = () => {
       choosePlaylistTrack(track)
    } 
    return (
        <div className="d-flex m-2 align-items-center" style={{ cursor: "pointer"}} onClick={ playSong }>
        <img src={track.albumUrlSmall} style = {{height: "64px", width: "64px"}}/>
        <div className="m1-3">
            <div className = "m-2 text-white">{track.title}</div>
            <div className=" m-2 text-muted">{track.artist}</div>
        </div>
    </div>
    )
}

export default PlaylistTrack
