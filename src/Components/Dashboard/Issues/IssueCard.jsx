import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineHowToVote } from "react-icons/md";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
const IssueCard = ({ issues }) => {
  const { user } = useAuth();
  // console.log(issues.image.length);
  const queryClient = useQueryClient();
  const upvoteMutation = useMutation({
    mutationFn: async ({ id, userEmail }) => {
      //console.log(id, userEmail);
      return await axios.put(
        `${import.meta.env.VITE_API_URL}/issues/upvote/${id}`,
        { userEmail }
      );
    },
    onSuccess: () => {
      toast.success("Upvote Updated Successfully");
      queryClient.invalidateQueries(["issue"]);
    },
    onError: (error) => {
      console.log("ON ERROR", error);
      toast.error(error.message);
    },
  });
  const handleUpvotes = async (issue) => {
    //console.log(issue._id);
    upvoteMutation.mutate({ id: issue._id, userEmail: user.email });
  };
  return (
    <>
      <div className="card bg-base-100 shadow-sm p-4">
        <figure>
          <img
            className="w-full h-[350px]"
            src={
              issues?.image
                ? issues.image
                : "https://skhcn.hatinh.gov.vn/storage/images.thumb.6884ae87-e99e-4995-8621-76a68fc0df7a.jpg"
            }
            alt={issues?.tittle}
          />
        </figure>
        <div className="card-body space-y-2 px-0">
          <h2 className="card-title">Title: {issues?.tittle}</h2>
          <div className="card-actions justify-between">
            <div className="font-semibold py-4 rounded-sm badge badge-secondary capitalize">
              Priority: {issues?.priority}
            </div>
            <div className="font-semibold py-4 rounded-sm badge badge-info capitalize">
              Status: {issues?.status}
            </div>
            <button
              onClick={() => handleUpvotes(issues)}
              className={`btn btn-sm btn-primary capitalize ${
                issues?.userEmail === user?.email ? "btn-disabled" : ""
              }`}
            >
              <MdOutlineHowToVote size={18} /> {issues?.upvotes}
            </button>
          </div>
          <div className="card-actions justify-between">
            <div className="py-4 badge badge-outline">
              Location: {issues?.location}
            </div>
            <div className="py-4 badge badge-outline">
              Category: {issues?.category}
            </div>
          </div>
          <Link to={`/issues/${issues._id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default IssueCard;
