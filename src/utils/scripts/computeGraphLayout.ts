import { GraphEdge, GraphNode } from "../../models/graph";

const computeGraphLayout = (nodes: GraphNode[], edges: GraphEdge[]) => {
    const graphColumns: GraphNode[][] = [];
    let currentColumn = 0;

    while (graphColumns.flat().length < nodes.length) {
        const addNodeIntoGraphColumn = ({ fromId, toId }: GraphEdge, type: "from" | "to"): void => {
            const currentNode = nodes.find((node) => node.id === (type === "from" ? fromId : toId));
            if (currentNode) {
                graphColumns[currentColumn] = graphColumns[currentColumn]
                    ? [...graphColumns[currentColumn], currentNode]
                    : [currentNode];
            }
        };
        for (let currentEdge of edges) {
            const parentNodeFromPreviousColumn = graphColumns[currentColumn - 1]?.find(
                (node) => node.id === currentEdge.fromId
            );
            if (
                edges.find((edge) => edge.toId === currentEdge.fromId) === undefined &&
                !graphColumns.flat().find((node) => node.id === currentEdge.fromId)
            ) {
                addNodeIntoGraphColumn(currentEdge, "from");
            }
            if (
                edges.find((edge) => edge.fromId === parentNodeFromPreviousColumn?.id)?.toId &&
                !graphColumns.flat().find((node) => node.id === currentEdge.toId)
            ) {
                addNodeIntoGraphColumn(currentEdge, "to");
            }
        }
        currentColumn++;
    }
    return graphColumns;
};

export default computeGraphLayout;
