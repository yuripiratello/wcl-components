import { RpgLogs } from "../definitions/RpgLogs";

// Returns an actor icon markup.
const getPlayerMarkdown = (player: RpgLogs.Actor, spec: string): string => {
  return `<ActorIcon type="${player.subType}-${spec}">${player.name}</ActorIcon>`;
};

export default getPlayerMarkdown;
