export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean; // En esta broma, "correcto" significa la respuesta graciosa
  }[];
  // Opcional: agrega aquí la URL de la imagen para cada pregunta
  imageUrl?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question:
      "¿Cuál es la verdadera misión de Leon S. Kennedy al llegar a España en RE4?",
    imageUrl: "public/img/kittyleon.jpg",
    options: [
      {
        text: "Recuperar su campera fachera de cuero que le robó un aldeano.",
        isCorrect: true,
      },
      {
        text: "Rescatar a la hija del presidente de los Estados Unidos.",
        isCorrect: false,
      },
      {
        text: "Averiguar a qué hora exactamente juegan al bingo.",
        isCorrect: false,
      },
      {
        text: "Inscribirse en un torneo internacional de Suplex.",
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    question:
      "¿Cuál es el método que usa Ethan Winters para reimplantarse las extremidades?",
    imageUrl: "public/img/question2.jpg",
    options: [
      {
        text: "Se aprovecha de las capacidades regenerativas extremas que le dio su infección con el mutamiceto.",
        isCorrect: false,
      },
      {
        text: "Echarse juguito verde de dudosa procedencia y pegarse el brazo como si fuera un Lego.",
        isCorrect: true,
      },
      { text: "Cirugía de micro-sutura de Umbrella.", isCorrect: false },
      { text: 'Usar "La Gotita" y rezar.', isCorrect: false },
    ],
  },
  {
    id: 3,
    question:
      "¿Cuál es el objetivo de Chris Redfield al involucrarse con Ethan?",
    imageUrl: "public/img/question3.jpg",
    options: [
      {
        text: "Proteger a la familia Winters y desmantelar a las armas bio-orgánicas como Madre Miranda.",
        isCorrect: false,
      },
      { text: "Destruir las conexiones en Europa del Este.", isCorrect: false },
      {
        text: "Acosar a Ethan para que tenga un hijo con su hermana Claire y salvar el linaje Redfield.",
        isCorrect: true,
      },
      {
        text: "Buscar piedras gigantes para agarrarse a piñas.",
        isCorrect: false,
      },
    ],
  },
  {
    id: 4,
    question: "¿Quién es el verdadero villano oculto en RE4 Remake?",
    imageUrl: "public/img/question4.jpg",
    options: [
      { text: "Osmund Saddler y su culto de Las Plagas.", isCorrect: false },

      { text: "Jack Krauser.", isCorrect: false },
      {
        text: "El Buhonero cobrando 10.000 pesetas por un spray.",
        isCorrect: false,
      },
      {
        text: "Moushley (Ashley convertida en un ratoncito que roba queso).",
        isCorrect: true,
      },
    ],
  },
  {
    id: 5,
    question: "¿Cuál es el verdadero negocio del Buhonero en RE4 Remake?",
    imageUrl: "public/img/question5.jpg",
    options: [
      {
        text: "Es un traficante infectado que provee armas a Leon a cambio de tesoros.",
        isCorrect: false,
      },
      {
        text: "Es un cosplayer del 2004 perdido en el bosque que vende réplicas de airsoft por efecto placebo.",
        isCorrect: true,
      },
      { text: "Evadir a la AFIP vendiendo chatarra.", isCorrect: false },
      { text: "Trabajar como repartidor de MercadoLibre.", isCorrect: false },
    ],
  },
  {
    id: 6,
    question: "¿Por qué Lady Dimitrescu persigue a Ethan en RE Village?",
    imageUrl: "public/img/question6.jpg",
    options: [
      {
        text: "Para capturarlo y entregarle sus partes a la Madre Miranda.",
        isCorrect: false,
      },
      {
        text: "Para usar su sangre en su rutina de skincare.",
        isCorrect: false,
      },
      {
        text: "Para ofrecerle pasar su línea a plan Movistar con tres meses bonificados.",
        isCorrect: true,
      },
      {
        text: "Porque Ethan pisó la alfombra persa con barro.",
        isCorrect: false,
      },
    ],
  },
  {
    id: 7,
    question:
      "Según el lore profundo, ¿cuál fue el motivo del secuestro de Ashley?",
    imageUrl: "public/img/question7.jpg",
    options: [
      {
        text: "Saddler quería robarle su rutina de acondicionador para darle más volumen a las plagas.",
        isCorrect: true,
      },
      {
        text: "Inyectarle una Plaga para enviarla de vuelta y controlar al gobierno de EE.UU.",
        isCorrect: false,
      },
      {
        text: "Obligarla a jugar rankeds de League of Legends.",
        isCorrect: false,
      },
      {
        text: "Fue un accidente queriendo secuestrar a un repartidor de Rappi.",
        isCorrect: false,
      },
    ],
  },
  {
    id: 8,
    question: "¿Cuál fue el mayor fracaso de Karl Heisenberg en su fábrica?",
    imageUrl: "public/img/question8.jpg",
    options: [
      {
        text: "Sus experimentos fallidos con los Soldat y el Sturm.",
        isCorrect: false,
      },
      {
        text: "Una exprimidora V8 que desintegraba naranjas.",
        isCorrect: false,
      },
      {
        text: "Armar un mueble de IKEA con poderes magnéticos.",
        isCorrect: false,
      },
      {
        text: "Intentar crear ventiladores de techo con helicópteros y que Miranda lo castigara un mes sin usar metales.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 9,
    question:
      "¿Cuál es el efecto de salvar al perrito de la trampa para osos en RE4 Remake?",
    imageUrl: "public/img/question9.jpg",
    options: [
      {
        text: "El perro te inscribe en un esquema piramidal de comida canina y Leon queda debiendo 50.000 dólares.",
        isCorrect: true,
      },
      {
        text: "Aparece durante la pelea contra El Gigante para distraerlo.",
        isCorrect: false,
      },
      {
        text: 'Desbloquea el logro secreto "El pichicho del presi".',
        isCorrect: false,
      },
      { text: "El perro se revela como CEO de Umbrella.", isCorrect: false },
    ],
  },
  {
    id: 10,
    question:
      "¿Por qué Ethan atropella tantas veces a Jack Baker en el garaje de RE7?",
    imageUrl: "public/img/question10.jpg",
    options: [
      {
        text: "Para usar el daño masivo del auto y detener la regeneración de Jack.",
        isCorrect: false,
      },
      {
        text: "Porque Jack le quiso limpiar el vidrio en el semáforo y Ethan no tenía cambio.",
        isCorrect: false,
      },
      {
        text: "Porque el seguro contra terceros estaba por vencer y Ethan quería aprovecharlo.",
        isCorrect: false,
      },
      {
        text: "Porque el auto es automático, Ethan solo sabe manejar manual, y lo pisó 14 veces intentando apretar el embrague.",
        isCorrect: true,
      },
    ],
  },
  {
    id: 11,
    question:
      "¿Cuál es el verdadero motivo por el que Ada Wong siempre huye al final de los juegos en lugar de formalizar con Leon?",
    imageUrl: "public/img/question11.jpg",
    options: [
      {
        text: "Para evitar tener que pagar a medias el combustible del helicóptero de rescate.",
        isCorrect: false,
      },
      {
        text: "Porque no soporta que Leon frene a cada rato para jugar al Tetris organizando su maletín durante 15 minutos solo para hacer espacio para un huevo de gallina.",
        isCorrect: true,
      },
      {
        text: "Porque su lealtad está con el mejor postor y los sentimientos son un obstáculo para una espía internacional.",
        isCorrect: false,
      },
      {
        text: "Porque Ashley le avisó que Leon ronca a la noche haciendo el ruido de respiración de los Regeneradores.",
        isCorrect: false,
      },
    ],
  },
  {
    id: 12,
    question:
      "¿Cuál es el verdadero motivo de Luis Sera para arriesgar su vida ayudando a Leon en RE4 Remake?",
    imageUrl: "public/img/question12.jpg",
    options: [
      {
        text: "Quería usar a Leon de carnada para poder robarle todo el inventario al Buhonero mientras este miraba para otro lado.",
        isCorrect: false,
      },
      {
        text: `Perdió una partida de truco contra Krauser y su castigo era hacer de guía turístico de un yanqui que no sabe decir ni "hola".`,
        isCorrect: false,
      },
      {
        text: "Redimirse de sus errores científicos pasados y desmantelar la secta de Los Iluminados desde adentro.",
        isCorrect: false,
      },
      {
        text: "Porque se enamoró a primera vista del flequillo de Leon y su objetivo final era escapar juntos para tener una cita romántica comiendo tapas en Madrid.",
        isCorrect: true,
      },
    ],
  },
];
