import React from "react";
import BoxContainer from "../../../Util/BoxContainer";
import SideImg from "/global.png";

const HowItWorks = () => {
  return (
    <section className="bg-base-200">
      <BoxContainer className="py-10">
        <h2 className="text-4xl my-10 font-bold text-center uppercase">
          How It Works
        </h2>
        <div className="flex justify-between items-center gap-6">
          <div className="flex-1">
            <p className="mb-6 text-xl">
              Millions of citizens around the world rely on digital platforms to
              make their cities better. Our Public Infrastructure Issue
              Reporting System makes it easy for anyone to report, track, and
              resolve public issues—all in one place.
            </p>
            <ol className="text-lg list-disc pl-10 text-balance space-y-2">
              <li>
                <strong>Fast and simple reporting:</strong> Capture problems
                like broken streetlights, potholes, or damaged sidewalks with a
                photo and location pin.
              </li>
              <li>
                <strong>Instant routing to authorities:</strong> Every report is
                sent directly to the relevant city department, so nothing gets
                lost or ignored.
              </li>
              <li>
                <strong>Real-time tracking:</strong> See the status of your
                submitted issues, from “reported” to “resolved,” and get
                notified when your city fixes the problem.
              </li>
              <li>
                <strong>Accessible and user-friendly:</strong> Our platform is
                fully web-based, simple to use, and works on desktop and mobile.
              </li>
              <li>
                <strong>Powerful features:</strong> Track multiple issues, add
                comments, and attach media to provide more details to city
                officials.
              </li>
              <li>
                <strong>Completely free:</strong> TCitizens can contribute to
                improving their city without any cost.
              </li>
            </ol>
            <p className="my-6 text-xl ">
              With this system, your report isn’t just a message—it’s a real
              step toward a safer, cleaner, and smarter city.
            </p>
            <button className="btn btn-primary rounded-full px-8 py-6 text-lg">
              Learn More
            </button>
            <button className="btn btn-secondary ml-6 rounded-full px-8 py-6 text-lg">
              Get Started
            </button>
          </div>
          <div className="flex-1">
            <img src={SideImg} alt="" />
          </div>
        </div>
      </BoxContainer>
    </section>
  );
};

export default HowItWorks;
