import { useState } from "react";
import { fetchGraph } from "./api";
import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";
import Graph from "./models/graph";
import useGraphsList from "./utils/hooks/useGraphsList";

function App() {
    const [selectedGraph, setSelectedGraph] = useState<Graph>({ edges: [], nodes: [] });

    const { graphs } = useGraphsList();

    const onGraphSelect = (id: string) => {
        fetchGraph(id).then((graph) => setSelectedGraph(graph));
    };

    return (
        <div className="app">
            <Dropdown options={graphs} onChange={onGraphSelect} />
        </div>
    );
}

export default App;
