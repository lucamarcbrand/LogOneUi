import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

const Page404 = (props) => {
  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faBan} size="6x" />
      </div>
      <div>404 PAGE NOT FOUND</div>
      <p>
        Hmm. Looks like we can't find that page. Maybe check the address again
      </p>
    </div>
  );
};

export default Page404;
