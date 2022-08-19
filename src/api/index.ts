import Graph from "../models/graph";

export const fetchGraphsList = async (): Promise<number[]> => {
    const response = await fetch("/api/graphs");
    return response.json();
};

export const fetchGraph = async (id: string): Promise<Graph> => {
    const response = await fetch(`/api/graphs/${id}`);
    return response.json();
};
