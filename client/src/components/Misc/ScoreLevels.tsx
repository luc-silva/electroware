import { useEffect, useState } from "react";
import { ScoreLevelCard } from "../Cards/ScoreLevelCard";
import styles from "./ScoreLevels.module.css";

export const ScoreLevels = ({ data }: { data: IProductScoreMetrics }) => {
    return (
        <div className={styles["score-levels"]}>
            {data.scoreMetrics.map((item: IScore, index: number) => {
                return (
                    <ScoreLevelCard index={index} data={data} key={index} />
                );
            })}
        </div>
    );
};
