import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeLinkStyles = {
    color: "cyan",
    fontWeight: "bold",
    borderBottom: "2px solid cyan",
  };

  return (
    <nav className="bg-black bg-opacity-50 sticky top-0  shadow-lg">
      <ul className="flex justify-end gap-x-10 p-6 mr-6">
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeLinkStyles : {})}
            to="/"
          >
            Add Client
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeLinkStyles : {})}
            to={"/list"}
          >
            View Clients
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
