import { LockSimple, LockSimpleOpen } from "phosphor-react";

type ISVGButtonVisibility = ISVGButtonComponentProps & { isHidden: boolean };

export const VisibilityBtn = ({
    isHidden,
    onClick,
    sizing = 25,
    weight = "bold",
}: ISVGButtonVisibility) => {
    return (
        (!isHidden && (
            <LockSimpleOpen size={sizing} weight={weight} onClick={onClick} />
        )) || <LockSimple size={sizing} weight={weight} onClick={onClick} />
    );
};
