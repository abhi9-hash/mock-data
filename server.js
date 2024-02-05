const app = require("./app");
const dotenv = require("dotenv");

//  Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

const port = 4000 || process.env.PORT;

console.log({ port });

const server = app.listen(port, () => {
  console.log(`Server is working on http://localhost:4000`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
