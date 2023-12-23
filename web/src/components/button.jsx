import Proptypes from 'prop-types';

/**
 * Button component for all buttons.
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the button.
 * @param {string} props.intent - The intent of the button (e.g., 'welcoming', 'adding', 'landing').
 * @returns {JSX.Element} The rendered button component.
 */

const Button = ({ label, intent }) => {
    let color;
    let bgColor;
    let borderColor;

    if (intent === 'welcoming') {
        color = 'text-white';
        bgColor = 'bg-[#6564DB]';
        borderColor = 'border-[#6564DB]';
    } else if (intent === 'adding') {
        color = 'text-white';
        bgColor = 'bg-[#191C1B]';
        borderColor = 'border-[#191C1B]';
    } else if (intent === 'landing') {
        color = 'text-black';
        bgColor = 'bg-[#CBFAE8]';
        borderColor = 'border-[#CBFAE8]';
    } else if (intent === 'transaction') {
        color = 'text-black';
        bgColor = 'bg-[#D9D9D9]';
        borderColor = 'border-[#D9D9D9]';
    }
    return (
        <button className={`${color} ${bgColor} ${borderColor} px-8 rounded-3xl py-2`}>
            {label}
        </button>
    );
};

Button.propTypes = {
    label: Proptypes.string.isRequired,
    intent: Proptypes.oneOf(['welcoming', 'adding', 'landing', 'transaction']),
}

export default Button;
