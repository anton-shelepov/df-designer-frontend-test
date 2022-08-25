import { GraphEdge, GraphNode } from "../../models/graph";
import useEdgePosition from "../../utils/hooks/useEdgePosition";
import s from "./Edge.module.css";

interface IProps {
    edge: GraphEdge;
    graphLayout: GraphNode[][];
}

const Edge: React.FC<IProps> = ({ edge: { fromId, toId }, graphLayout }) => {
    const edgePosition = useEdgePosition({
        fromNodeId: fromId,
        toNodeId: toId,
        graphLayout,
    });

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
