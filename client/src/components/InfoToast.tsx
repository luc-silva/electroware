import styles from "./InfoToast.module.css";
import { X, Info, WarningCircle } from "phosphor-react";
import { useEffect } from "react";

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
    function toggleToast() {
        toggle(!isActive);
    }
    useEffect(() => {
        if(isActive){
            setTimeout(() => {
              toggleToast()  
            }, 3000)
        }
        return () => {}
    })

    if (!isActive) return null;
    return (
        (type === "info" && (
            <div className={styles["info-toast"]}>
                <div className={styles["info-toast__message"]}>
                    <Info size={25} color={"white"} weight="bold" />
                    <p>{message}</p>
                </div>
                <div className={styles["info-toast__btn"]}>
                    <X size={30} color={"white"} weight="bold" />
                </div>
            </div>
        )) || (
            <div className={styles["warning-toast"]}>
                <div className={styles["warning-toast__message"]}>
                    <WarningCircle size={25} color={"white"} weight="bold" />
                    <p>{message}</p>
                </div>
                <div
                    className={styles["warning-toast__btn"]}
                    onClick={toggleToast}
                >
                    <X size={30} color={"white"} weight="bold" />
                </div>
            </div>
        )
    );
};
