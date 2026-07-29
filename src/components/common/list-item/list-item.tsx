import "./list-item.scss";

const ListItem = ({
  title,
  link,
  variant,
}: {
  title: string;
  link: string;
  variant?: string;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`list-item ${variant ?? ""}`}
    >
      <span className="list-item__left">
        <img
          className="list-item__dot"
          src="/images/yellowdot.svg"
          alt=""
          aria-hidden="true"
        />
        <span className="list-item__title">{title}</span>
      </span>
      <img
        className="list-item__arrow"
        src="/images/arrow-up-right.svg"
        alt=""
        aria-hidden="true"
      />
    </a>
  );
};

export default ListItem;
