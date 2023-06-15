import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { APP_DESC, APP_NAME } from "../util/constants";
import logo from "../assets/logo.png";

// Create an example about component for this app
export const About = () => {
    const navigate = useNavigate();

    return (
        <div className="about-content">
            {/* Centered logo */}
            <div className="centered">
            <img src={logo} className="centered" style={{width:200}} />
            </div>
            <br/>
            <br/>
            <p>
                {APP_NAME} is a {APP_DESC} for businesses and individuals. Built as a prototype for the HackFS 2023 hackathon.
            </p>

            {/* TODO: add more info here */}

            <p>Create your own ${APP_NAME} board:&nbsp;<br/><br/>
                <Button type="primary" onClick={() => navigate("/create")}>Create link</Button>
            </p>
        </div>
    );

}
