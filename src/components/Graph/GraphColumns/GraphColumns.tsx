import NodesList from "../../../containers/NodesList/NodesList";
import { GraphNode } from "../../../models/graph";
import s from "./GraphColumns.module.css";

interface IProps {
    graphLayout: GraphNode[][];
}

const GraphColumns: React.FC<IProps> = ({ graphLayout }) => {
    return (
        <div className={s.graph_columns}>
            {graphLayout.map((columnNodes) => (
                <div className={s.graph_columns_item}>
                    <NodesList nodes={columnNodes} />
                </div>
            ))}
        </div>
    );
};

export default GraphColumns;
