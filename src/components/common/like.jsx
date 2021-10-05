export default function Like({ liked, onClick, id }) {
  let likeClass = "fa fa-heart";

  if (!liked) {
    likeClass += "-o";
  }

  return (
    <div>
      <i
        style={{ cursor: "pointer" }}
        onClick={() => onClick(id)}
        className={likeClass}
      ></i>
    </div>
  );
}
