import { useEffect, useState } from "react";
import { GraphEdge, GraphNode } from "../../models/graph";
import computeGraphLayout from "../scripts/computeGraphLayout";

interface IProps {
    edges: GraphEdge[];
    nodes: GraphNode[];
}

const useGraphLayout = ({
    edges,
    nodes,
}: IProps): [GraphNode[][], (newGraphLayout: GraphNode[][]) => void] => {
    const [graphLayout, setGraphLayout] = useState<GraphNode[][]>(computeGraphLayout(nodes, edges));

    const changeGraphLayout = (newGraphLayout: GraphNode[][]) => {
        setGraphLayout(newGraphLayout);
    };

    useEffect(() => {
        changeGraphLayout(computeGraphLayout(nodes, edges));
    }, [nodes, edges]);

    return [graphLayout, changeGraphLayout];
};

export default useGraphLayout;
