import React, {useEffect, useState} from "react";
import {runForceGraph, updateForceGraph} from "@/components/MarchMadness/shared/ForceGraph/runForceGraph";

import styles from './forceGraph.module.css';

export function ForceGraph({ nodesData }) {
    const containerRef = React.useRef(null);
    //const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        let destroyFn;

        if (containerRef.current) {
            const { destroy } = runForceGraph(containerRef.current, nodesData);
            destroyFn = destroy;
            //setIsInitialized(true);
        }

        return destroyFn;
    }, []);

    /*
    useEffect(() => {
        if (isInitialized) {
            updateForceGraph(containerRef.current, nodesData)
        }
    }, [nodesData]);
     */

    return <div ref={containerRef} className={styles.container} />;
}