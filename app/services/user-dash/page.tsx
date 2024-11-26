import Dashboard from "@/components/HOC/Dashboard";
import Userdash from "../../../components/dashboard/user-dash";
import React from "react";

const page = () => {
  return (
    <Dashboard>
      <Userdash />
    </Dashboard>
  );
};

export default page;
