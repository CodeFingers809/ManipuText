export default function Button(props) {
  return (
    <button onClick={props.function} className="btn btn-sm btn-primary me-2 mb-2">
      {props.text}
    </button>
  );
}
