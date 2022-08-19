import "./App.styles.css";
import Dropdown from "./components/Dropdown/Dropdown";
import Graph from "./components/Graph/Graph";
import useGraph from "./utils/hooks/useGraph";
import useGraphsList from "./utils/hooks/useGraphsList";

function App() {
    const { graphs } = useGraphsList();
    const [selectedGraph, onGraphSelect] = useGraph();
    return (
        <div className="app-wrapper">
            <Dropdown options={graphs} onChange={onGraphSelect} />
            {selectedGraph.nodes.length === 0 ? (
                <p>Please choose graph</p>
            ) : (
                <Graph graph={selectedGraph} />
            )}
        </div>
    );
}

export default App;
