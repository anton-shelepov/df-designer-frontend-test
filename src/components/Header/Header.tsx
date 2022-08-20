import logo from "../../assets/images/logo.png";
import useGraphsList from "../../utils/hooks/useGraphsList";
import Dropdown from "../Dropdown/Dropdown";
import s from "./Header.module.css";

interface IProps {
    onGraphSelect: (value: string) => void;
}

const Header: React.FC<IProps> = ({ onGraphSelect }) => {
    const { graphs } = useGraphsList();
    return (
        <header className={s.header}>
            <div className={s.wrapper}>
                <img className={s.main_logo} src={logo} alt="go home" />
                <Dropdown options={graphs} onChange={onGraphSelect} />
            </div>
        </header>
    );
};

export default Header;
