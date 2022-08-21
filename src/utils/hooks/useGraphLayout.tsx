import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GraphEdge, GraphNode } from "../../models/graph";
import computeGraphLayout from "../scripts/computeGraphLayout";

interface IProps {
    edges: GraphEdge[];
    nodes: GraphNode[];
}

const useGraphLayout = ({
    edges,
    nodes,
}: IProps): [GraphNode[][], Dispatch<SetStateAction<GraphNode[][]>>] => {
    const [graphLayout, setGraphLayout] = useState<GraphNode[][]>([[]]);

    useEffect(() => {
        setGraphLayout(computeGraphLayout(nodes, edges));
    }, [nodes, edges]);
    // @ts-ignore
    window.graph = graphLayout;

    return [graphLayout, setGraphLayout];
};

export default useGraphLayout;
