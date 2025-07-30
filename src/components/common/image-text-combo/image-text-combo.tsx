import "./image-text-combo.scss";

const ImageText = ({
  title,
  data,
  variant,
  tag,
  img,
}: {
  title: string;
  data: string;
  variant?: string;
  tag?: string;
  img?: string;
}) => {
  return (
    <div className={`list-item ${variant}`}>
      <div className="list-item__image">
        {img && <img src={img} alt={title} />}
      </div>
      <div className="list-item__content">
        <h3 className="list-item__title">{title}</h3>
        <p className="list-item__data">{data}</p>
        {tag && (
          <div className="list-item__tag">
            <img src="/images/yellowdot.svg" alt="arrow icon" />
            <span>{tag}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageText;
