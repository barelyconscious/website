import React, { ReactNode } from "react";

interface EntryHeadingProps {
  children: ReactNode;
}

const EntryHeading: React.FC<EntryHeadingProps> = ({ children }) => {
  return (
    <div className="entry-heading">
      <h5 className="heading">
        <span>{children}</span>
      </h5>
    </div>
  );
};

export default EntryHeading;
