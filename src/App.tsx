import { useEffect, useState } from "react";
import "./App.css";

const fetchGraphs = async () => {
    const response = await fetch("/api/graphs/1");
    return response.json();
};

function App() {
    const [graphs, setGraphs] = useState([]);

    useEffect(() => {
        fetchGraphs().then((graphs) => setGraphs(graphs));
    }, []);

    return <div className="app"></div>;
}

export default App;
