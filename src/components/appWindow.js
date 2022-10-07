import { useEffect, useRef, useState } from "react";

export function AppWindow() {
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [styles, setStyles] = useState({});


  function dragStart(e) {
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
    setDragging(true);
  }

  function draggingMid(e) {
    if (dragging) {
      setStyles({
        // left: e.screenX - diffX,
        // top: e.screenY - diffY,
        width: e.screenX-diffX,
      });
      console.log(styles);
    }
  }

  function dragEnd() {
    setDragging(false);
  }


  return (
    

        <div className='Dialog' style={styles}>
        <div className='DialogTitle'
        onMouseDown={dragStart}
        onMouseMove={draggingMid}
        onMouseUp={dragEnd}>My Dialog</div>
        <div className='Contents'>
            Contents of the Dialog: 
                - one
                - two
                - three 
        </div>
        <div className='closeButton'>
            Close
        </div>
    </div>
  );
}

// Draggable window is a custom hook conversion of this source: https://github.com/Harjotb/TechLifeJo-Draggable-Element/blob/master/src/Components/Dialog.js

// useEffect explainer

// useEffect(() => {
//     This part runs when component is added to UI and states change
// })

// useEffect(() => {
//     code here
// },
// [dragging] <== This code only runs when this state is changed
//)

// useEffect(() => {
//     return () => This part runs when component is removed from UI
// })
