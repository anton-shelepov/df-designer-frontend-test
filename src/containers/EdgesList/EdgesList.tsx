import Edge from "../../components/Edge/Edge";
import IGraph, { GraphEdge, GraphNode } from "../../models/graph";

interface IProps {
    edges: GraphEdge[];
    graphLayout: GraphNode[][];
}

const EdgesList: React.FC<IProps> = ({ edges, graphLayout }) => {
    return (
        <div className="edges-list">
            {edges.map((edge, index) => (
                <Edge key={index} edge={edge} graphLayout={graphLayout} />
            ))}
        </div>
    );
};

export default EdgesList;
