import '../App.css';
import * as React from 'react';
import Taskbar from './taskbar'
import { AppWindow } from './appWindow';
import Draggable from './hooks/Draggable';
import { useRef } from 'react';
import './Dialog.css'

export default function Desktop(){




    return (
      <div className="desktop-background">
        {/* <Dialog show={true}/> */}
        {/* <Resizeable window={<Dialog show={true}/>}/> */}
        <AppWindow/>
        {/* <DraggableElement>
          <AppWindow />
        </DraggableElement> */}
        <div className="desktop-frontlayer">
          <Taskbar />
        </div>
      </div>
    );
}