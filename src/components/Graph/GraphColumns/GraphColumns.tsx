import NodesList from "../../../containers/NodesList/NodesList";
import { GraphNode } from "../../../models/graph";
import "./GraphColumns.styles.css";

interface IProps {
    graphLayout: GraphNode[][];
}

const GraphColumns: React.FC<IProps> = ({ graphLayout }) => {
    return (
        <div className="graph__columns">
            {graphLayout.map((columnNodes) => (
                <div className="graph__columns-item">
                    <NodesList nodes={columnNodes} />
                </div>
            ))}
        </div>
    );
};

export default GraphColumns;
