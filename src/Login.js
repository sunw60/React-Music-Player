import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

export const authEndpoint = 'https://accounts.spotify.com/authorize'

const redirect_uri = 'http://localhost:3000'
const client_id = 'f84856dbbb614c11a86044b6586840b7'
const client_secret = '648582736fda4d6ba579c4f328d50002'

const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ];

export const auth_url = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

//pulling access token from url
export const getToken = () => {
    return window.location.hash.substring(1).split('&')
    .reduce((initial, item) => {
      let parts = item.split('='); 
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
    // const token = new URLSearchParams(window.location.hash).get('access_token')
    // return token
}

//displaying login button
export default function Login() {
    return (
    <Container className = ' d-flex justify-content-center align-items-center' style ={{ minHeight: "100vh"}}>
    <a className = 'btn btn-success btn-lg' href={auth_url}>
        Login
    </a>
    </Container> 
    )
}
