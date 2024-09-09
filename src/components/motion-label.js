import React from 'react';
import { MotionValue } from "framer-motion";

export const MotionLabel = ({ className, children }) => {
    const rFrame = React.useRef(null)
    React.useLayoutEffect(
        function setListenerIfTextIsMotionValue() {
            if (rFrame.current) {
                if (children instanceof MotionValue) {
                    rFrame.current.textContent = children.get()
                    return children.onChange(
                        v => (rFrame.current.textContent = v)
                    )
                }
            }
        },
        [children]
    )

    return (
        <div
            ref={rFrame}
            className={className}
        >
            {children instanceof MotionValue
                ? children.get()
                : children}
        </div>
    )
}
