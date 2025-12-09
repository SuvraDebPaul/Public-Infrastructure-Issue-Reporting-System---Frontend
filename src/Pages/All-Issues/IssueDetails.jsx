import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import LoadingSpinner from "../../Util/LoadingSpinner";
import BoxContainer from "../../Util/BoxContainer";
import { fotmateDate } from "../../Utilities";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";
import { SiBoosty } from "react-icons/si";

const IssueDetails = () => {
  const { id } = useParams();
  const { isLoading, data: issue = [] } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/issues/${id}`
      );
      return result.data;
    },
  });
  console.log(issue.timeline);

  if (isLoading) return <LoadingSpinner />;
  return (
    <BoxContainer className="my-10">
      <div className="flex justify-between gap-10">
        <div className="flex-1">
          <img
            className="px-4"
            src={
              issue.image.length
                ? issue.image
                : "https://skhcn.hatinh.gov.vn/storage/images.thumb.6884ae87-e99e-4995-8621-76a68fc0df7a.jpg"
            }
            alt={issue.tittle}
          />
        </div>
        <div className="flex-1 space-y-3">
          <h2 className="text-xl capitalize font-semibold">
            Issue Title: {issue.tittle}
          </h2>
          <h2 className="text-xl capitalize">
            Issue Category: {issue.category}
          </h2>
          <h2 className="text-xl capitalize">
            Issue Location: {issue.location}
          </h2>
          <h2
            className={`text-xl capitalize ${
              issue.boosted ? "text-red-500" : ""
            }`}
          >
            Issue priority: {issue.boosted ? "High" : "Normal"}
          </h2>
          <h2 className="text-xl capitalize">Issue status: {issue.status}</h2>
          <h2 className="text-xl capitalize ">
            Upvotes Count: {issue.upvotes}
          </h2>
          <h2 className="text-xl capitalize">
            Issue Assigned To:{" "}
            {issue.assignedStaffId === null
              ? "Not Assigned"
              : issue.assignedStaffId}
          </h2>
          <h2 className="text-xl capitalize">
            Issue Created: {fotmateDate(issue.createdAt)}
          </h2>
          <hr className="my-6" />
          <p className="text-xl font-bold">Description</p>
          <p>{issue.description}</p>
          <div className="mt-10 text-lg">
            <button className="btn btn-primary">
              <CiEdit size={20} /> Edit
            </button>
            <button className="btn btn-primary mx-5">
              <RiDeleteBin2Line size={20} />
              Delete
            </button>
            <button className="btn btn-primary">
              <SiBoosty size={20} /> Boost
            </button>
          </div>
          <hr className="my-6" />
          <div className="">
            <h2 className="text-2xl font-bold">Issue Tracking & Timeline </h2>
            <div className="breadcrumbs text-md">
              <ul className="space-x-2">
                <li>Pending</li>
                <li>In-Progress</li>
                <li>Resolved</li>
                <li>Closed</li>
              </ul>
            </div>
            <ul className="steps steps-vertical -mt-5">
              {[...issue.timeline] // copy array
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
                .map((entry, i) => (
                  <li key={i} className="step step-primary">
                    <div className="text-left py-10">
                      {/* Status + Badge */}
                      <span className="font-semibold text-lg flex items-center gap-2 capitalize">
                        {entry?.status}

                        <span
                          className={`badge badge-sm ${
                            entry?.status === "pending"
                              ? "badge-warning"
                              : entry?.status === "in-progress"
                              ? "badge-info"
                              : entry?.status === "resolved"
                              ? "badge-success"
                              : "badge-neutral"
                          }`}
                        >
                          {entry?.status}
                        </span>
                      </span>

                      {/* Message */}
                      <p className="text-sm mt-1">
                        <strong>Message:</strong> {entry?.message}
                      </p>

                      {/* Date */}
                      <p className="text-sm mt-1">
                        <strong>Date:</strong> {fotmateDate(entry?.createdAt)}
                      </p>
                      {/* Updated By */}
                      <p className="text-sm mt-1 capitalize">
                        <strong>Updated By:</strong> {entry?.updatedBy}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </BoxContainer>
  );
};

export default IssueDetails;
