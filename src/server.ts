import validateEnv from "./utils/validate-env";
import App from "@/app";
import { HealthRoute } from "@/routes/health.route";

validateEnv();

const app = new App([new HealthRoute()]);

app.listen();
