import { useEffect, useState } from "react";

import { Circle } from "phosphor-react";
import banner1 from "../../assets/images/electroware-banner-1.jpg";
import banner2 from "../../assets/images/electroware-banner-2.jpg";
import banner3 from "../../assets/images/electroware-banner-3.jpg";
import styles from "./HomeBanner.module.css";

export const HomeBanner = () => {
    const images = [banner1, banner2, banner3];

    let [counter, setCounter] = useState(0);
    let [currentImage, setCurrentImage] = useState(images[0]);
    let [seconds, setSeconds] = useState(4000);

    useEffect(() => {
        let interval = setInterval(() => {
            setCounter((prev: number) => {
                if (prev < images.length - 1) {
                    return prev + 1;
                }
                return 0;
            });
        }, seconds);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        setCurrentImage(images[counter]);
    }, [counter]);

    function handleIconClick(index: number) {
        setCurrentImage(images[index]);
    }

    return (
        <section className={styles["active-promos"]}>
            <img src={currentImage} alt="homepage banner" />
            <div className={styles["control-panel"]}>
                {images.map((item, index) => {
                    if (counter === index) {
                        return (
                            <Circle
                                size={15}
                                key={index}
                                onClick={() => {
                                    handleIconClick(index);
                                    setCounter(index)
                                }}
                            />
                        );
                    }
                    return (
                        <Circle
                            size={10}
                            key={index}
                            onClick={() => {
                                handleIconClick(index);
                                setCounter(index)
                            }}
                        />
                    );
                })}
            </div>
        </section>
    );
};
