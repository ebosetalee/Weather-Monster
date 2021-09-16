import express from "express";
import CitiesRouter from "./routes/cities.js";
import TemperaturesRouter from "./routes/temperatures.js";
import ForecastRouter from "./routes/forecasts.js";
import WebhookRouter from "./routes/webhooks.js";

export const app = express();
export const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/cities", CitiesRouter);
app.use("/api/v1/temperatures", TemperaturesRouter);
app.use("/api/v1/forecasts", ForecastRouter);
app.use("/api/v1/webhooks", WebhookRouter);
