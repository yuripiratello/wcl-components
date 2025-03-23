import { RpgLogs } from "../definitions/RpgLogs";

export default function getAbilityInstanceById(
  abilityId: number
): RpgLogs.Ability | undefined {
  return reportGroup.abilities.find((ability) => ability.id === abilityId);
}
