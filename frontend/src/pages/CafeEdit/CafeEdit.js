import React from "react";
import Title from "../../components/Title";
import CafeForm from "./CafeForm";

export default function CafesEditPage() {
  const title = "Cafe Data Management";
  const description = `Please use the following form to add new cafe or update the existing one.`;
  return (
    <div>
      <Title title={title} description={description} />
      <CafeForm />
    </div>
  );
}
