import { Paper, Typography, Divider, Grid, Box, IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { posicionesOrdenadas, type PlayerAssignment, type Posiciones, type Team } from "../constants";

interface Props {
  team1: Team;
  team2: Team;
  onRerollChampion: (player: PlayerAssignment, role: Posiciones) => void;
}

export default function Equipos({ team1, team2, onRerollChampion }: Props) {
  return (
    <Grid container spacing={3} sx={{ width: "100%" }}>
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 3,
            backgroundColor: "#1e293b",
            borderRadius: 3,
            boxShadow: 6,
            color: "#e0f2fe",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          <Typography variant="h6" sx={{ color: "#38bdf8", fontWeight: 700 }}>
            🛡️ Team 1
          </Typography>
          <Divider sx={{ my: 2, borderColor: "#334155" }} />
          {posicionesOrdenadas.map((pos) => (
            <Box
              key={pos}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", // Centrar verticalmente
                px: 1,
                py: 0.5,
                borderBottom: "1px solid #334155",
              }}
            >
              <Typography sx={{ textTransform: "uppercase", fontWeight: 500, color: "#94a3b8" }}>
                {pos}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 700, color: "#facc15" }}>
                  {team1[pos].name} {team1[pos].champion ? `: ${team1[pos].champion}` : ""}
                </Typography>
                {team1[pos].champion && (
                  <IconButton
                    size="small"
                    sx={{ ml: 1, color: '#fde047' }}
                    onClick={() => onRerollChampion(team1[pos], pos)}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 3,
            backgroundColor: "#0f172a",
            borderRadius: 3,
            boxShadow: 6,
            color: "#e0f2fe",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          <Typography variant="h6" sx={{ color: "#a78bfa", fontWeight: 700 }}>
            ⚔️ Team 2
          </Typography>
          <Divider sx={{ my: 2, borderColor: "#334155" }} />
          {posicionesOrdenadas.map((pos) => (
            <Box
              key={pos}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 1,
                py: 0.5,
                borderBottom: "1px solid #334155",
              }}
            >
              <Typography sx={{ textTransform: "uppercase", fontWeight: 500, color: "#94a3b8" }}>
                {pos}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 700, color: "#7dd3fc" }}>
                  {team2[pos].name} {team2[pos].champion ? `: ${team2[pos].champion}` : ""}
                </Typography>
                {team2[pos].champion && (
                  <IconButton
                    size="small"
                    sx={{ ml: 1, color: '#fde047' }}
                    onClick={() => onRerollChampion(team2[pos], pos)}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}
