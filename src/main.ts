import "./style.css";
import { EventType, KameleoonClient } from "@kameleoon/javascript-sdk";
import { animate, createBall } from "./helpers";
import { State } from "./types";

// -- Constants values
export const siteCode = "my_site_code";
export const featureKey = "my_feature_key";

// -- Define the default state
const state: State = {
  ball_size: 0,
  ball_speed: 0,
  balls_amount: 0,
  // - Randomize color on bounce
  randomize_on_bounce: true,
  ball_color: "transparent",
  title_text: "Bouncing balls",
};

// -- Configure the SDK
const client = new KameleoonClient({ siteCode });

async function init(): Promise<void> {
  // -- Initialize the SDK
  await client.initialize();

  // -- Get the visitor code
  const visitorCode = client.getVisitorCode();

  // -- Reload the page when the configuration is updated
  client.onEvent(EventType.ConfigurationUpdate, () => {
    window.location.reload();
  });

  // -- Get the feature flag variables
  const variables = client.getFeatureFlagVariables(visitorCode, featureKey);

  // -- Update the state with the feature flag variables
  variables.forEach(({ key, value, type }) => {
    console.log({ key, value, type });
    state[key] = value as typeof type;
  });

  // -- Main code --
  const titleElement = document.querySelector("#title > p")!;
  titleElement.textContent = state.title_text;

  for (let i = 0; i < state.balls_amount; i++) {
    const ball = createBall({
      color: state.ball_color,
      speed: state.ball_speed,
      size: state.ball_size,
    });

    animate(ball, state.randomize_on_bounce);
  }
}

init();
