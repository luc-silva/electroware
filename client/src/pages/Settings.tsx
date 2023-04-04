import { ArrowSquareOut, Warning } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileSettingsForm } from "../components/Forms/ProfileSettingsForm";
import styles from "./Settings.module.css";
import { TransactionCard } from "../components/TransactionCard";
import UserService from "../services/UserService";

export const Settings = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
    let navigate = useNavigate();
    if (!user.logged) {
        navigate("/login");
    }
    let [userTransactions, setUserTransactions] = useState([]);
    useEffect(() => {
        UserService.getUserTransactions(user.id, user.token).then((data) => {
            setUserTransactions(data);
        });
    }, []);

    async function handleDeleteAccountBtn() {
        await UserService.deleteAccount(user.id, user.token);
    }
    
    return (
        <main role={"main"} className={styles["settings"]}>
            <section className={styles["settings__edit-profile"]}>
                <div className={styles["settings__title"]}>
                    <h2>Configurações</h2>
                </div>
                <div className={styles["edit-profile__title"]}>
                    <h3>Edite o seu perfil</h3>
                </div>
                <ProfileSettingsForm user={user} />
            </section>
            <section
                className={styles["settings__transactions"]}
                id="transactions"
            >
                <div className={styles["transactions__title"]}>
                    <h3>Compras Realizadas</h3>
                </div>
                <div className={styles["transactions__container"]}>
                    {(userTransactions.length === 0 && (
                        <p>Nenhuma compra realizada</p>
                    )) ||
                        userTransactions.map(
                            (transaction: Transaction, index: React.Key) => {
                                return (
                                    <TransactionCard
                                        transaction={transaction}
                                        key={index}
                                    />
                                );
                            }
                        )}
                </div>
            </section>
            <section className={styles["settings__delete-account"]}>
                <div className={styles["delete-account__title"]}>
                    <h3>Excluir conta</h3>
                </div>
                <div className={styles["delete-account__main"]}>
                    <div className={styles["button-container"]}>
                        <div className={styles["warning-info"]}>
                            <Warning size={30} />
                            <p>
                                <strong>Aviso:</strong> Ao optar por "deletar
                                conta", você perderá todos os dados contidos,
                                além da reputação do perfil e de produtos. Não
                                será possivel retornar com a decisão depois.
                            </p>
                        </div>
                        <button onClick={handleDeleteAccountBtn}>
                            Excluir conta.
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};
