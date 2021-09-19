import React from 'react'
import './SearchResult.css'

const SearchResult = ({ track, chooseTrack }) => {
    function playSong() {
        chooseTrack(track)
    }
    return (
        
        <div className="d-flex m-2 align-items-center searchresult" style={{ cursor: "pointer"}} onClick={ playSong }>
            <img src={track.albumUrlSmall} style = {{height: "64px", width: "64px"}}/>
            <div className="m1-3">
                <div className = "m-2 text-white">{track.title}</div>
                <div className=" m-2 text-muted">{track.artist}</div>
            </div>
        </div>
    )
}

export default SearchResult
