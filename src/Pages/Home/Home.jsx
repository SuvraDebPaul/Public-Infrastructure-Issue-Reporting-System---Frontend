import React from "react";
import Banner from "../../Components/Home/Banner/Banner";
import LatestResolvedIssue from "../../Components/Home/ResolvedIssue/LatestResolvedIssue";
import Features from "../../Components/Home/Features/Features";
import HowItWorks from "../../Components/Home/HowItWorks/HowItWorks";
import GetStarted from "../../Components/Home/GetStarted/GetStarted";
import Testimonials from "../../Components/Home/Testimonials/Testimonials";
import { useLoaderData } from "react-router";

const Home = () => {
  const resolvedIssue = useLoaderData();

  return (
    <div>
      <Banner />
      <LatestResolvedIssue resolvedIssue={resolvedIssue} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <GetStarted />
    </div>
  );
};

export default Home;
