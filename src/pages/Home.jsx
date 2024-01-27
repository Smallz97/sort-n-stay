import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <h1>
                Sort-n-Stay
            </h1>

            <ul>
                <li>
                    <Link to="/hotels">View Hotels / Stays<span aria-hidden="true">→</span></Link>
                </li>
                <li>
                    <Link to="/edit-categories">Edit Categories<span aria-hidden="true">→</span></Link>
                </li>
                <li>
                    <Link to="/create-new-hotel">Create New Hotel / Stay<span aria-hidden="true">→</span></Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
