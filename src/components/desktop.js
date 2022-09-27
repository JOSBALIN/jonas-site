import '../App.css';
import * as React from 'react';
import Taskbar from './taskbar'

export default function Desktop(){

    return(
    <div className="desktop-background">
    <div className="desktop-frontlayer">
        <Taskbar/>
    </div>
  </div>
  )
}