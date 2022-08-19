export default interface IGraph {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

export type GraphNode = {
    id: number; // Unique id of the node
    name: string; // Name of the node
};

export type GraphEdge = {
    fromId: number; // Id of the node from which the edge starts
    toId: number; // Id of the node to which the edge leads
};
