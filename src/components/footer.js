import "../styles/footer.scss";
import GitHubLogo from "../imgs/github-logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://github.com/palmerusaf/shopping-cart"
        target="_blank"
        className="footer__content"
      >
        <p className="footer__text">GitHub Repo</p>
        <img className="footer__img" src={GitHubLogo} alt="GitHub Logo" />
      </a>
    </footer>
  );
}
