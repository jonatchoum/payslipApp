import React from "react";
import LogoutButton from "../Components/LogoutButton";

const Salarie = () => {
  return (
    <div>
      <div>
        <LogoutButton></LogoutButton>
      </div>
      <div>Seule page accessible par un Salarie</div>
    </div>
  );
};

export default Salarie;
