import React from 'react'

const Lyrics = (track, lyrics) => {
    return (
        <div className="text-center lyricsfont d-flex" style={{ whiteSpace:"pre", overflowY: "auto" }}>
                <div><img src={track.albumUrl} style = {{height: "64px", width: "64px"}}/></div>        
                <div>{ lyrics }</div> 
        </div>
    )
}

export default Lyrics
