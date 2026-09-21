export default function Profile() {
  return (
    <aside className="profile">
      <div className="profile-avatar">
        HM
      </div>

      <h2>HAMSE MO</h2>

      <p className="profile-role">
        Full-Stack Developer
      </p>

      <div className="profile-status">
        <span />
        Available for projects
      </div>

      <div className="profile-info">
        <div>
          <span>Location</span>
          <strong>Somaliland</strong>
        </div>

        <div>
          <span>Stack</span>
          <strong>React / Django</strong>
        </div>

        <div>
          <span>Mobile</span>
          <strong>Flutter</strong>
        </div>
      </div>
    </aside>
  );
}