import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import styles from "./AddFunds.module.css";

export const AddFunds = ({
    user,
    setUser,
}: {
    user: IUserSession;
    setUser: Function;
}) => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
        updateAccountDetails();
    }, []);

    async function updateAccountDetails() {
        await UserService.getUserPrivateInfo(user.id, user.token).then(
            (data) => {
                setUser(() => {
                    return { ...user, funds: data.funds };
                });
            }
        );
    }

    async function addAmount(event: React.MouseEvent) {
        let target = event.target;

        if (target instanceof HTMLButtonElement) {
            let amount = Number(target.value);
            await UserService.addFunds(amount, user.token).then(() => {
                updateAccountDetails();
            });
        }
    }

    return (
        <main role={"main"} className={styles["add-funds"]}>
            <section className={styles["add-funds__main"]}>
                <div className={styles["add-funds__title"]}>
                    <h2>Adicione Fundos a sua carteira electroware!</h2>
                </div>
                <div className={styles["add-funds__card-container"]}>
                    <div className={styles["add-funds__card"]}>
                        <div>
                            <p>Adicione</p>
                            <strong>1000 R$</strong>
                        </div>
                        <div className={styles["add-funds__btn-panel"]}>
                            <button onClick={addAmount} value={1000}>
                                Clique Aqui
                            </button>
                        </div>
                    </div>
                    <div className={styles["add-funds__card"]}>
                        <div>
                            <p>Adicione</p>
                            <strong>10000 R$</strong>
                        </div>
                        <div className={styles["add-funds__btn-panel"]}>
                            <button onClick={addAmount} value={10000}>
                                Clique Aqui
                            </button>
                        </div>
                    </div>
                    <div className={styles["add-funds__card"]}>
                        <div>
                            <p>Adicione</p>
                            <strong>100000 R$</strong>
                        </div>
                        <div className={styles["add-funds__btn-panel"]}>
                            <button onClick={addAmount} value={100000}>
                                Clique Aqui
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles["add-funds__current-fund"]}>
                <div>
                    <p>Seu Saldo:</p>
                    <strong>{`${user.funds} R$`}</strong>
                </div>
            </section>
        </main>
    );
};
