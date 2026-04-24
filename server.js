const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// 🔵 HOME
app.get("/", (req, res) => {
  res.send("Degree IA PRO 🔥 modo inteligente activado");
});

// 🌍 GEOGRAFÍA (mejorada)
const geografia = {
  colombia: { capital: "Bogotá", region: "América del Sur" },
  peru: { capital: "Lima", region: "América del Sur" },
  brasil: { capital: "Brasilia", region: "América del Sur" },
  mexico: { capital: "CDMX", region: "América del Norte" },
  argentina: { capital: "Buenos Aires", region: "América del Sur" },
  chile: { capital: "Santiago", region: "América del Sur" },
  españa: { capital: "Madrid", region: "Europa" },
  francia: { capital: "París", region: "Europa" },
  alemania: { capital: "Berlín", region: "Europa" },
  italia: { capital: "Roma", region: "Europa" },
  japon: { capital: "Tokio", region: "Asia" },
  china: { capital: "Beijing", region: "Asia" }
};

// ⚛️ FÍSICA
const fisica = {
  energia: "La energía es la capacidad de realizar trabajo.",
  fuerza: "F = m × a (segunda ley de Newton).",
  velocidad: "v = d / t",
  gravedad: "La gravedad es la fuerza que atrae los cuerpos."
};

// 🧪 QUÍMICA
const quimica = {
  atomo: "El átomo es la unidad básica de la materia.",
  elemento: "Un elemento es una sustancia de la tabla periódica.",
  molecula: "Una molécula es la unión de átomos.",
  tabla: "La tabla periódica organiza los elementos químicos."
};

function clean(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// 🧠 DETECTOR DE INTENCIÓN (CLAVE DEL UPGRADE)
function isQuestionAboutCapital(text) {
  return (
    text.includes("capital") ||
    text.includes("cual es la capital") ||
    text.includes("cual es la capital de") ||
    text.includes("que capital")
  );
}

// 🚀 CHAT
app.post("/chat", (req, res) => {
  const msg = clean(req.body.message || "");

  // 🌍 GEOGRAFÍA INTELIGENTE
  for (let pais in geografia) {
    const paisClean = clean(pais);

    if (msg.includes(paisClean)) {
      const data = geografia[pais];

      if (isQuestionAboutCapital(msg)) {
        return res.json({
          reply: `🌍 La capital de ${pais.toUpperCase()} es ${data.capital}`
        });
      }

      return res.json({
        reply: `${pais.toUpperCase()} → capital: ${data.capital}, región: ${data.region} 🌎`
      });
    }
  }

  // ⚛️ FÍSICA
  for (let key in fisica) {
    if (msg.includes(key)) {
      return res.json({ reply: fisica[key] + " ⚛️" });
    }
  }

  // 🧪 QUÍMICA
  for (let key in quimica) {
    if (msg.includes(key)) {
      return res.json({ reply: quimica[key] + " 🧪" });
    }
  }

  // 🧮 MATEMÁTICAS (más seguro)
  if (/^[0-9+\-*/().\s]+$/.test(msg)) {
    try {
      return res.json({
        reply: "🧮 Resultado: " + Function(`"use strict"; return (${msg})`)()
      });
    } catch {
      return res.json({ reply: "No pude resolver esa operación 😅" });
    }
  }

  // 👋 SALUDOS
  if (msg.match(/hola|buenas|hey|quiubo/)) {
    return res.json({
      reply: "🔥 Hola bro, soy Degree IA PRO. Pregunta geografía, física, química o matemáticas."
    });
  }

  // 🤖 IDENTIDAD
  if (msg.includes("quien eres")) {
    return res.json({
      reply: "Soy Degree IA PRO 😎 tu asistente escolar inteligente."
    });
  }

  // 📚 DEFAULT
  return res.json({
    reply: "No entendí bien 😅 intenta preguntar geografía, capitales, física o química."
  });
});

// 🚀 SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Degree IA PRO corriendo en puerto", PORT);
});
