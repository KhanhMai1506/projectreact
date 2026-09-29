import { Link } from "react-router-dom";

function MenuAcc() {
  return (
      <div className="left-sidebar">
        <h2>Account</h2>

        <div className="panel-group category-products" id="accordian">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link to="/account/update">Account</Link>
              </h4>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link to="/account/product/list">My Product</Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default MenuAcc;
