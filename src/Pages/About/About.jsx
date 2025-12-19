import React from "react";
import BoxContainer from "../../Util/BoxContainer";

const About = () => {
  return (
    <BoxContainer className="p-6">
      {/* Hero Section */}
      <div className="hero bg-base-200 rounded-xl shadow-md mb-8">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold text-primary">
              About Our System
            </h1>
            <p className="py-4 text-gray-600">
              The <strong>Public Infrastructure Issue Reporting System</strong>{" "}
              empowers citizens to report problems like broken streetlights,
              potholes, water leakage, garbage overflow, and damaged footpaths.
              Government staff and admins can manage, verify, assign, and
              resolve issues efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* Why It Matters */}
      <div className="card bg-base-100 shadow-md mb-6">
        <div className="card-body">
          <h2 className="card-title text-secondary">Why It Matters</h2>
          <p>
            Municipal services often suffer from delayed response and lack of
            tracking. This system solves that by:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Improving transparency</li>
            <li>Reducing response time</li>
            <li>Helping collect and analyze infrastructure data</li>
            <li>Making city service delivery more efficient</li>
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div className="collapse collapse-arrow bg-base-200 mb-6">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          How the System Works
        </div>
        <div className="collapse-content">
          <ol className="list-decimal list-inside space-y-1 text-gray-700">
            <li>
              Citizens submit a report with issue details, photos, and location.
            </li>
            <li>Admin reviews & assigns the issue to staff.</li>
            <li>Staff verifies the issue and updates progress.</li>
            <li>
              Status flows from{" "}
              <strong>Pending → In-Progress → Resolved → Closed</strong>.
            </li>
            <li>
              Citizens get real-time updates and can track their issue anytime.
            </li>
            <li>Premium citizens receive priority support.</li>
          </ol>
        </div>
      </div>
    </BoxContainer>
  );
};

export default About;
