import "./App.styles.css";
import Dropdown from "./components/Dropdown/Dropdown";
import Graph from "./components/Graph/Graph";
import Header from "./components/Header/Header";
import useGraph from "./utils/hooks/useGraph";
import useGraphsList from "./utils/hooks/useGraphsList";

function App() {
    const [selectedGraph, onGraphSelect] = useGraph();
    return (
        <div className="app">
            <Header onGraphSelect={onGraphSelect} />
            <div className="app__content-wrapper">
                {selectedGraph.nodes.length === 0 ? (
                    <p>Please choose graph</p>
                ) : (
                    <Graph graph={selectedGraph} />
                )}
            </div>
        </div>
    );
}

export default App;
