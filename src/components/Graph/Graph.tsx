import EdgesList from "../../containers/EdgesList/EdgesList";
import NodesList from "../../containers/NodesList/NodesList";
import IGraph from "../../models/graph";
import useGraphLayout from "../../utils/hooks/useGraphLayout";
import GraphColumns from "./GraphColumns/GraphColumns";
import "./Graph.styles.css";

interface IProps {
    graph: IGraph;
}

const Graph: React.FC<IProps> = ({ graph: { edges, nodes } }) => {
    const [graphLayout, setGraphLayout] = useGraphLayout({ edges, nodes });
    return (
        <div className="graph">
            <GraphColumns graphLayout={graphLayout} />
            <EdgesList edges={edges} graphLayout={graphLayout} />
        </div>
    );
};

export default Graph;
