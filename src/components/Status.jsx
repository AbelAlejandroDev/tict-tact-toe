import { Circlemark } from "../icons/Circlemark";
import { Xmark } from "../icons/Xmark";

export const Status = ({ xIsNext, found, jumpTo }) => {
  return (
    <>
      {xIsNext && !found && (
        <h5 className="marks">
          Next player: <Xmark className="icon" />
        </h5>
      )}
      {!xIsNext && !found && (
        <h5 className="marks">
          Next player: <Circlemark className="icon" />
        </h5>
      )}

      {found && <h5>GO TO START</h5>}
    </>
  );
};
