import { Box, Paper, Typography, Button } from "@mui/material";

const coloresCartas = [
  "#FFC107", "#FF5722", "#4CAF50", "#2196F3", "#9C27B0",
  "#FFEB3B", "#E91E63", "#00BCD4", "#8BC34A", "#FF9800",
];

interface Props {
  cartas: string[];
  cartaSeleccionada: number | null;
  isSorting: boolean;
  onSortear: () => void;
  onReiniciar: () => void;
  onReiniciarMismos: () => void;
}

export default function CartasSorteo({
  cartas,
  cartaSeleccionada,
  isSorting,
  onSortear,
  onReiniciar,
  onReiniciarMismos,
}: Props) {
  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: "#0f172a",
        borderRadius: 3,
        boxShadow: 6,
        minHeight: 300,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        color: "#e0f2fe",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ width: "100%", fontFamily: "Orbitron, sans-serif", color: "#93c5fd" }}
      >
        🃏 Cartas de jugadores
      </Typography>

      {cartas.length === 0 && (
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            mt: 4,
            fontStyle: "italic",
            color: "#94a3b8",
          }}
        >
          No hay cartas para sortear.
        </Typography>
      )}

      {cartas.map((nombre, i) => {
        const color = coloresCartas[i % coloresCartas.length];
        const esSeleccionada = i === cartaSeleccionada;
        return (
          <Box
            key={nombre + i}
            sx={{
              width: 100,
              height: 140,
              bgcolor: color,
              borderRadius: 2,
              boxShadow: esSeleccionada
                ? "0 0 20px 5px #fde047"
                : "0 4px 10px rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "#0f172a",
              cursor: isSorting ? "default" : "pointer",
              transform: esSeleccionada ? "translateY(-20px) scale(1.1)" : "none",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              userSelect: "none",
              fontFamily: "Orbitron, sans-serif",
            }}
          >
            {nombre}
          </Box>
        );
      })}

      <Box
        sx={{
          width: "100%",
          mt: 4,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          onClick={onSortear}
          disabled={isSorting || cartas.length === 0}
          sx={{
            backgroundColor: "#7c3aed",
            textTransform: "none",
            fontWeight: 600,
            fontFamily: "Orbitron, sans-serif",
            "&:hover": {
              backgroundColor: "#6d28d9",
            },
          }}
        >
          🎲 Sortear
        </Button>
        <Button
          variant="outlined"
          onClick={onReiniciar}
          disabled={isSorting}
          sx={{
            borderColor: "#7c3aed",
            color: "#c4b5fd",
            textTransform: "none",
            fontWeight: 600,
            fontFamily: "Orbitron, sans-serif",
            "&:hover": {
              borderColor: "#a78bfa",
              backgroundColor: "#1e1b4b",
            },
          }}
        >
          🔄 Reiniciar
        </Button>
        <Button
          variant="outlined"
          onClick={onReiniciarMismos}
          disabled={isSorting}
          sx={{
            borderColor: "#7c3aed",
            color: "#c4b5fd",
            textTransform: "none",
            fontWeight: 600,
            fontFamily: "Orbitron, sans-serif",
            "&:hover": {
              borderColor: "#a78bfa",
              backgroundColor: "#1e1b4b",
            },
          }}
        >
          ♻️ Reiniciar con los mismos
        </Button>
      </Box>
    </Paper>
  );
}
