import { useEffect, useState } from 'react';
export default function useVisualizationData(table, visualization) {
    const [visualizationData, setVisualizationData] = useState();
    const [status, setStatus] = useState('loading');
    const [worker, setWorker] = useState();
    useEffect(() => {
        const worker = new Worker(new URL('../workers/visualizationDataWorker.ts', import.meta.url));
        setWorker(worker);
        return () => {
            worker.terminate();
        };
    }, []);
    useEffect(() => {
        if ((worker != null) && (window.Worker !== undefined)) {
            setStatus('loading');
            worker.onmessage = (e) => {
                setStatus(e.data.status);
                setVisualizationData(e.data.visualizationData);
            };
            worker.postMessage({ table, visualization });
        }
    }, [table, visualization, worker]);
    return [visualizationData, status];
}
