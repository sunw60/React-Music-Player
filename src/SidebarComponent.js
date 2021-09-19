import React from 'react'
import './SidebarComponent.css'

const SidebarComponent = ({ option, Icon}) => {
    return (
        <div className="sidebarcomponent" >
            {Icon && <Icon className = "sidebaricon" />}
            {Icon? <h4>{option}</h4> : <p>{option}</p>}
        </div>
    )
}

export default SidebarComponent
