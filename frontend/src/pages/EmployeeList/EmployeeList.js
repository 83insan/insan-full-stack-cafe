import React from "react";
import EmployeeListContainer from "./EmployeeListContainer";
import Title from "../../components/Title";

const EmployeeList = () => {
  const title = "Employees List";
  const description = `The following table shows the list of employees data.`;

  return (
    <div>
      <Title title={title} description={description} />
      <EmployeeListContainer />
    </div>
  );
};

export default EmployeeList;
