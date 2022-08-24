import { useEffect, useRef, useState } from "react";
import { GraphEdge, GraphNode } from "../../models/graph";
import s from "./Edge.module.css";

interface IProps {
    edge: GraphEdge;
    graphLayout: GraphNode[][];
}

type EdgePosition = {
    fromRect: DOMRect | undefined;
    toRect: DOMRect | undefined;
};

const Edge: React.FC<IProps> = ({ edge: { fromId, toId }, graphLayout }) => {
    const [edgePosition, setEdgePosition] = useState<EdgePosition>();

    const connectedNodes = useRef({
        fromNode: document.getElementById(`node${fromId}`),
        toNode: document.getElementById(`node${toId}`),
    });

    const updateEdgePosition = () => {
        setEdgePosition({
            fromRect: connectedNodes.current.fromNode?.getBoundingClientRect(),
            toRect: connectedNodes.current.toNode?.getBoundingClientRect(),
        });
    };

    useEffect(() => {
        connectedNodes.current = {
            fromNode: document.getElementById(`node${fromId}`),
            toNode: document.getElementById(`node${toId}`),
        };

        const updateWindowResizeListener = () => {
            window.removeEventListener("resize", updateEdgePosition);
            window.addEventListener("resize", updateEdgePosition);
        };

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "style") {
                    updateEdgePosition();
                }
            });
        });

        if (connectedNodes.current.fromNode && connectedNodes.current.toNode) {
            observer.observe(connectedNodes.current.fromNode, {
                attributes: true,
            });
            observer.observe(connectedNodes.current.toNode, {
                attributes: true,
            });
        }

        updateEdgePosition();
        updateWindowResizeListener();

        return () => window.removeEventListener("resize", updateEdgePosition);
    }, [graphLayout]);

    return edgePosition?.fromRect && edgePosition.toRect ? (
        <svg className={s.edge}>
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="5"
                    markerHeight="4"
                    refX="4"
                    refY="2"
                    orient="auto"
                    fill="var(--color-edge)"
                >
                    <polygon points="0 0, 5 2, 0 4" />
                </marker>
            </defs>
            <line
                x1={edgePosition.fromRect.left + edgePosition.fromRect.width}
                y1={edgePosition.fromRect.top + edgePosition.fromRect.height / 2}
                x2={edgePosition.toRect.left - 1.5}
                y2={edgePosition.toRect.top + edgePosition.fromRect.height / 2}
                markerEnd="url(#arrowhead)"
            />
        </svg>
    ) : (
        <></>
    );
};

export default Edge;
