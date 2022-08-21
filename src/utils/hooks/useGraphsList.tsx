import { useEffect, useState } from "react";
import { fetchGraphsList } from "../../api";
import GraphsList from "../../models/graphsList";

const useGraphsList = (): GraphsList => {
    const [graphsList, setGraphsList] = useState<GraphsList>({ graphs: [] });

    useEffect(() => {
        fetchGraphsList().then((graphs) => {
            console.log(graphs);
            setGraphsList({ graphs });
        });
    }, []);

    return graphsList;
};

export default useGraphsList;
