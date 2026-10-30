import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import type { tagmanager_v2 } from "googleapis";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

// Cargar variables de entorno relativas al proyecto
dotenv.config({ path: envPath, override: true });

let gtmClientInstance: tagmanager_v2.Tagmanager | null = null;

export function getGtmAuthClient(): tagmanager_v2.Tagmanager {
  if (gtmClientInstance) {
    return gtmClientInstance;
  }

  // Volver a verificar dotenv por si se modificó
  dotenv.config({ path: envPath, override: true });

  const clientId = process.env.GTM_CLIENT_ID;
  const clientSecret = process.env.GTM_CLIENT_SECRET;
  const refreshToken = process.env.GTM_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Credenciales faltantes: Asegúrate de configurar GTM_CLIENT_ID, GTM_CLIENT_SECRET y GTM_REFRESH_TOKEN en el archivo .env o en las variables de entorno del servidor MCP."
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    "http://localhost"
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  gtmClientInstance = google.tagmanager({
    version: "v2",
    auth: oauth2Client,
  });

  return gtmClientInstance;
}

export function getDefaultAccountId(): string | undefined {
  return process.env.GTM_DEFAULT_ACCOUNT_ID;
}

export function getDefaultContainerId(): string | undefined {
  return process.env.GTM_DEFAULT_CONTAINER_ID;
}
