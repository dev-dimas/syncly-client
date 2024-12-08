import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 – Page Not Found</title>
      </Helmet>
      <div>
        <h1>404 - Page Not Found</h1>
      </div>
    </>
  );
}
