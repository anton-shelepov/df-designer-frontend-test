import { createContext, useState } from "react";

interface IProps {
    draggableList: any[];
    onReorder: (reorderedList: [], index: number) => void;
    droppableIndex: number;
}

interface IDNDContext {
    draggableList: any[];
    updateCurrentDraggingIndex: (newDraggingIndex: number) => void;
    currentDraggingIndex: number;
    droppableIndex: number;
    onReorder: (reorderedList: [], index: number) => void;
}

export const DNDContext = createContext<IDNDContext>({
    draggableList: [],
    updateCurrentDraggingIndex: () => {},
    onReorder: () => {},
    currentDraggingIndex: -1,
    droppableIndex: -1,
});

const DragAndDropContext: React.FC<IProps> = ({
    children,
    draggableList,
    onReorder,
    droppableIndex,
}) => {
    const [currentDraggingIndex, setCurrentDraggingIndex] = useState<number>(-1);

    const updateCurrentDraggingIndex = (newDraggingId: number) => {
        setCurrentDraggingIndex(newDraggingId);
    };

    return (
        <DNDContext.Provider
            value={{
                currentDraggingIndex,
                updateCurrentDraggingIndex,
                draggableList,
                onReorder,
                droppableIndex,
            }}
        >
            {children}
        </DNDContext.Provider>
    );
};

export default DragAndDropContext;
