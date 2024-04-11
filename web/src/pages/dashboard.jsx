import { Outlet } from "react-router-dom";
import Menubar from "../components/menubar";
import useLocalStorage from "../hooks/useLocalStorage";

const Dashboard = () => {
    const [foo, setFoo] = useLocalStorage('foo', () => {
        // Do some complex calculation

        return 'bar';
    });

    return (
        <section className="flex">
            <Menubar className="" /> {/* Set the width of the menu bar */}
            <div className="flex justify-center items-center bg-[#D9D9D9]"> {/* Use flexbox to center the content */}
                <Outlet />
            </div>
            <button onClick={() => {
                setFoo('baz');
            }}>Change Foo</button>
        </section>
    );
};

export default Dashboard;

