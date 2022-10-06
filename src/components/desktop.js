import '../App.css';
import * as React from 'react';
import Taskbar from './taskbar'
import Dialog from './Dialog';
import Resizeable from './resizeable';

export default function Desktop(){

    return(
    <div className="desktop-background">
              {/* <Dialog show={true}/> */}
              <Resizeable window={<Dialog show={true}/>}/>
    <div className="desktop-frontlayer">
        <Taskbar/>
    </div>
  </div>
  )
}