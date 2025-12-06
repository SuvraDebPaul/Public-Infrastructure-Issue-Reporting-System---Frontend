import React from "react";
import BoxContainer from "../../../Util/BoxContainer";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GrConfigure } from "react-icons/gr";
import { CiClock2 } from "react-icons/ci";
import { TbFilterSearch } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { MdOutlineMoreTime } from "react-icons/md";

const Features = () => {
  return (
    <BoxContainer className="my-10">
      <h2 className="text-4xl mb-10 font-bold text-center">
        SOME OF OUR FEATURES
      </h2>
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="features__card">
          <TbDeviceDesktopAnalytics size={80} color="orange" />
          <h3 className="text-2xl font-bold">Dashboard Reports</h3>
          <p>
            Our rich and simple dashboard keeps you up-to-date on your help desk
            statistics
          </p>
        </div>
        <div className="features__card">
          <GrConfigure size={80} color="orange" />
          <h3 className="text-2xl font-bold">Configurable Help Topic</h3>
          <p>
            Add, edit, and delete your help desk topics that suit your
            preference
          </p>
        </div>
        <div className="features__card">
          <CiClock2 size={80} color="orange" />
          <h3 className="text-2xl font-bold">Service Level Agreements</h3>
          <p>
            Simply set your business hours and our system will handle the rest
            leaving you worry-free
          </p>
        </div>
        <div className="features__card">
          <TbFilterSearch size={80} color="orange" />
          <h3 className="text-2xl font-bold">Ticket Filters</h3>
          <p>
            Our powerful ticket filtering system makes sure the right tickets
            goes to the right department leaving you with a clutter-free
            environment
          </p>
        </div>
        <div className="features__card">
          <BiSupport size={80} color="orange" />
          <h3 className="text-2xl font-bold">Customer Support Portal</h3>
          <p>
            Robust customer support portal system to help your business maintain
            happy customer relationships
          </p>
        </div>
        <div className="features__card">
          <MdOutlineMoreTime size={80} color="orange" />
          <h3 className="text-2xl font-bold">And Much More!</h3>
          <p>
            Ticket comes pack with tons of awesome features you have to try out
            yourself
          </p>
        </div>
      </div>
    </BoxContainer>
  );
};

export default Features;
