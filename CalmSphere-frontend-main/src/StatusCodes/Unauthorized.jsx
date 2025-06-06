import { FaTriangleExclamation } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-6 mt-2">
        {/* work on admin ticket  */}
        <Link to={-1} style={{ textDecoration: "none" }}>
          <div className="card p-3" style={{ alignItems: "center" }}>
            <FaTriangleExclamation
              size={80}
              style={{ alignContent: "center" }}
              className="text-warning"
            />
            <h3 className="mt-2">
              Unauthorized 401
              <p className="text-muted">Contact with admin</p>
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
