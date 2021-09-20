import React, { useState, useEffect } from 'react'
import { Container, Form, FormControl, FormGroup, Row, Col, Card, Button  } from 'react-bootstrap';
import { useDataLayerValue } from './DataLayer.js';
import { withRouter } from "react-router";
import Sidebar from "./Sidebar.js"
import './Sidebar.css'
import Player from './Player'
import './Dashboard.css'
import SpotifyWebApi from 'spotify-web-api-js'
import SearchResult from './SearchResult';
import axios from "axios";
import SidebarComponent from './SidebarComponent.js';
import './Player.css';
import Playlist from './Playlist.js'
import PlaylistTrack from './PlaylistTrack.js'
import Lyrics from './Lyrics.js'
import AlbumArt from './AlbumArt.js';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Avatar } from '@material-ui/core';


const spotifyApi = new SpotifyWebApi({
    clientId:"f84856dbbb614c11a86044b6586840b7",
})

export default function Dashboard({ token }) {
    const [search, setSearch] = useState("")
    const [user, setUser] = useState()
    const [searchResults, setSearchResults] = useState([])
    const [currentlyPlaying, setCurrentlyPlaying] = useState('')
    const [lyrics, setLyrics] = useState()
    const [{ playlists }, dispatch] = 
    useDataLayerValue();
    const [currentPlaylist, setCurrentPlaylist] = useState()
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [state, setState] = useState({})

    const chooseTrack = (track) => {

        setCurrentlyPlaying(track)
        setSearch('')
        setLyrics('')
        setPlaylistTracks([])
        
    }

    const choosePlaylistTrack = (track, playlist) => {
        setCurrentlyPlaying(track)
        spotifyApi.play(currentPlaylist);
        setSearch('')
        setLyrics('')
        setPlaylistTracks([])
    }

    const choosePlaylist = (playlist) => {
        setCurrentPlaylist(playlist)
        setSearch('')
        setLyrics('')
        setPlaylistTracks([])
    }

    useEffect(() => {
        if (currentlyPlaying) {
            axios.get('http://localhost:3001/lyrics', {
                params: {
                    track: currentlyPlaying.title,
                    artist: currentlyPlaying.artist
                }
            }).then(res => {
                setLyrics(res.data.lyrics)
            })
        }
        return () => {
        
        setPlaylistTracks([])
        
        }
    }, [currentlyPlaying])
//useEffect to set access token
    useEffect(() => {
    
       if (token) {
       spotifyApi.setAccessToken(token)
       spotifyApi.getMe('https://api.spotify.com/v1').then(res => {
           //console.log(res)
          
           setUser(res)
           
           
       })
       }
       
    }, [token])

//useEffect to set playlist
    useEffect(() => {
        if (!currentPlaylist) return setCurrentPlaylist([])
       
       if (!token) return

       spotifyApi.getPlaylistTracks(currentPlaylist).then(res =>{
          console.log(res)
           setPlaylistTracks(res.items.map(item => {
               const albumImageSmall = 
                item.track.album.images[0]
               
            if (albumImageSmall) {
               return {
                   artist: item.track.artists[0].name,
                   title: item.track.name,
                   uri: item.track.uri,
                   albumUrlSmall: albumImageSmall.url
               }
            } else {
                return {
                    artist: item.track.artists[0].name,
                   title: item.track.name,
                   playlistTrackUri: item.track.uri,
                   albumUrlSmall: "https://moonbooks.org/media/images/thumbnails_1000_1000/question-mark-img.JPEG?lastmod=1568857970.943363"
                }
                
            }
           }))
       })
       return () => {
       
        setLyrics('')
        setPlaylistTracks([])
        setCurrentPlaylist('')
       }
   }, [currentPlaylist, token])

    useEffect(() => {
         if (!search) return setSearchResults([])
        
        if (!token) return

        spotifyApi.searchTracks(search).then(res =>{
          // console.log(res.tracks.items)
            setSearchResults(res.tracks.items.map(track => {
                const albumImageSmall = track.album.images[0]
                const albumImageLarge = track.album.images[2]
                 if (albumImageSmall.url) {
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrlSmall: albumImageSmall.url,
                        albumUrlLarge: albumImageLarge.url,

                    }
                }
            
            }))
        })
        return () => {
        setLyrics('')
        setPlaylistTracks([])
        setCurrentPlaylist('')
        }
    }, [search, token])
    
    return (
    <>
    <div className = "webplayer">
        <div className="body">       
          <div className = "sidebar"> 
                <h1>
                    <div className ="userinfo">
                        <div>
                            <Avatar className ="userpfp"
                            style ={{"flex": 0.2}, { height: '70px', width: '70px' }} src={user?.images[0]?.url} alt={user?.display_name} />
                        </div>
                    </div>

                    <div className = "username" style={{"flex": 0.8}}>
                        <h4>{user?.display_name}</h4>
                    </div>
                    
                    {/* <SidebarComponent option="Home" Icon={HomeIcon} />
                    <SidebarComponent option="Search" Icon = {SearchIcon} />
                    <SidebarComponent option="My Library" */}
                    
                    <div className = "margintop">
                        <LibraryMusicIcon />
                        <strong className = "sidebarplaylists"> Playlists</strong>
                        
                    </div>
                    
                    <hr />
                
                </h1>
                <div style ={{overflowY: "auto"}}>
                {playlists?.items?.map(playlist => (
                    <Playlist key = {playlist.id} option={playlist.name} id = {playlist.id}
                    choosePlaylist = {choosePlaylist} />
                        
                ))}
                <br/>
                <br/>
                <br/>
                
                </div>
            </div>
        
            <div className="bodyright">
                <div className = "lefthalf">
                    <div className="d-flex">
                    <input className= "searchbar"
                        type="text"
                        id="search"
                        name="search"
                        //add magnifying glass
                        placeholder= "Search For Songs, Artists, etc."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                       />
                    </div>
                    
                    {/* </FloatingLabel> */}
                    <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                        {searchResults.map(track => (
                            <SearchResult track = { track } key = { track.uri } chooseTrack={chooseTrack}/>
                        ))}
                        </div>

                    <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                        {playlistTracks.map(track => (
                            <PlaylistTrack track = { track } uri = { track.playlistTrackUri }
                            key = { track.uri } choosePlaylistTrack={choosePlaylistTrack}/>
                        ))}
                        </div>

                    <div>
                    {searchResults.length === 0 && (
                        <>
                        <div className = "d-flex">
                            <div className="text-center lyricsfont" style={{ whiteSpace:"pre", overflowY: "auto" }}>
                                {/* <Lyrics lyrics={lyrics} track={currentlyPlaying}/> */}    
                                { lyrics } 
                                <br />    
                                <br />    
                                <br />
                                <br />
                                <br />   
                            </div>
                        </div>
                        </>
                    )}
                    </div>
                </div>
                {currentlyPlaying.length !== 0 && (
                <div className="righthalf">
                    {<AlbumArt track = {currentlyPlaying}/>}
                </div>
                )}
            </div>  
         
      </div>
       <div className= "footer"><Player token = {token} trackUri={currentlyPlaying?.uri}/> </div> 
        
     </div>

    </>
    
    )
}
