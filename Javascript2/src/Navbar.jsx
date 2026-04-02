export default function Navbar() {
  return (
    <nav>
      <NavHeader />
    </nav>
  );
}

function NavHeader() {
  return (
    <div className="nav-header">
      <h1>Country Explorer</h1>
      <p>See information from countries around the world</p>
    </div>
  );
}
