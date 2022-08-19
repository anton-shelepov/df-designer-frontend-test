export default interface Graph {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

export interface GraphNode {
    id: number; // Unique id of the node
    name: string; // Name of the node
}

export interface GraphEdge {
    fromId: number; // Id of the node from which the edge starts
    toId: number; // Id of the node to which the edge leads
}
