import * as React from "react";
/** @jsx jsx */
import { jsx, IconButton, Flex, Slider } from "theme-ui";
import { PlayArrow, Pause } from "@mui/icons-material";
import Seo from "../../components/seo";
import Layout from "../../components/layout";
import Prompt from "../../components/prompt";

type Point = {
  x: number;
  y: number;
};

type D3Cell = {
  x: number;
  y: number;
  width: number;
  height: number;
  alive: boolean;
  coord: Point;
};

const isBrowser = () => typeof window !== "undefined";

const CELL_SIZE = 32;
const START_OFFSET = 1;
const MAX_WIDTH = 760;
const INNER_WIDTH = (isBrowser() && window.innerWidth) || MAX_WIDTH;
const NUM_CELLS_Y =
  Math.floor(Math.min(INNER_WIDTH, MAX_WIDTH) / CELL_SIZE) - 1;
const NUM_CELLS_X = NUM_CELLS_Y;

declare const d3: any;

class GameOfLife {
  private _displayData: D3Cell[][] = [];
  private _isRunning: boolean = false;
  private _timerId = 0;

  public speed: number = 500;

  constructor() {
    this._displayData = this.getBoardDisplayData();
  }

  set isRunning(running: boolean) {
    this._isRunning = running;

    if (isBrowser()) {
      if (this._isRunning) {
        let lastTime = new Date().getTime();
        const timer = () => {
          this._timerId = window.requestAnimationFrame(timer);
          var currentTime = new Date().getTime();

          if (currentTime - lastTime >= this.speed) {
            this.tick();
            lastTime = currentTime;
          }
        };
        // autostart
        timer();
      } else {
        window.cancelAnimationFrame(this._timerId);
      }
    }
  }

  public render(rootElementSelector: string | Element | null) {
    const width = NUM_CELLS_Y * CELL_SIZE + START_OFFSET * 2;
    const height = NUM_CELLS_X * CELL_SIZE + START_OFFSET * 2;

    const grid = d3
      .select(rootElementSelector)
      .append("svg")
      .attr("width", `${width}px`)
      .attr("height", `${height}px`);

    const row = grid
      .selectAll(".row")
      .data(this._displayData)
      .enter()
      .append("g")
      .attr("class", "row")
      .append("g")
      .attr("class", "column");

    row
      .selectAll(".square")
      .data(function (d: D3Cell) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("class", "square")
      .attr("id", function (d: D3Cell) {
        return `c-${d.coord.x}-${d.coord.y}`;
      })
      .attr("x", function (d: D3Cell) {
        return d.x;
      })
      .attr("y", function (d: D3Cell) {
        return d.y;
      })
      .attr("width", function (d: D3Cell) {
        return d.width;
      })
      .attr("height", function (d: D3Cell) {
        return d.height;
      })
      .style("fill", "transparent")
      .style("stroke", "#ccc")
      .on("mouseenter", ({ coord }: D3Cell) => {
        if (this._isRunning) {
          return;
        }

        const alive = this._displayData[coord.x][coord.y].alive;
        this.setIsAlive(coord, !alive);
      });
  }

  private tick() {
    if (!this._isRunning) {
      return;
    }

    const count = this.getAllNeighborsCount(this._displayData);
    count.forEach((line, row) =>
      line.forEach((neighborsCount, col) => {
        const cell = this._displayData[row][col];
        if (
          (cell.alive && [2, 3].includes(neighborsCount)) ||
          (!cell.alive && [3].includes(neighborsCount))
        ) {
          this.setIsAlive(cell.coord, true);
        } else {
          this.setIsAlive(cell.coord, false);
        }
      })
    );
  }

  private setIsAlive(coord: Point, isAlive: boolean) {
    this._displayData[coord.x][coord.y].alive = isAlive;

    const cell = d3.select(`#c-${coord.x}-${coord.y}`);
    cell.style("fill", isAlive ? "gold" : "transparent");
  }

  private getAllNeighborsCount(data: D3Cell[][]): number[][] {
    const result: number[][] = [];
    for (let row = 0; row < data.length; row++) {
      result.push([]);
      for (let col = 0; col < data[row].length; col++) {
        const count = this.countNeighbors(data, data[row][col].coord);
        result[row].push(count);
      }
    }

    return result;
  }

  private countNeighbors(data: D3Cell[][], { x, y }: Point): number {
    let total = 0;

    const check = (p: Point) => {
      if (!this.isOutOfBounds(p) && data[p.x][p.y].alive) {
        total++;
      }
    };

    [
      { x: x - 1, y: y + 0 },
      { x: x - 1, y: y + 1 },
      { x: x + 0, y: y + 1 },
      { x: x + 1, y: y + 1 },
      { x: x + 1, y: y + 0 },
      { x: x + 1, y: y - 1 },
      { x: x + 0, y: y - 1 },
      { x: x - 1, y: y - 1 },
    ].forEach((dir) => check(dir));

    return total;
  }

  private isOutOfBounds(coord: Point) {
    return (
      coord.x < 0 ||
      coord.x > NUM_CELLS_X - 1 ||
      coord.y < 0 ||
      coord.y > NUM_CELLS_Y - 1
    );
  }

  private getBoardDisplayData() {
    const displayData: D3Cell[][] = [];
    let xPosition = START_OFFSET;
    let yPosition = START_OFFSET;

    for (let row = 0; row < NUM_CELLS_X; row++) {
      displayData.push([]);

      for (let col = 0; col < NUM_CELLS_Y; col++) {
        displayData[row].push({
          x: xPosition,
          y: yPosition,
          width: CELL_SIZE,
          height: CELL_SIZE,
          alive: false,
          coord: {
            x: row,
            y: col,
          },
        });

        xPosition += CELL_SIZE;
      }

      // starting new raw so we need to reset xPosition
      xPosition = START_OFFSET;

      yPosition += CELL_SIZE;
    }

    return displayData;
  }
}

export const GameOfLifePage = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [speed, setSpeed] = React.useState(50);
  const app = React.useRef(null);
  const game = React.useRef<GameOfLife>(new GameOfLife());

  React.useEffect(() => {
    // timeout makes sure d3 is loaded
    setTimeout(() => {
      game.current.speed = speed * 10;
      game.current?.render(app.current);
    }, 1000);
  }, []);

  const handleClick = () => {
    setIsRunning((prev) => {
      const running = !prev;
      game.current.isRunning = running;
      return running;
    });
  };

  const handleSlide = (ev: any) => {
    const s = ev.target.value;
    setSpeed(s);
    game.current.speed = s * 10;
  };

  return (
    <Layout>
      <div>
        <Prompt /> ls -l blog/
      </div>
      <h2>Game Of Life</h2>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <IconButton onClick={handleClick}>
          {isRunning ? <Pause /> : <PlayArrow />}
        </IconButton>
        <Slider onChange={handleSlide} value={speed} />
      </Flex>
      <Flex
        ref={app}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 4,
          marginBottom: 4,
        }}
      ></Flex>
    </Layout>
  );
};

export const Head = () => {
  return (
    <>
      <Seo title="Game of Life" />
      <script src="https://d3js.org/d3.v4.min.js"></script>
    </>
  );
};

export default GameOfLifePage;
