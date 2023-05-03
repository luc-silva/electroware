import { useEffect, useState } from "react";

//style
import styles from "./InfoToast.module.css";
import { X, Info, WarningCircle } from "phosphor-react";

type ToastTypes = "warning" | "info";

export const InfoToast = ({
    type,
    message,
    isActive,
    toggle,
}: {
    type: ToastTypes;
    message: string;
    isActive: boolean;
    toggle: Function;
}) => {
    let [actualStyle, setActualStyle] = useState("")

    function toggleToast() {
        toggle(!isActive);
    }

    function setClass() {
        return type === "info"
            ? [styles["toast"], styles["info"]].join(" ")
            : [styles["toast"], styles["warning"]].join(" ");
    }

    useEffect(() => {
        if (isActive) {
            setActualStyle(setClass())
            let timeout = setTimeout(() => {
                toggleToast();
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [type, isActive, message]);

    if (!isActive) return null;
    return (
        <div className={actualStyle}>
            <div className={styles["toast__message"]}>
                {(type === "warning" && (
                    <WarningCircle size={25} color={"white"} weight="bold" />
                )) || <Info size={25} color={"white"} weight="bold" />}
                <p>{message}</p>
            </div>
            <div className={styles["toast__btn"]} onClick={toggleToast}>
                <X size={30} color={"white"} weight="bold" />
            </div>
            <div className={styles["timer-bar"]}/>
        </div>
    );
};
