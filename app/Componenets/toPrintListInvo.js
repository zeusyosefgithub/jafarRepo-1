import React from "react";
import '../toPrintListInvo.css';

export const ComponentToPrintInvoList = React.forwardRef((props, ref) =>{

    return(
        <div className="ggggg" ref={ref}>
            {
                props.invo
            }
        </div>
    )
})