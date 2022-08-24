import { useState } from "react";
import { fetchGraph } from "../../api";
import IGraph from "../../models/graph";

const useGraph = (): [IGraph, (id: string) => void] => {
    const [selectedGraph, setSelectedGraph] = useState<IGraph>({ edges: [], nodes: [] });

    const onGraphSelect = (id: string) => {
        fetchGraph(id).then((graph) => setSelectedGraph(graph));
    };

    return [selectedGraph, onGraphSelect];
};

export default useGraph;
