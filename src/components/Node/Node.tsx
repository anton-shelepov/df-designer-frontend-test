import { GraphNode } from "../../models/graph";
import "./Node.styles.css";

interface IProps {
    node: GraphNode;
}

const Node: React.FC<IProps> = ({ node }) => {
    return (
        <div className="node" id={`node${node.id}`}>
            <span className="node__title">{node.name}</span>
        </div>
    );
};

export default Node;
