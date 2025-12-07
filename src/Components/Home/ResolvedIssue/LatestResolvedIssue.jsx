import React from "react";
import BoxContainer from "../../../Util/BoxContainer";

const LatestResolvedIssue = ({ resolvedIssue }) => {
  console.log(resolvedIssue);
  const latestResolvedIssue = resolvedIssue.filter((issue) => {
    return issue.upvotes > 40;
  });
  console.log(latestResolvedIssue);
  return (
    <section className="bg-base-200">
      <BoxContainer className="py-10">
        <h2 className="text-4xl mb-10 font-bold text-center uppercase">
          Latest Ressolved Issues
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {latestResolvedIssue.map((issue) => (
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <img
                  className="w-full h-[350px]"
                  src={issue.image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {issue.title}
                  <div className="badge badge-secondary">{issue.priority}</div>
                </h2>
                <div className="card-actions justify-start">
                  <div className="badge badge-outline">{issue.location}</div>
                  <div className="badge badge-outline">{issue.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary my-10">All Issues</button>
      </BoxContainer>
    </section>
  );
};

export default LatestResolvedIssue;
