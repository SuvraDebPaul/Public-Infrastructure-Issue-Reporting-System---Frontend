import { MdOutlineHowToVote } from "react-icons/md";
import { Link } from "react-router";
const IssueCard = ({ issues }) => {
  console.log(issues.image.length);
  return (
    <>
      <div className="card bg-base-100 shadow-sm p-4">
        <figure>
          <img
            className="w-full h-[350px]"
            src={
              issues.image.length
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
            <button className="btn btn-sm btn-primary capitalize">
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
