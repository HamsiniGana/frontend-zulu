export default function ToggleBtn(props) {
  return (
    <button
      className={`toggle-btns ${props.list.includes(props.stringPassed) ? "bg-light-green/80" : "bg-light-green/40"} text-black text-sm p-2 px-1 py-1 rounded-xl active:bg-light`}
      onClick={() => {
        props.setList((prev) => {
          const found = prev.find((form) => form === props.stringPassed);
          if (found) {
            return prev.filter((form) => form !== props.stringPassed);
          } else {
            return [...prev, props.stringPassed];
          }
        });
      }}
    >
      {props.stringPassed}
    </button>
  );
}
