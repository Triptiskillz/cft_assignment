import React, { useEffect } from "react";

function LogoutPage() {
  useEffect(() => {
    const handlelogout = () => {
      localStorage.removeItem("userData");
      window.location.href = "/";
    };

    handlelogout();
  }, []);
  return <div></div>;
}

export default LogoutPage;
