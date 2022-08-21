import logo from "../../assets/images/logo.png";
import useGraphsList from "../../utils/hooks/useGraphsList";
import Dropdown from "../Dropdown/Dropdown";
import s from "./Header.module.css";

interface IProps {
    onSelect: (value: string) => void;
}

const Header: React.FC<IProps> = ({ onSelect }) => {
    const { graphs } = useGraphsList();
    return (
        <header className={s.header}>
            <div className={s.wrapper}>
                <img className={s.main_logo} src={logo} alt="go home" />
                <Dropdown options={graphs} onChange={onSelect} />
            </div>
        </header>
    );
};

export default Header;
