import Link from "next/link";
import "./not-found.scss";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="container not-found__content">
        <div className="not-found__illustration">
          <div className="not-found__number">404</div>
        </div>

        <div className="not-found__message">
          <h1>Oops! This page seems to have wandered off...</h1>
          <p>
            Just like our curious Montessori students, this page has gone
            exploring! Let's help you find your way back to the learning
            adventure.
          </p>
        </div>

        <div className="not-found__actions">
          <Link href="/" className="not-found__btn not-found__btn--primary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
