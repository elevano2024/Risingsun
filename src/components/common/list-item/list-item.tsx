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
    <div className={`list-item ${variant}`}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src="/images/yellowdot.svg" alt="arrow icon" />
        {title}
      </a>
      <img src="/images/arrow-up-right.svg" alt="arrow icon" />
    </div>
  );
};

export default ListItem;
