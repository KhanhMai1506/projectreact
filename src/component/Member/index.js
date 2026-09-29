import Login from "../Member/login";
import Register from "../Member/register";

function Index() {
  return (
    <>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-1">
          <Register />
        </div>
        <div className="col-sm-1">
          <h2 className="or">OR</h2>
        </div>
        <div className="col-sm-4">
          <Login />
        </div>
      </div>
    </>
  );
}

export default Index;
