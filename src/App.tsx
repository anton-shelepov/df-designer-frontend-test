import s from "./App.module.css";
import Graph from "./components/Graph/Graph";
import Header from "./components/Header/Header";
import useGraph from "./utils/hooks/useGraph";

function App() {
    const [selectedGraph, onGraphSelect] = useGraph();
    return (
        <div className={s.app}>
            <Header onGraphSelect={onGraphSelect} />
            <main className={s.content}>
                {selectedGraph.nodes.length === 0 ? (
                    <p>Please choose graph</p>
                ) : (
                    <Graph graph={selectedGraph} />
                )}
            </main>
        </div>
    );
}

export default App;
