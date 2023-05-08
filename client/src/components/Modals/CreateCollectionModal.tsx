import { FormEvent, useEffect, useState } from "react";
import { CloseBtn } from "../Buttons/CloseBtn";
import { CollectionForm } from "../Forms/CollectionForm";

import UserService from "../../services/UserService";
import WishlistService from "../../services/WishlistService";

import { CollectionCard } from "../Cards/CollectionCard";
import { stopEventPropagation } from "../../utils/operations";
import { ActionBtn } from "../Buttons/ActionBtn";

import styles from "./CreateCollectionModal.module.css";
import { NothingAvailableDialog } from "../Misc/NothingAvailableDialog";

export const CreateCollectionModal = ({
    user,
    isActive,
    product,
    toggleModal,
    showToast,
}: {
    isActive: boolean;
    product: string;
    user: IUserSession;
    toggleModal: Function;
    showToast: Function;
}) => {
    let [selectedCollectionId, setSelectedCollectionId] = useState("");
    let [collections, SetCollections] = useState([]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (product) {
            let data = {
                product,
                group: selectedCollectionId,
            };
            await WishlistService.createWishlistInstance(data, user.token)
                .then(({ message }) => {
                    showToast(message);
                    toggleModal(false);
                })
                .catch(({ response }) => {
                    showToast(response.data, "warning");
                });
        }
    }

    async function getUserCollections() {
        await UserService.getUserCollections(user.id, user.token).then(
            (data) => {
                SetCollections(data);
            }
        );
    }
    useEffect(() => {
        if (user.id) {
            getUserCollections();
        }
    }, [user.id, isActive]);
    if (!isActive) return null;
    return (
        <div
            className={styles["create-collection"]}
            onClick={(event: React.MouseEvent) => {
                toggleModal(false);
            }}
        >
            <div
                className={styles["create-collection__wrapper"]}
                onClick={stopEventPropagation}
            >
                <CloseBtn onClick={() => toggleModal(false)} />
                <div className={styles["create-collection__title"]}>
                    <h2>Suas listas de desejos</h2>
                    <p>Adicione esse produto à uma lista personalizada.</p>
                </div>
                <div className={styles["create-collection__main"]}>
                    <div className={styles["create-collection__form"]}>
                        <CollectionForm
                            user={user}
                            showToast={showToast}
                            updateCollections={getUserCollections}
                        />
                    </div>
                    <div className={styles["create-collection__container"]}>
                        <div
                            className={
                                styles["create-collection__container__title"]
                            }
                        >
                            <h3>Escolha uma lista</h3>
                        </div>
                        <div
                            className={
                                styles["create-collection__card__container"]
                            }
                        >
                            {(collections.length > 0 &&
                                collections.map((collection, index) => {
                                    return (
                                        <CollectionCard
                                            data={collection}
                                            setChosenCollection={
                                                setSelectedCollectionId
                                            }
                                            selectedCollection={
                                                selectedCollectionId
                                            }
                                            key={index}
                                        />
                                    );
                                })) || (
                                <NothingAvailableDialog text="Você precisar criar uma lista" />
                            )}
                        </div>
                    </div>
                    <div className={styles["create-collection__action-btn"]}>
                        <ActionBtn
                            textValue="Adicionar Item"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
