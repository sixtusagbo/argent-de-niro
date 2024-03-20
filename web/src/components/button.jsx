import Proptypes from 'prop-types';
import { UilPlusCircle } from '@iconscout/react-unicons';

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
    let iconURL;
    let width;
    let margin;
    let position;

    if (intent === 'welcoming') {
        color = 'text-white';
        bgColor = 'bg-[#6564DB]';
        borderColor = 'border-[#6564DB]';
        margin = 'ml-0';
        width = 'w-2/3';
    } else if (intent === 'adding') {
        color = 'text-white';
        bgColor = 'bg-[#191C1B]';
        borderColor = 'border-[#191C1B]';
        width = ' w-1/4';
    } else if (intent === 'landing') {
        color = 'text-black';
        bgColor = 'bg-[#CBFAE8]';
        borderColor = 'border-[#CBFAE8]';
        width = ' w-1/4';
        position = ' top-0 right-0'
    } else if (intent === 'transaction') {
        color = 'text-black';
        bgColor = 'bg-[#D9D9D9]';
        borderColor = 'border-[#D9D9D9]';
        iconURL = <UilPlusCircle className="inline-block mr-1" size={30} />;
        width = ' w-3/4';
    }
    return (
        <button className={`${color} ${bgColor} ${borderColor} ${width} ${margin} ${position} px-2 py-2 rounded-3xl text-center text-lg m-4`}>
            {iconURL}
            {label}

        </button>
    );
};

Button.propTypes = {
    label: Proptypes.string.isRequired,
    intent: Proptypes.oneOf(['welcoming', 'adding', 'landing', 'transaction']),
}

export default Button;
