import { animate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.04)";

export function useRaisedShadow(value, activeShadow) {

  const boxShadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isActive = false;
    value.onChange((latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, activeShadow, {duration: 0.2});
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow, {duration: 0.2})
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}
