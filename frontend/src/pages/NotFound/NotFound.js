import React from "react";
import Title from "../../components/Title";

export default function NotFound() {
  const title = "Page not available";
  const description = "We couldn't find the page you requested.";
  return (
    <div>
      <Title title={title} description={description} />
    </div>
  );
}
