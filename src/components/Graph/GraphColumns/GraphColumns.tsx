import { MouseEventHandler } from "react";
import { Draggable, Droppable, Node } from "../../";
import { GraphNode } from "../../../models/graph";
import DragAndDropContext from "../../DragAndDrop/DragAndDropContext";
import s from "./GraphColumns.module.css";

interface IProps {
    graphLayout: GraphNode[][];
    changeGraphLayout: (newGraphLayout: GraphNode[][]) => void;
}

const GraphColumns: React.FC<IProps> = ({ graphLayout, changeGraphLayout }) => {
    const onHandleMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {};
    const onGraphLayoutReorder = (reorderedColumn: GraphNode[], reorderedColumnIndex: number) => {
        for (let graphColumn of graphLayout) {
            const changedGraphLayout = graphLayout.map((graphColumn, index) =>
                index === reorderedColumnIndex ? reorderedColumn : graphColumn
            );
            changeGraphLayout(changedGraphLayout);
        }
        console.log(reorderedColumn);
    };
    return (
        <div className={s.graph_columns}>
            {graphLayout.map((columnNodes, index) => (
                <DragAndDropContext
                    draggableList={columnNodes}
                    droppableIndex={index}
                    onReorder={onGraphLayoutReorder}
                    key={index}
                >
                    <Droppable className={s.graph_columns_item}>
                        {columnNodes.map((node, index) => (
                            <Draggable
                                draggableListItem={node}
                                draggableIndex={index}
                                id={`node${node.id}`}
                                key={node.id}
                            >
                                <Node node={node} />
                            </Draggable>
                        ))}
                    </Droppable>
                </DragAndDropContext>
            ))}
        </div>
    );
};

export default GraphColumns;
