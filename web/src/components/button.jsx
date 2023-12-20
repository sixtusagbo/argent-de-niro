import './button.css';
import Proptypes from 'prop-types';

/**
 * Button component for all buttons.
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the button.
 * @param {string} props.intent - The intent of the button (e.g., 'welcoming', 'adding', 'landing').
 * @returns {JSX.Element} The rendered button component.
 */

const Button = ({ label, intent }) => {
    return (
        <button className={`button ${intent}`}>
            {label}
        </button>
    );
};

Button.propTypes = {
    label: Proptypes.string.isRequired,
    intent: Proptypes.oneOf(['welcoming', 'adding', 'landing']),
}

export default Button;
