import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSections from "./Herosections";
import HowItWorks from "./HowitWorks";
import PopularCategories from "./PopularCetegory";
import PopularCompanies from "./PopularCompnies";

const Home = () => {
    const { isAuthorized } = useContext(Context);
    if (!isAuthorized) {
        return <Navigate to={"/login"} />;
    }
    return (
        <>
            <section className="homePage page">
                <HeroSections />
                <HowItWorks />
                <PopularCategories />
                <PopularCompanies />
            </section>
        </>
    );
};

export default Home;