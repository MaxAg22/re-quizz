# 🧟‍♂️ Quiz de Resident Evil - La Broma Definitiva

Un quiz interactivo con temática de Resident Evil diseñado para hacer una broma épica a los fans de la saga.

## 🎮 ¿Qué hace especial a este quiz?

Este no es un quiz normal. Las respuestas **"correctas" están marcadas como incorrectas** y las respuestas **graciosas/absurdas están marcadas como correctas**. 

Tu amigo fan de Resident Evil se sorprenderá cuando seleccione todas las respuestas correctas y obtenga un 0% de aciertos. 😈

## ✨ Características

- 🎨 **Estética dark** inspirada en los juegos de Resident Evil
- 🎯 **10 preguntas** con opciones múltiples
- 🖼️ **Templates para imágenes** - Agrega tus propias imágenes fácilmente
- 📱 **Responsive** - Funciona en móvil, tablet y desktop
- ⚡ **Animaciones fluidas** con Motion (Framer Motion)
- 🚀 **Listo para GitHub Pages**

## 🛠️ Instalación y uso local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 🎨 Personalización

### Agregar imágenes a las preguntas

1. Abre `/src/app/data/questions.ts`
2. Agrega URLs de imágenes en el campo `imageUrl`:

```typescript
{
  id: 1,
  question: "¿Cuál es la verdadera misión de Leon...",
  imageUrl: "https://tu-imagen.com/leon.jpg", // ← Aquí
  options: [...]
}
```

### Modificar preguntas

Edita el archivo `/src/app/data/questions.ts` para cambiar o agregar preguntas.

### Cambiar colores

Modifica `/src/styles/theme.css` para ajustar la paleta de colores.

## 🚀 Desplegar en GitHub Pages

### Configuración rápida

1. **Modifica el base path** en `vite.config.ts`:
   ```typescript
   base: '/nombre-de-tu-repositorio/',
   ```

2. **Sube a GitHub** y activa GitHub Pages en Settings → Pages

3. El workflow de GitHub Actions (`.github/workflows/deploy.yml`) desplegará automáticamente tu sitio

### URL final
```
https://tu-usuario.github.io/nombre-del-repo/
```

📖 **Instrucciones detalladas:** Ver [INSTRUCCIONES_GITHUB_PAGES.md](./INSTRUCCIONES_GITHUB_PAGES.md)

## 📁 Estructura del proyecto

```
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── WelcomeScreen.tsx    # Pantalla inicial
│   │   │   ├── QuizQuestion.tsx     # Componente de preguntas
│   │   │   └── Results.tsx          # Pantalla de resultados
│   │   ├── data/
│   │   │   └── questions.ts         # ← EDITA AQUÍ las preguntas
│   │   └── App.tsx                  # Componente principal
│   └── styles/
│       ├── theme.css                # Tema y colores
│       └── fonts.css                # Fuentes personalizadas
├── public/                          # Coloca aquí tus imágenes
└── .github/workflows/
    └── deploy.yml                   # Deploy automático
```

## 🎯 La broma explicada

En el archivo `questions.ts`, cada opción tiene un campo `isCorrect`:

```typescript
options: [
  { 
    text: "Respuesta correcta real", 
    isCorrect: false  // ← Marcada como incorrecta
  },
  { 
    text: "Respuesta absurda/graciosa", 
    isCorrect: true   // ← Marcada como correcta
  },
]
```

Cuando tu amigo seleccione las respuestas correctas, el quiz las marcará como incorrectas. ¡Sorpresa! 🎉

## 🎨 Tecnologías utilizadas

- **React** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos
- **Motion (Framer Motion)** - Animaciones
- **Vite** - Build tool
- **Lucide React** - Iconos

## 📝 Preguntas incluidas

1. Misión de Leon en España (RE4)
2. Método de Ethan para reimplantarse extremidades
3. Objetivo de Chris con Ethan
4. Villano oculto en RE4 Remake
5. Negocio del Buhonero
6. Por qué Lady Dimitrescu persigue a Ethan
7. Motivo del secuestro de Ashley
8. Fracaso de Karl Heisenberg
9. Efecto de salvar al perrito (RE4)
10. Por qué Ethan atropella a Jack Baker

## 🤝 Contribuir

¿Tienes ideas para más preguntas graciosas? ¡Siéntete libre de agregar más en `questions.ts`!

## ⚠️ Advertencia

Este quiz es solo para diversión entre amigos. No uses esto para acoso o bullying. ¡Resident Evil es genial y sus fans también! 🎮

---

**Hecho con 💀 para los verdaderos sobrevivientes de Raccoon City**
