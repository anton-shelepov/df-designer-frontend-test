import { LegacyRef, useContext, useRef } from "react";
import { DNDContext } from "../DragAndDropContext";
import s from "./Droppable.module.css";

interface IProps {
    className: string;
}

const Droppable: React.FC<IProps> = ({ children, className }) => {
    const { currentDraggingIndex } = useContext(DNDContext);
    const droppableRef: LegacyRef<HTMLDivElement> = useRef(null);

    return (
        <div
            ref={droppableRef}
            className={`${s.droppable} ${className ? className : ""} ${
                currentDraggingIndex !== -1 ? s.dragging : ""
            }`}
        >
            {children}
        </div>
    );
};

export default Droppable;
