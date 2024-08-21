export type BallType = {
  element: HTMLDivElement;
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  size: number;
};

export type CreateBallOptionsType = {
  color: string;
  speed: number;
  size: number;
};

export type State = {
  [key: string]: number | boolean | string;
  ball_size: number;
  ball_speed: number;
  balls_amount: number;
  randomize_on_bounce: boolean;
  ball_color: string;
  title_text: string;
};
