import React from "react";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Estilos para el componente CustomTitle
const useStyles = makeStyles(() => ({
  titleContainer: {
    // Contenedor para centrar y aplicar efectos
    textAlign: 'center',
    marginBottom: '2rem',
    position: 'relative',
    padding: '10px 20px',
    borderRadius: '15px',
    background: 'linear-gradient(45deg, #1a202c, #2d3748)', // Fondo sutil para el título
    boxShadow: '0 8px 25px rgba(0,0,0,0.6)', // Sombra más pronunciada
    border: '2px solid #7c3aed', // Borde morado
    overflow: 'hidden', // Para contener cualquier animación futura
  },
  titleText: {
    // Estilos del texto del título
    fontFamily: 'Orbitron, sans-serif', // Fuente futurista
    fontWeight: 800, // Más grueso
    fontSize: '2.5rem', // Tamaño grande por defecto
    // Gradiente de texto para un efecto llamativo
    background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #fde047)', // Morado, rosa, amarillo
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    // Sombra de texto para darle profundidad
    textShadow: '0 0 10px rgba(124, 58, 237, 0.7), 0 0 20px rgba(236, 72, 153, 0.5)',
    animation: '$glow 2s ease-in-out infinite alternate', // Animación de brillo sutil
    '@media (max-width: 600px)': {
      fontSize: '1.8rem', // Ajuste para pantallas pequeñas
    },
  },
  // Keyframes para la animación de brillo
  '@keyframes glow': {
    '0%': {
      textShadow: '0 0 10px rgba(124, 58, 237, 0.7), 0 0 20px rgba(236, 72, 153, 0.5)',
    },
    '100%': {
      textShadow: '0 0 15px rgba(124, 58, 237, 1), 0 0 30px rgba(236, 72, 153, 0.8), 0 0 40px rgba(253, 224, 71, 0.6)',
    },
  },
}));

interface CustomTitleProps {
  text: string; // Prop para el texto del título
}

const CustomTitle: React.FC<CustomTitleProps> = ({ text }) => {
  const classes = useStyles();

  return (
    <Box className={classes.titleContainer}>
      <Typography variant="h4" className={classes.titleText}>
        {text}
      </Typography>
    </Box>
  );
};

export default CustomTitle;