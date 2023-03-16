import validateEnv from "./utils/validateEnv";
import App from '@/app';
import { HealthRoute } from "@/routes/health.route";

validateEnv();

const app = new App([
  new HealthRoute()
]);

app.listen();

