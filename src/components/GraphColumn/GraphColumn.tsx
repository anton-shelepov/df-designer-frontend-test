import "./GraphColumn.styles.css";

interface IProps {}

const GraphColumn: React.FC<IProps> = ({ children }) => {
    return <div className="graph-column">{children}</div>;
};

export default GraphColumn;
