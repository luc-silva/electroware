import { IconWeight, Trash } from "phosphor-react";

export const DeletebBtn = ({
    onClick,
    sizing = 25,
    weight = "bold",
}: ISVGButtonComponentProps) => {
    return <Trash size={sizing} weight={weight} onClick={onClick}/>;
};
