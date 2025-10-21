const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const mqtt = require("mqtt");

const port = new SerialPort({ path: "COM4", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// Conexão ao Broker MQTT público HiveMQ
const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
const topic = "senai/equipe";

client.on("connect", () => {
  console.log("Conectado ao broker MQTT!");
});

parser.on("data", (line) => {
  try {
    const data = JSON.parse(line.trim()); // Define a variável 'data' aqui
    console.log("Recebido:", data);

    // Publica os dados no tópico MQTT
    client.publish(topic, JSON.stringify(data));
    console.log("Publicado no MQTT:", data);

    // Verifica a temperatura para exibir alerta (se necessário)
    if (data.temperatura > 27) {
      console.log("Atenção: Temperatura alta! Buzzer deve ser ativado.");
      // Aqui você pode adicionar lógica para enviar um comando ou notificar o dashboard
    }
  } catch (err) {
    console.error("Erro ao parsear:", line);
  }
});