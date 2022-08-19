import { ReactEventHandler, useState } from "react";
// import "./Dropdown.styles.css";

interface IProps {
    options: string[] | number[];
    onChange: (value: string) => void;
}

const Dropdown: React.FC<IProps> = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    const onHandleChange: ReactEventHandler<HTMLSelectElement> = ({ currentTarget: { value } }) => {
        setSelectedOption(value);
        onChange(value);
    };

    return (
        <select className="dropdown" value={selectedOption} onChange={onHandleChange}>
            {options.map((optionValue) => (
                <option key={optionValue} value={optionValue}>
                    {optionValue}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
