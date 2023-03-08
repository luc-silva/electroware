import { FaqCard } from "../components/FaqCard";

import { questions } from "../testData";
import styles from "./Faq.module.css";

export const Faq = () => {
    return (
        <main className={styles["faq"]}>
            <section className={styles["faq-main"]}>
                <h2>Perguntas comuns</h2>
                <div className={styles["faq-container"]}>
                    {questions.map(({ faqQuestion, faqAnswer }) => {
                        return (
                            <FaqCard faqAnswer={faqAnswer} faqQuestion={faqQuestion}/>
                        );
                    })}
                </div>
            </section>
        </main>
    );
};
