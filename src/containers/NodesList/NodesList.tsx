import Node from "../../components/Node/Node";
import { GraphNode } from "../../models/graph";

interface IProps {
    nodes: GraphNode[];
}

const NodesList: React.FC<IProps> = ({ nodes }) => {
    return (
        <>
            {nodes.map((node) => (
                <Node key={node.id} node={node} />
            ))}
        </>
    );
};

export default NodesList;
