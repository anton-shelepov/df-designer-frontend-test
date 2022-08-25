import { LegacyRef, MouseEventHandler, useCallback, useContext, useEffect, useRef } from "react";
import cssTranslateXYProp from "../../../utils/scripts/cssTranslateXYProp";
import swapElementsInArray from "../../../utils/scripts/swapElementsInArray";
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

    useEffect(() => {
        draggableElementRef.current!.style.transform = cssTranslateXYProp(0, 0);
    }, [currentDraggingIndex, draggableList]);

    const onHandleMouseMove = useCallback((e) => {
        const shiftByX = mouseDownOnElementRect.current!.left - mouseDownOnElementClient.current.x;
        const shiftByY = mouseDownOnElementRect.current!.top - mouseDownOnElementClient.current.y;
        console.log(draggableElementRef.current);
        draggableElementRef.current!.style.transform = cssTranslateXYProp(
            e.pageX - draggableElementRef.current!.offsetLeft + shiftByX,
            e.pageY - draggableElementRef.current!.offsetTop + shiftByY
        );
    }, []);

    const onHandleMouseUp = useCallback(() => {
        const removeDraggingStyles = () => {
            draggableElementRef.current!.classList.remove(s.dragging);
            draggableElementRef.current!.style.transform = "none";
            document.body.style.cursor = "default";
        };
        const removeDraggingListeners = () => {
            window.removeEventListener("mousemove", onHandleMouseMove);
            window.removeEventListener("mouseup", onHandleMouseUp);
        };

        updateCurrentDraggingIndex(-1);
        removeDraggingListeners();
        removeDraggingStyles();
    }, []);

    const onHandleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        const addDraggingStyles = () => {
            draggableElementRef.current!.classList.add(s.dragging);
            document.body.style.cursor = "grabbing";
        };
        const addDraggableListeners = () => {
            window.addEventListener("mousemove", onHandleMouseMove);
            window.addEventListener("mouseup", onHandleMouseUp);
        };
        const updateMouseDownPosition = () => {
            mouseDownOnElementClient.current = {
                x: e.clientX,
                y: e.clientY,
            };
            mouseDownOnElementRect.current = draggableElementRef.current!.getBoundingClientRect();
        };

        updateCurrentDraggingIndex(draggableIndex);
        updateMouseDownPosition();
        addDraggableListeners();
        addDraggingStyles();
    };

    const onHandleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
        if (currentDraggingIndex !== -1) {
            const enteredElementIndex = draggableList.indexOf(draggableListItem);
            updateCurrentDraggingIndex(enteredElementIndex);
            const reorderedDraggableList = swapElementsInArray(
                draggableList,
                enteredElementIndex,
                currentDraggingIndex
            );
            onReorder(reorderedDraggableList, droppableIndex);
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
