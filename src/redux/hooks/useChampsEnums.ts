import { useChampions } from "./useChampions";

export function useChampsEnums() {
  const { champions, status } = useChampions();

  const champEnums = champions.map(champ => ({
    id: champ.id,
    name: champ.name,
  }));

  return { champEnums, status };
}
