import axios, { AxiosResponse } from "axios";
import { format } from "date-fns";
import { ArrowSquareOut, Warning } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Settings.module.css";

export const Settings = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
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
    return (
        <main role={"main"} className={styles["settings"]}>
            <section className={styles["settings__edit-profile"]}>
                <div className={styles["settings__title"]}>
                    <h2>Configurações</h2>
                </div>
                <div className={styles["edit-profile__title"]}>
                    <h3>Edite o seu perfil</h3>
                </div>
                <form className={styles["edit-profile__form"]}>
                    <div className={styles["image-input__container"]}>
                        <div className={styles["profile-picture"]}>
                            <img src="" alt="" />
                        </div>
                        <input type="image" value="Selecione uma imagem" />
                    </div>
                    <div className={styles["input__container"]}>
                        <label htmlFor="description">Descrição do Perfil</label>
                        <textarea name="description" maxLength={200} />
                    </div>
                    <div className={styles["input__larger-container"]}>
                        <div className={styles["input__container"]}>
                            <label htmlFor="first">Nome</label>
                            <input type="text" name="first" maxLength={200} />
                        </div>
                        <div className={styles["input__container"]}>
                            <label htmlFor="last">Sobrenome</label>
                            <input type="text" name="last" maxLength={200} />
                        </div>
                    </div>
                    <div className={styles["input__larger-container"]}>
                        <div className={styles["input__container"]}>
                            <label htmlFor="state">Estado</label>
                            <input type="text" name="state" maxLength={200} />
                        </div>
                        <div className={styles["input__container"]}>
                            <label htmlFor="country">País</label>
                            <input type="text" name="country" maxLength={200} />
                        </div>
                    </div>
                </form>
            </section>
            <section className={styles["settings__transactions"]} id="transactions">
                <div className={styles["transactions__title"]}>
                    <h3>Compras Realizadas</h3>
                </div>
                <div className={styles["transactions__container"]}>
                    {(userTransactions.length === 0 && (
                        <p>Nenhuma compra realizada</p>
                    )) ||
                        userTransactions.map(
                            ({
                                createdAt,
                                totalPrice,
                                products,
                                paymentMethod,
                            }: Transaction) => {
                                return (
                                    <div className={styles["container__item"]}>
                                        <div className={styles["item__main"]}>
                                            <div
                                                className={styles["item__date"]}
                                            >
                                                <p>
                                                    {format(
                                                        new Date(createdAt),
                                                        "dd/MM/yyyy"
                                                    )}
                                                </p>
                                            </div>
                                            <div
                                                className={
                                                    styles[
                                                        "item__payment-method"
                                                    ]
                                                }
                                            >
                                                <p>FORMA DE PAGMENTO:</p>
                                                <p>{paymentMethod}</p>
                                            </div>
                                        </div>
                                        <div
                                            className={styles["item__details"]}
                                        >
                                            <p>
                                                {products.length === 1
                                                    ? `${1} PRODUTO`
                                                    : `${products.length} PRODUTOS`}
                                            </p>
                                            {
                                                <em>{`(Total: R$ ${totalPrice})`}</em>
                                            }
                                        </div>
                                    </div>
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
                            <p>Aviso: Ao optar por "deletar conta", você perderá todos os dados contidos, além da reputação do perfil e de produtos. Não será possivel retornar com a decisão depois.</p>
                        </div>
                        <button onClick={() => {}}>Excluir conta.</button>
                    </div>          
                </div>
            </section>
        </main>
    );
};
