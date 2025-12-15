const cursos = [
  // BLOQUE 0
  { codigo:"CI0200", nombre:"Examen diagnóstico", bloque:0, requisitos:[], correquisitos:[], creditos:0 },
  { codigo:"CI0202", nombre:"Inglés básico", bloque:0, requisitos:[], correquisitos:[], creditos:2 },
  { codigo:"MA0101", nombre:"Matemática general", bloque:0, requisitos:[], correquisitos:[], creditos:2 },

  // BLOQUE 1
  { codigo:"CI1106", nombre:"Comunicación escrita", bloque:1, requisitos:[], correquisitos:[], creditos:2 },
  { codigo:"IC1400", nombre:"Fundamentos de organización de computadoras", bloque:1, requisitos:[], correquisitos:["MA1403"], creditos:3 },
  { codigo:"IC1802", nombre:"Introducción a la programación", bloque:1, requisitos:[], correquisitos:[], creditos:3 },
  { codigo:"IC1803", nombre:"Taller de programación", bloque:1, requisitos:[], correquisitos:[], creditos:3 },
  { codigo:"MA1403", nombre:"Matemática discreta", bloque:1, requisitos:[], correquisitos:[], creditos:4 },
  { codigo:"SE1100", nombre:"Actividad cultural I", bloque:1, requisitos:[], correquisitos:[], creditos:0 },

  // BLOQUE 2
  { codigo:"CI1107", nombre:"Comunicación oral", bloque:2, requisitos:["CI1106"], correquisitos:[], creditos:1 },
  { codigo:"CI1230", nombre:"Inglés I", bloque:2, requisitos:["CI0200","CI0202"], correquisitos:[], creditos:2 },
  { codigo:"FH1000", nombre:"Centros de formación humanística", bloque:2, requisitos:[], correquisitos:[], creditos:0 },
  { codigo:"IC2001", nombre:"Estructuras de datos", bloque:2, requisitos:[], correquisitos:["IC2101"], creditos:4 },
  { codigo:"IC2101", nombre:"Programación orientada a objetos", bloque:2, requisitos:["IC1802","IC1803"], correquisitos:[], creditos:3 },
  { codigo:"IC3101", nombre:"Arquitectura de computadores", bloque:2, requisitos:["IC1400","IC1803"], correquisitos:[], creditos:4 },
  { codigo:"MA1102", nombre:"Cálculo diferencial e integral", bloque:2, requisitos:["MA0101","MA1403"], correquisitos:[], creditos:4 },
  { codigo:"SE1200", nombre:"Actividad deportiva I", bloque:2, requisitos:[], correquisitos:[], creditos:0 },

  // BLOQUE 3
  { codigo:"CI1231", nombre:"Inglés II", bloque:3, requisitos:["CI1230"], correquisitos:[], creditos:2 },
  { codigo:"IC3002", nombre:"Análisis de algoritmos", bloque:3, requisitos:["IC2001","MA1102"], correquisitos:[], creditos:4 },
  { codigo:"IC4301", nombre:"Bases de datos I", bloque:3, requisitos:["IC2001"], correquisitos:["MA1103"], creditos:4 },
  { codigo:"IC5821", nombre:"Requerimientos de software", bloque:3, requisitos:[], correquisitos:["IC4301"], creditos:4 },
  { codigo:"MA1103", nombre:"Cálculo y álgebra lineal", bloque:3, requisitos:["MA1102"], correquisitos:[], creditos:4 },
  { codigo:"SE1400", nombre:"Actividad cultural-deportiva", bloque:3, requisitos:[], correquisitos:[], creditos:0 },

  // BLOQUE 4
  { codigo:"CS2101", nombre:"Ambiente humano", bloque:4, requisitos:["CI1107"], correquisitos:[], creditos:2 },
  { codigo:"IC4302", nombre:"Bases de datos II", bloque:4, requisitos:["IC4301"], correquisitos:[], creditos:3 },
  { codigo:"IC4700", nombre:"Lenguajes de programación", bloque:4, requisitos:["IC3002","IC3101"], correquisitos:[], creditos:4 },
  { codigo:"IC6821", nombre:"Diseño de software", bloque:4, requisitos:["IC5821"], correquisitos:[], creditos:4 },
  { codigo:"MA2404", nombre:"Probabilidades", bloque:4, requisitos:["MA1103"], correquisitos:[], creditos:4 },

  // BLOQUE 5
  { codigo:"CS3401", nombre:"Seminario de estudios filosóficos históricos", bloque:5, requisitos:["CS2101"], correquisitos:[], creditos:2 },
  { codigo:"IC4810", nombre:"Administración de proyectos", bloque:5, requisitos:["IC5821"], correquisitos:[], creditos:4 },
  { codigo:"IC5701", nombre:"Compiladores e intérpretes", bloque:5, requisitos:["IC4700"], correquisitos:[], creditos:4 },
  { codigo:"IC6831", nombre:"Aseguramiento de la calidad del software", bloque:5, requisitos:["IC6821"], correquisitos:["IC4810"], creditos:3 },
  { codigo:"MA3405", nombre:"Estadística", bloque:5, requisitos:["MA2404"], correquisitos:[], creditos:4 },

  // BLOQUE 6
  { codigo:"CS4402", nombre:"Seminario de estudios costarricenses", bloque:6, requisitos:["CS3401"], correquisitos:[], creditos:2 },
  { codigo:"IC4003", nombre:"Electiva I", bloque:6, requisitos:[], correquisitos:[], creditos:3 },
  { codigo:"IC6400", nombre:"Investigación de operaciones", bloque:6, requisitos:["MA3405"], correquisitos:[], creditos:4 },
  { codigo:"IC6600", nombre:"Principios de sistemas operativos", bloque:6, requisitos:["IC5701"], correquisitos:[], creditos:4 },
  { codigo:"IC7900", nombre:"Computación y sociedad", bloque:6, requisitos:["IC4810"], correquisitos:["CS4402"], creditos:2 },
  { codigo:"IC8071", nombre:"Seguridad del software", bloque:6, requisitos:["IC4810","IC6831"], correquisitos:[], creditos:3 },

  // BLOQUE 7
  { codigo:"AE4208", nombre:"Desarrollo de emprendedores", bloque:7, requisitos:[], correquisitos:["IC7841"], creditos:4 },
  { codigo:"IC5001", nombre:"Electiva II", bloque:7, requisitos:[], correquisitos:[], creditos:3 },
  { codigo:"IC6200", nombre:"Inteligencia artificial", bloque:7, requisitos:["IC5701","IC6400"], correquisitos:[], creditos:4 },
  { codigo:"IC7602", nombre:"Redes", bloque:7, requisitos:["IC6600"], correquisitos:[], creditos:4 },
  { codigo:"IC7841", nombre:"Proyecto de ingeniería de software", bloque:7, requisitos:["IC4302","IC6831","IC8071"], correquisitos:[], creditos:3 },

  // BLOQUE 8
  { codigo:"IC8842", nombre:"Práctica profesional", bloque:8,
    requisitos:["AE4208","FH1000","IC4003","IC5001","IC6200","IC7602","IC7841","SE1100","SE1200","SE1400"],
    correquisitos:[], creditos:12 }
];
