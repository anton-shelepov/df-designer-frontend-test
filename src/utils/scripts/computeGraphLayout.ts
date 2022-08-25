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

        const checkNodeForExistingInLayout = (edge: GraphEdge, nodeType: "parent" | "child") => {
            return graphColumns
                .flat()
                .find((node) => node.id === (nodeType === "parent" ? edge.fromId : edge.toId));
        };

        for (let currentEdge of edges) {
            const parentNodeFromPreviousColumn = graphColumns[currentColumn - 1]?.find(
                (node) => node.id === currentEdge.fromId
            );

            const isOnlyOutgoing =
                edges.find((edge) => edge.toId === currentEdge.fromId) === undefined;

            const isConnectedWithPrevious = edges.find(
                (edge) => edge.fromId === parentNodeFromPreviousColumn?.id
            )?.toId;

            if (isOnlyOutgoing && !checkNodeForExistingInLayout(currentEdge, "parent")) {
                addNodeIntoGraphColumn(currentEdge, "from");
            }
            if (isConnectedWithPrevious && !checkNodeForExistingInLayout(currentEdge, "child")) {
                addNodeIntoGraphColumn(currentEdge, "to");
            }
        }
        currentColumn++;
    }
    return graphColumns;
};

export default computeGraphLayout;
