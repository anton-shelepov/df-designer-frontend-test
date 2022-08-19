import logo from "../../assets/images/logo.png";
import useGraphsList from "../../utils/hooks/useGraphsList";
import Dropdown from "../Dropdown/Dropdown";
import "./Header.styles.css";

interface IProps {
    onGraphSelect: (value: string) => void;
}

const Header: React.FC<IProps> = ({ onGraphSelect }) => {
    const { graphs } = useGraphsList();
    return (
        <header>
            <div className="header-wrapper">
                <img className="header-wrapper__logo" src={logo} alt="go home" />
                <div className="header-wrapper__content"></div>
                <Dropdown options={graphs} onChange={onGraphSelect} />
            </div>
        </header>
    );
};

export default Header;
