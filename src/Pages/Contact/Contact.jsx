import React from "react";
import BoxContainer from "../../Util/BoxContainer";

const Contact = () => {
  return (
    <BoxContainer className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="hero bg-base-200 rounded-xl shadow-md">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-primary">Contact Us</h1>
            <p className="py-4 text-gray-600">
              Have questions, feedback, or need support? We’re here to help you
              with the Public Infrastructure Issue Reporting System.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <h2 className="card-title">📧 Email</h2>
            <p>support@cityservices.com</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <h2 className="card-title">📞 Phone</h2>
            <p>+880 1234 567 890</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <h2 className="card-title">📍 Address</h2>
            <p>Municipal Office, Chattogram, Bangladesh</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-secondary">Send Us a Message</h2>
          <form className="form-control space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </BoxContainer>
  );
};

export default Contact;
