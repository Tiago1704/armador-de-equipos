import { useState } from "react";
import InputNombres from "./components/InputNombres";
import CartasSorteo from "./components/CartasSorteo";
import Equipos from "./components/Equipos";
import CustomTitle from "./components/CustomTitle";
import { makeStyles } from "@mui/styles";
import { CHAMPIONS, posicionesOrdenadas, type PlayerAssignment, type Posiciones, type Team } from "./constants";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    background: "rgb(48, 52, 68)",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  topRow: {
    marginBottom: '2rem',
  },
  middleRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    width: '100%',
    marginBottom: '2rem',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%',
    gap: '2rem',
  },
}));

const App = () => {
  const [input, setInput] = useState("");
  const [cartas, setCartas] = useState<string[]>([]);
  const [originalNombres, setOriginalNombres] = useState<string[]>([]);
  const [asignados, setAsignados] = useState<string[]>([]);
  const [team1, setTeam1] = useState<Team>(
    Object.fromEntries(posicionesOrdenadas.map(pos => [pos, { id: crypto.randomUUID(), name: "" }])) as Team
  );
  const [team2, setTeam2] = useState<Team>(
    Object.fromEntries(posicionesOrdenadas.map(pos => [pos, { id: crypto.randomUUID(), name: "" }])) as Team
  );
  const [isSorting, setIsSorting] = useState(false);
  const [cartaSeleccionada, setCartaSeleccionada] = useState<number | null>(null);
  const [sortearCampeon, setSortearCampeon] = useState(false);
  const [usedChampions, setUsedChampions] = useState<Set<string>>(new Set());
  const classes = useStyles();

  const handleCargar = () => {
    const nombres = input
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    if (nombres.length !== 10) {
      console.error("Debe haber exactamente 10 nombres.");
      return;
    }
    setOriginalNombres(nombres);
    setCartas(nombres);
    setAsignados([]);
    setTeam1(Object.fromEntries(posicionesOrdenadas.map(pos => [pos, { id: crypto.randomUUID(), name: "" }])) as Team);
    setTeam2(Object.fromEntries(posicionesOrdenadas.map(pos => [pos, { id: crypto.randomUUID(), name: "" }])) as Team);
    setCartaSeleccionada(null);
    setUsedChampions(new Set());
  };

  const handleReiniciar = () => {
    setInput("");
    setOriginalNombres([]);
    setCartas([]);
    setAsignados([]);
    setTeam1(Object.fromEntries(posicionesOrdenadas.map(pos => [pos, { id: crypto.randomUUID(), name: "" }])) as Team);
    setTeam2(Object.fromEntries(posicionesOrdenadas.map(pos => [pos, { id: crypto.randomUUID(), name: "" }])) as Team);
    setCartaSeleccionada(null);
    setUsedChampions(new Set());
  };

  const handleReiniciarMismos = () => {
    setCartas(originalNombres);
    setAsignados([]);
    setTeam1(Object.fromEntries(posicionesOrdenadas.map(pos => [pos, { id: crypto.randomUUID(), name: "" }])) as Team);
    setTeam2(Object.fromEntries(posicionesOrdenadas.map(pos => [pos, { id: crypto.randomUUID(), name: "" }])) as Team);
    setCartaSeleccionada(null);
    setUsedChampions(new Set());
  };

  const sortear = () => {
    if (cartas.length === 0 || isSorting) return;
    setIsSorting(true);

    const indexSeleccionado = Math.floor(Math.random() * cartas.length);
    setCartaSeleccionada(indexSeleccionado);

    setTimeout(() => {
      const nombreSeleccionado = cartas[indexSeleccionado];
      const indexAsignacion = asignados.length;
      const esPar = indexAsignacion % 2 === 0;
      const pos = posicionesOrdenadas[Math.floor(indexAsignacion / 2)];

      let assignedChampion: string | undefined = undefined;
      if (sortearCampeon && pos) {
        const availableChampions = CHAMPIONS.filter(
          (c) => c.roles.includes(pos) && !usedChampions.has(c.name)
        );

        if (availableChampions.length > 0) {
          const randomChampIndex = Math.floor(Math.random() * availableChampions.length);
          assignedChampion = availableChampions[randomChampIndex].name;
          setUsedChampions((prev) => new Set(prev).add(assignedChampion!));
        } else {
          console.warn(`No hay campeones disponibles para el rol ${pos} o todos han sido usados.`);
          const anyAvailableChampion = CHAMPIONS.filter(c => !usedChampions.has(c.name));
          if (anyAvailableChampion.length > 0) {
            const randomChampIndex = Math.floor(Math.random() * anyAvailableChampion.length);
            assignedChampion = anyAvailableChampion[randomChampIndex].name;
            setUsedChampions((prev) => new Set(prev).add(assignedChampion!));
          }
        }
      }

      if (indexAsignacion < 10) {
        const playerAssignment: PlayerAssignment = {
          id: crypto.randomUUID(),
          name: nombreSeleccionado,
          champion: assignedChampion,
        };

        if (esPar) {
          setTeam1((prev) => ({ ...prev, [pos]: playerAssignment }));
        } else {
          setTeam2((prev) => ({ ...prev, [pos]: playerAssignment }));
        }
        setAsignados((prev) => [...prev, nombreSeleccionado]);
        setCartas((prev) => prev.filter((_, i) => i !== indexSeleccionado));
      }

      setCartaSeleccionada(null);
      setIsSorting(false);
    }, 2000);
  };

  const rerollChampion = (playerToUpdate: PlayerAssignment, role: Posiciones) => {
    if (!playerToUpdate.champion) {
      console.warn(`No champion assigned to ${playerToUpdate.name} to re-roll.`);
      return;
    }

    setUsedChampions(prev => {
      const newSet = new Set(prev);
      newSet.delete(playerToUpdate.champion!);
      return newSet;
    });

    const availableChampionsForRole = CHAMPIONS.filter(c => c.roles.includes(role));
    const newChampionOptions = availableChampionsForRole.filter(c => !usedChampions.has(c.name));

    let newChampion: string | undefined;

    if (newChampionOptions.length > 0) {
      newChampion = newChampionOptions[Math.floor(Math.random() * newChampionOptions.length)].name;
    } else {
      console.warn(`No hay campeones nuevos disponibles para ${playerToUpdate.name} en el rol ${role}.`);
      newChampion = playerToUpdate.champion;
    }

    if (newChampion) {
      setUsedChampions(prev => new Set(prev).add(newChampion!));
    }

    const updateTeam = (team: Team) => {
      const updatedTeam = { ...team };
      for (const p of posicionesOrdenadas) {
        if (updatedTeam[p].id === playerToUpdate.id) {
          updatedTeam[p] = { ...updatedTeam[p], champion: newChampion };
          break;
        }
      }
      return updatedTeam;
    };

    let foundInTeam1 = false;
    for (const p of posicionesOrdenadas) {
      if (team1[p].id === playerToUpdate.id) {
        setTeam1(updateTeam(team1));
        foundInTeam1 = true;
        break;
      }
    }
    if (!foundInTeam1) {
      setTeam2(updateTeam(team2));
    }
  };


  return (
    <div className={classes.root}>
      <CustomTitle text="Arena de Invocadores: Sorteo de Equipos y Campeones" />

      <div className={classes.middleRow}>
        <InputNombres
          input={input}
          setInput={setInput}
          onCargar={handleCargar}
          isLoading={isSorting}
          sortearCampeon={sortearCampeon}
          setSortearCampeon={setSortearCampeon}
        />
        <CartasSorteo
          cartas={cartas}
          cartaSeleccionada={cartaSeleccionada}
          isSorting={isSorting}
          onSortear={sortear}
          onReiniciar={handleReiniciar}
          onReiniciarMismos={handleReiniciarMismos}
        />
      </div>

      <div className={classes.bottomRow}>
        <Equipos team1={team1} team2={team2} onRerollChampion={rerollChampion} />
      </div>
    </div>
  );
};

export default App;