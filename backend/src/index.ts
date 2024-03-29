import express from "express";
import "dotenv/config";
import audioFeatureRoutes from "./routes/audioFeatures.js";
import cors from "cors";

export const startServer = () => {
  const PORT = 3000;
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api/v1/audioFeatures", audioFeatureRoutes);

  const server = app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
  );

  const closeServer = () => {
    server.close();
    console.log("Server closing");
  };

  return [app, closeServer];
};

startServer();
