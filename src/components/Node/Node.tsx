import { GraphNode } from "../../models/graph";
import s from "./Node.module.css";

interface IProps {
    node: GraphNode;
}

const Node: React.FC<IProps> = ({ node }) => {
    return (
        <div className={s.node} id={`node${node.id}`}>
            <span className={s.title}>{node.name}</span>
        </div>
    );
};

export default Node;
