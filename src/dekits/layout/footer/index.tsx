import "./footer.scss";
export function Footer() {
  return (
    <div className="auth-wrap">
      <div className="auth-footer">
        <div className="de-footer-column">
          <div>About</div>
          <div>Accessibility</div>
          <div>User Agreement</div>
        </div>
        <div className="de-footer-column">
          <div>Privacy Policy</div>
          <div>Cookie Policy</div>
          <div>Copyright Policy</div>
        </div>
        <div className="de-footer-column">
          <div>Brand Policy</div>
          <div>Guest Controls</div>
          <div>Community Guidelines</div>
        </div>
        <div className="de-footer-column">
          <div>@2022</div>
        </div>
      </div>
    </div>
  );
}
