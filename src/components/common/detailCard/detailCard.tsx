import "./detailCard.scss";

const DetailCard = ({ title, data }: { title: string; data: string }) => {
  return (
    <div className={`detailCard1`}>
      <img src="/images/headd.svg" alt="arrow icon" />
      <div className="detailCardContent">
        <h3>{title}</h3>
        <p>{data}</p>
      </div>
    </div>
  );
};

export default DetailCard;
