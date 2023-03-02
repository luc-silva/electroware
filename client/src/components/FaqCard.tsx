
import { CaretDown, CaretRight } from "phosphor-react";
import { useReducer, useState } from "react";

import styles from "./FaqCard.module.css";

export const FaqCard = ({
    faqAnswer,
    faqQuestion,
}: {
    faqAnswer: string;
    faqQuestion: string;
}) => {
    let [isCardActive, toggleCard] = useReducer((checked) => !checked, false);
    function handleCard() {
        toggleCard();
    }
    
    return (
        <div className={styles["faq-item"]} onClick={handleCard}>
            <div className={styles["question-container"]}>
                <div className={styles["item-icon"]}>
                    {(isCardActive && <CaretDown size={30} />) || (
                        <CaretRight size={30} />
                    )}
                </div>
                <div className={styles["item-question"]}>{faqQuestion}</div>
            </div>
            {isCardActive && (
                <div className={styles["item-answer"]}>{faqAnswer}</div>
            )}
        </div>
    );
};
