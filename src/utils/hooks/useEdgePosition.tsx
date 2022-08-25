import { useCallback, useEffect, useRef, useState } from "react";
import { GraphNode } from "../../models/graph";
import useAttributeMutationObserver from "./useAttributeMutationObserver";

interface IProps {
    graphLayout: GraphNode[][];
    fromNodeId: number;
    toNodeId: number;
}

type EdgePosition = {
    fromRect: DOMRect | undefined;
    toRect: DOMRect | undefined;
};

type ConnectedNodesRef = {
    fromNode: null | HTMLElement;
    toNode: null | HTMLElement;
};

const useEdgePosition = ({ fromNodeId, graphLayout, toNodeId }: IProps) => {
    const [edgePosition, setEdgePosition] = useState<EdgePosition>();

    const connectedNodes = useRef<ConnectedNodesRef>({
        fromNode: null,
        toNode: null,
    });

    const updateEdgePosition = useCallback(() => {
        setEdgePosition({
            fromRect: connectedNodes.current.fromNode?.getBoundingClientRect(),
            toRect: connectedNodes.current.toNode?.getBoundingClientRect(),
        });
    }, []);

    useAttributeMutationObserver({
        attrName: "style",
        callback: updateEdgePosition,
        element: connectedNodes.current.fromNode,
    });
    useAttributeMutationObserver({
        attrName: "style",
        callback: updateEdgePosition,
        element: connectedNodes.current.toNode,
    });

    useEffect(() => {
        connectedNodes.current = {
            fromNode: document.getElementById(`node${fromNodeId}`),
            toNode: document.getElementById(`node${toNodeId}`),
        };

        const updateWindowResizeListener = () => {
            window.removeEventListener("resize", updateEdgePosition);
            window.addEventListener("resize", updateEdgePosition);
        };

        updateEdgePosition();
        updateWindowResizeListener();

        return () => window.removeEventListener("resize", updateEdgePosition);
    }, [graphLayout]);

    return edgePosition;
};

export default useEdgePosition;
