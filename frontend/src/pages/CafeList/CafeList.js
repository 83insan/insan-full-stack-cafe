import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Title from "../../components/Title";
import CafeListContainer from "./CafeListContainer";

export default function CafeList() {
  const title = "Cafes List";
  const description = `The following table shows the list of cafes data.`;
  return (
    <>
      <Title title={title} description={description} />
      <CafeListContainer />
    </>
  );
}
