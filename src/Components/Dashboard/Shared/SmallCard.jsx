import React from "react";

const SmallCard = ({ className, issue }) => {
  return (
    <div>
      <div className={`bg-white rounded-2xl shadow-sm ${className}`}>
        <div className="p-4 flex items-center gap-4">
          <issue.icon className="w-8 h-8" />
          <div>
            <p className="text-sm text-muted-foreground">{issue.title}</p>
            <p className="text-xl font-semibold">{issue.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
