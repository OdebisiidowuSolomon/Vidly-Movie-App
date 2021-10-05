const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((genre) => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelect(genre)}
          key={genre[valueProperty]}
          className={
            selectedItem?.name === genre?.name
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
