import React from "react";
import Title from "../../components/Title";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeEditPage() {
  const title = "Employee Data Management";
  const description = `Please use the following form to add new employee or update the existing one.`;
  return (
    <div>
      <Title title={title} description={description} />
      <EmployeeForm />
    </div>
  );
}
