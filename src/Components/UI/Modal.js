import React from 'react';
import classes from "./Modal.module.css";
import ReactDom from "react-dom";

const Backdrop=props=>{
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}
const ModalOverlay=props=>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children} </div>
    </div>
}

const ele=document.getElementById("overlays")

function Modal(props) {
  return (
    <>
        {ReactDom.createPortal(<Backdrop onClose={props.onClose} />,ele)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,ele)}
    </>
  )
}

export default Modal