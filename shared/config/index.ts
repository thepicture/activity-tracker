export default {
  exchange: {
    name: "paranoid",
    type: "direct",
  },
  message: {
    broker: {
      url: "amqp://guest:guest@localhost:5672/",
    },
  },
};
