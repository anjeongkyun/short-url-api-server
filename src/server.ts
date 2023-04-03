import validateEnv from "./utils/validate-env";
import App from "@/app";
import { HealthRoute } from "@/routes/health.route";
import { UrlRoute } from "@/routes/url.route";
import { usecaseContext } from "@/contexts";

validateEnv();

const app = new App([new HealthRoute(), new UrlRoute(usecaseContext)]);

app.listen();
