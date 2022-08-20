import { useEffect, useState } from "react";
import { GraphEdge, GraphNode } from "../../models/graph";
import s from "./Edge.module.css";

interface IProps {
    edge: GraphEdge;
    graphLayout: GraphNode[][];
}

const Edge: React.FC<IProps> = ({ edge: { fromId, toId }, graphLayout }) => {
    const [fromGraphNodeRect, setFromGraphNodeRect] = useState<DOMRect>();
    const [toGraphNodeRect, setToGraphNodeRect] = useState<DOMRect>();

    const updateEdgePosition = () => {
        setFromGraphNodeRect(document.getElementById(`node${fromId}`)?.getBoundingClientRect());
        setToGraphNodeRect(document.getElementById(`node${toId}`)?.getBoundingClientRect());
    };

    const updateWindowResizeListener = () => {
        window.removeEventListener("resize", updateEdgePosition);
        window.addEventListener("resize", updateEdgePosition);
    };

    useEffect(() => {
        updateEdgePosition();
        updateWindowResizeListener();

        return () => window.removeEventListener("resize", updateEdgePosition);
    }, [graphLayout]);

    return fromGraphNodeRect && toGraphNodeRect ? (
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
                x1={fromGraphNodeRect.left + fromGraphNodeRect.width}
                y1={fromGraphNodeRect.top + fromGraphNodeRect.height / 2}
                x2={toGraphNodeRect.left - 1.5}
                y2={toGraphNodeRect.top + fromGraphNodeRect.height / 2}
                markerEnd="url(#arrowhead)"
            />
        </svg>
    ) : (
        <></>
    );
};

export default Edge;
