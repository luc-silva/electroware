import axios, { AxiosResponse } from "axios";
import { format } from "date-fns";
import { ArrowSquareOut, Warning } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileSettingsForm } from "../components/ProfileSettingsForm";
import styles from "./Settings.module.css";
import { TransactionItem } from "../components/TransactionItem";

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
        axios
            .get(`http://localhost:6060/api/user/${user.id}/transactions/`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then(({ data }: AxiosResponse) => {
                setUserTransactions(data);
            });
    }, []);
    function handleDeleteAccountBtn() {
        axios.delete(`http://localhost:6060/api/user/${user.id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
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
                <ProfileSettingsForm user={user}/>
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
                                    <TransactionItem
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
