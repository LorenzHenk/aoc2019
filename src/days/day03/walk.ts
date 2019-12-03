import { Path, Direction } from "./parse";

export function* walkPath(path: Path) {
  let x = 0;
  let y = 0;

  for (let ix = 0; ix < path.length; ix++) {
    const task = path[ix];
    for (let j = 0; j < task.distance; j++) {
      switch (task.direction) {
        case Direction.Up:
          y++;
          break;
        case Direction.Down:
          y--;
          break;
        case Direction.Left:
          x--;
          break;
        case Direction.Right:
          x++;
          break;
      }
      yield { x, y };
    }
  }
}
