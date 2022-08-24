import s from "./App.module.css";
import { Graph, Header } from "./components";
import useGraph from "./utils/hooks/useGraph";

function App() {
    const [selectedGraph, onGraphSelect] = useGraph();
    return (
        <div className={s.app}>
            <Header onSelect={onGraphSelect} />
            <main className={s.content}>
                {selectedGraph.nodes.length === 0 ? (
                    <p className={s.not_choosed}>Please choose graph</p>
                ) : (
                    <Graph graph={selectedGraph} />
                )}
            </main>
        </div>
    );
}

export default App;
