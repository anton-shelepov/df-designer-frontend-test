import EdgesList from "../../containers/EdgesList/EdgesList";
import NodesList from "../../containers/NodesList/NodesList";
import IGraph from "../../models/graph";
import useGraphLayout from "../../utils/hooks/useGraphLayout";
import GraphColumn from "../GraphColumn/GraphColumn";
import "./Graph.styles.css";

interface IProps {
    graph: IGraph;
}

const Graph: React.FC<IProps> = ({ graph: { edges, nodes } }) => {
    const [graphLayout, setGraphLayout] = useGraphLayout({ edges, nodes });

    return (
        <div className="graph">
            {graphLayout.map((nodes, index) => (
                <GraphColumn key={index}>
                    <NodesList nodes={nodes} />
                </GraphColumn>
            ))}
            <EdgesList />
        </div>
    );
};

export default Graph;
