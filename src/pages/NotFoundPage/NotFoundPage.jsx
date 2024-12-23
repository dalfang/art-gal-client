import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const nav = useNavigate();
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Not all who wander are lost..</h2>
      <button onClick={() => nav("/")}>Back to Homepage</button>
    </div>
  );
};

export default NotFoundPage;
