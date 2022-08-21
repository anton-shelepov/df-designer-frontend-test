import { DragEventHandler, useState } from "react";
import { GraphNode } from "../../models/graph";
import s from "./Node.module.css";

interface IProps {
    node: GraphNode;
}

const Node: React.FC<IProps> = ({ node }) => {
    const [dragging, setDragging] = useState(false);

    const onHandleDragStart: DragEventHandler<HTMLDivElement> = (e) => {};

    const onHandleDragEnd: DragEventHandler<HTMLDivElement> = (e) => {};

    const onHandleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {};

    return (
        <div
            draggable
            onDragEnd={onHandleDragEnd}
            onDragStart={onHandleDragStart}
            onDragEnter={onHandleDragEnter}
            className={s.node}
            id={`node${node.id}`}
        >
            <span className={s.title}>{node.name}</span>
        </div>
    );
};

export default Node;
