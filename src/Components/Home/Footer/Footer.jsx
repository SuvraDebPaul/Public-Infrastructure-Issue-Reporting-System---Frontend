import { IoMdArrowDroprightCircle } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router";

const Footer = () => {
  return (
    <section className="footer sm:footer-horizontal bg-base-200 p-10 flex justify-between gap-20">
      <aside className="flex-1">
        <h2 className="text-4xl font-bold">Make Happy Customers</h2>
        <p className="text-lg">
          Ticket is a widely used and trusted open source support ticketing
          system. Easily scale and streamline your customer service and
          drastically improve your customer's experience.
        </p>
        <div className="mt-5 flex gap-6">
          <Link className="hover:text-indigo-800">
            <FaFacebookSquare size={50} />
          </Link>
          <Link>
            <FaTwitterSquare size={50} />
          </Link>
          <Link>
            <FaInstagramSquare size={50} />
          </Link>
          <Link>
            <IoLogoYoutube size={50} />
          </Link>
        </div>
      </aside>
      <div className="flex-1 justify-end mr-20">
        <h6 className="text-3xl font-bold mb-5">Navigations</h6>
        <nav className="flex gap-20 text-lg">
          <div className="grid gap-4">
            <a className="flex-inline">
              <IoMdArrowDroprightCircle /> Features
            </a>
            <a className="flex-inline">
              <IoMdArrowDroprightCircle />
              Editions
            </a>
            <a className="flex-inline">
              <IoMdArrowDroprightCircle />
              Cloud-hosted
            </a>
            <a className="flex-inline">
              <IoMdArrowDroprightCircle />
              Forum
            </a>
            <a className="flex-inline">
              <IoMdArrowDroprightCircle />
              Blog
            </a>
          </div>
          <div className="grid gap-4">
            <a className="flex-inline">
              <IoMdArrowDroprightCircle /> About
            </a>
            <a className="flex-inline">
              <IoMdArrowDroprightCircle /> Careers
            </a>
            <a className="flex-inline">
              <IoMdArrowDroprightCircle /> FAQ
            </a>
            <a className="flex-inline">
              <IoMdArrowDroprightCircle /> Contact
            </a>
            <a className="flex-inline">
              <IoMdArrowDroprightCircle /> Sitemap
            </a>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Footer;
