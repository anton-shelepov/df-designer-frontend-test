import EdgesList from "../../containers/EdgesList";
import IGraph from "../../models/graph";
import useGraphLayout from "../../utils/hooks/useGraphLayout";
import s from "./Graph.module.css";
import GraphColumns from "./GraphColumns/GraphColumns";

interface IProps {
    graph: IGraph;
}

const Graph: React.FC<IProps> = ({ graph: { edges, nodes } }) => {
    const [graphLayout, changeGraphLayout] = useGraphLayout({ edges, nodes });
    console.log(graphLayout);
    return (
        <div className={s.graph}>
            <GraphColumns graphLayout={graphLayout} changeGraphLayout={changeGraphLayout} />
            <EdgesList edges={edges} graphLayout={graphLayout} />
        </div>
    );
};

export default Graph;
