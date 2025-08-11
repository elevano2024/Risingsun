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
      className={`list-item ${variant}`}
    >
      <span className="list-item__left">
        <img src="/images/yellowdot.svg" alt="arrow icon" />
        {title}
      </span>
      <img src="/images/arrow-up-right.svg" alt="arrow icon" />
    </a>
  );
};

export default ListItem;
