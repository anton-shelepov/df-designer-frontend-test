import { LegacyRef, MouseEventHandler, useCallback, useContext, useRef } from "react";
import { DNDContext } from "../DragAndDropContext";
import s from "./Draggable.module.css";

interface IProps {
    draggableIndex: number;
    draggableListItem: any;
    id?: string;
}

const Draggable: React.FC<IProps> = ({ children, draggableIndex, draggableListItem, id }) => {
    const draggableElementRef: LegacyRef<HTMLDivElement> = useRef(null);
    // Refs for getting mouse down capture position on element
    // (needs for shift element correctly by mouse moving)
    const mouseDownOnElementClient = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const mouseDownOnElementRect = useRef<DOMRect>();

    const {
        updateCurrentDraggingIndex,
        currentDraggingIndex,
        onReorder,
        draggableList,
        droppableIndex,
    } = useContext(DNDContext);

    const cssTranslateXYProp = (x: number, y: number) => {
        return `translate(${x}px, ${y}px)`;
    };

    const onHandleMouseMove = useCallback((e) => {
        const shiftByX = mouseDownOnElementRect.current!.left - mouseDownOnElementClient.current.x;
        const shiftByY = mouseDownOnElementRect.current!.top - mouseDownOnElementClient.current.y;
        draggableElementRef.current!.style.transform = cssTranslateXYProp(
            e.pageX - draggableElementRef.current!.offsetLeft + shiftByX,
            e.pageY - draggableElementRef.current!.offsetTop + shiftByY
        );
    }, []);

    const onHandleMouseUp = useCallback((e) => {
        updateCurrentDraggingIndex(-1);
        draggableElementRef.current!.classList.remove(s.dragging);
        draggableElementRef.current!.style.transform = "none";
        document.body.style.cursor = "default";
        window.removeEventListener("mousemove", onHandleMouseMove);
    }, []);

    const onHandleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        updateCurrentDraggingIndex(draggableIndex);
        draggableElementRef.current!.classList.add(s.dragging);
        document.body.style.cursor = "grabbing";
        mouseDownOnElementClient.current = {
            x: e.clientX,
            y: e.clientY,
        };
        mouseDownOnElementRect.current = draggableElementRef.current!.getBoundingClientRect();
        window.addEventListener("mousemove", onHandleMouseMove);
        window.addEventListener("mouseup", onHandleMouseUp);
    };

    const onHandleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
        if (currentDraggingIndex !== -1) {
            const enteredElementIndex = draggableList.indexOf(draggableListItem);
            const draggableListCopy = draggableList;
            const temp = draggableListCopy[enteredElementIndex];
            draggableListCopy[enteredElementIndex] = draggableListCopy[currentDraggingIndex];
            draggableListCopy[currentDraggingIndex] = temp;

            updateCurrentDraggingIndex(enteredElementIndex);
            onReorder(draggableListCopy as [], droppableIndex);
        }
    };

    return (
        <div
            onMouseDown={onHandleMouseDown}
            onMouseEnter={onHandleMouseEnter}
            ref={draggableElementRef}
            className={s.draggable}
            id={id}
        >
            {children}
        </div>
    );
};

export default Draggable;
