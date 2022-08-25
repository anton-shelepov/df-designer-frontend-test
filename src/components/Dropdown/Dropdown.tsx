import { ReactEventHandler, useState } from "react";
import s from "./Dropdown.module.css";

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
        <select className={s.dropdown} value={selectedOption} onChange={onHandleChange}>
            <option value="" role="placeholder" disabled>
                Select graph
            </option>
            {options.map((optionValue) => (
                <option key={optionValue} value={optionValue}>
                    {optionValue}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
