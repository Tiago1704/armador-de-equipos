import { Paper, TextField, Typography, Button, Checkbox, FormControlLabel, Box } from "@mui/material";

interface Props {
  input: string;
  setInput: (v: string) => void;
  onCargar: () => void;
  isLoading: boolean;
  sortearCampeon: boolean;
  setSortearCampeon: (v: boolean) => void;
}

export default function InputNombres({ input, setInput, onCargar, isLoading, sortearCampeon, setSortearCampeon }: Props) {
  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: "#0f172a",
        boxShadow: 6,
        borderRadius: 3,
        minWidth: 300,
        color: "#e0f2fe",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "#93c5fd", fontWeight: 600, fontFamily: 'Orbitron, sans-serif' }}
      >
        🎮 Ingrese los 10 jugadores:
      </Typography>

      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        placeholder="Uno por línea"
        sx={{
          mt: 1,
          input: { color: "#e0f2fe" },
          textarea: { color: "#e0f2fe" },
          backgroundColor: "#1e293b",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#334155",
            },
            "&:hover fieldset": {
              borderColor: "#7c3aed",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#7c3aed",
            },
          },
        }}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={sortearCampeon}
              onChange={(e) => setSortearCampeon(e.target.checked)}
              sx={{
                color: '#93c5fd',
                '&.Mui-checked': {
                  color: '#7c3aed',
                },
              }}
            />
          }
          label={
            <Typography sx={{ color: '#e0f2fe', fontFamily: 'Orbitron, sans-serif' }}>
              Sortear también campeón
            </Typography>
          }
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          py: 1.2,
          fontSize: "1rem",
          backgroundColor: "#7c3aed",
          fontWeight: 700,
          textTransform: "none",
          fontFamily: 'Orbitron, sans-serif',
          "&:hover": {
            backgroundColor: "#6d28d9",
          },
        }}
        onClick={onCargar}
        disabled={isLoading}
      >
        🚀 Cargar nombres
      </Button>
    </Paper>
  );
}