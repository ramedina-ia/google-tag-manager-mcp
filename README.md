# 🏷️ Google Tag Manager MCP Server (GTM)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Protocol: MCP](https://img.shields.io/badge/Protocol-MCP%20v1.6-purple.svg)](https://modelcontextprotocol.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6.svg)](https://www.typescriptlang.org/)
[![Security: STDIO Hardened](https://img.shields.io/badge/Security-STDIO%20Hardened-green.svg)](#seguridad-y-auditoría)

Servidor oficial de **Model Context Protocol (MCP)** en TypeScript puro para la auditoría, automatización y gestión programática de **Google Tag Manager (Web y Server-Side)** mediante asistentes de Inteligencia Artificial como **Google Antigravity**, Claude Desktop y Cursor.

Diseñado bajo los más altos estándares de **ciberseguridad empresarial**, reemplazando arquitecturas vulnerables basadas en demonios de red o puertos locales por un transporte **STDIO aislado**, autenticación nativa OAuth 2.0 y **guardrails de seguridad** contra despliegues destructivos en producción.

---

## 🛡️ ¿Por qué este Servidor MCP? (Auditoría & Seguridad)

Muchos servidores MCP comunitarios para GTM presentan fallas críticas de seguridad:
- ❌ **Puertos locales expuestos (`http://localhost:9090`)**: Abren la puerta a ataques de Server-Side Request Forgery (SSRF) y Cross-Process Snooping.
- ❌ **Tokens y claves estáticas en texto plano**: Expuestas en scripts `.cmd` o `.ps1`.
- ❌ **Despliegues sin control (Riesgo de Stored XSS)**: Permiten a una IA publicar código JavaScript directamente en producción sin confirmación humana explícita (*dual-custody*).
- ❌ **Binarios monolíticos externos**: Difíciles de auditar y mantener.

### ✨ Ventajas de nuestra solución:
- ✅ **Aislamiento Total por Proceso (STDIO)**: Cero puertos de red abiertos, cero riesgo de interceptación local.
- ✅ **Guardrail de Confirmación en Publicaciones (`confirmPublish`)**: Impide publicaciones accidentales a tráfico en vivo.
- ✅ **Gestión Criptográfica de Credenciales**: Autenticación segura mediante OAuth 2.0 Refresh Token renovado en memoria.
- ✅ **Gestión de Entornos de Trabajo Borrador**: Todas las modificaciones se realizan de forma segura en borradores antes de generar versiones.
- ✅ **100% TypeScript Nativo**: Código limpio, auditable y mantenible.

---

## 🏗️ Arquitectura Técnica

```
┌────────────────────────────────────────────────────────┐
│             Google Antigravity / Claude                │
└──────────────────────────┬─────────────────────────────┘
                           │ Protocolo MCP (STDIO puro)
                           │ JSON-RPC 2.0 (stdin/stdout)
┌──────────────────────────▼─────────────────────────────┐
│          google-tag-manager-mcp (TypeScript)           │
│  ┌───────────────────────┬──────────────────────────┐  │
│  │   Auth Manager        │    GTM Service Engine    │  │
│  │   (OAuth2 Refresh)    │    (tagmanager v2)       │  │
│  └───────────────────────┴──────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Guardrails de Seguridad (confirmPublish: true)   │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTPS TLS 1.3
                           │ API Oficial de Google
┌──────────────────────────▼─────────────────────────────┐
│           Google Tag Manager API (v2)                  │
│       Contenedores Web | Contenedores Server (S2S)     │
└────────────────────────────────────────────────────────┘
```

---

## 🧰 Catálogo de Herramientas (17 Tools)

### 1. Inspección y Lectura (Read-Only)
| Herramienta | Descripción |
| :--- | :--- |
| `gtm_list_accounts` | Lista todas las cuentas de GTM asociadas a la credencial. |
| `gtm_list_containers` | Lista los contenedores Web y Server-Side de una cuenta. |
| `gtm_get_container` | Obtiene detalles y configuración técnica de un contenedor. |
| `gtm_list_workspaces` | Lista los espacios de trabajo (workspaces) activos. |
| `gtm_get_workspace_status` | Inspecciona entidades modificadas/pendientes sin publicar. |
| `gtm_list_tags` | Lista todas las etiquetas con sus estados y activadores. |
| `gtm_get_tag` | Obtiene la configuración detallada de una etiqueta específica. |
| `gtm_list_triggers` | Lista todos los activadores y condiciones de evento. |
| `gtm_get_trigger` | Consulta las reglas de filtrado de un activador. |
| `gtm_list_variables` | Lista las variables personalizadas (DataLayer, DOM, Constantes). |
| `gtm_list_built_in_variables` | Lista las variables integradas del sistema habilitadas. |

### 2. Escritura Segura en Borradores (Draft Workspaces)
| Herramienta | Descripción |
| :--- | :--- |
| `gtm_create_tag` | Crea etiquetas (GA4, Google Ads, Meta Pixel, HTML Personalizado). |
| `gtm_update_tag` | Modifica parámetros, activadores o pausa una etiqueta existente. |
| `gtm_create_trigger` | Crea activadores (Eventos personalizados, Clics, Páginas vistas). |
| `gtm_create_variable` | Crea variables personalizadas para captura de telemetría. |

### 3. Control de Versiones y Despliegue con Guardrail
| Herramienta | Descripción |
| :--- | :--- |
| `gtm_create_version` | Congela los cambios del workspace en una versión snapshot con notas. |
| `gtm_publish_version` | **Publica en vivo a producción**. Exige obligatoriamente `confirmPublish: true`. |

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js 20 o superior.
- Una cuenta de Google Cloud Console con la **Tag Manager API** habilitada.
- Credenciales OAuth 2.0 (Client ID y Client Secret) y un Refresh Token de GTM.

### 1. Clonar el Repositorio
```bash
git clone https://github.com/ramedina-ia/google-tag-manager-mcp.git
cd google-tag-manager-mcp
```

### 2. Instalar Dependencias y Compilar
```bash
npm install
npm run build
```

### 3. Configurar Variables de Entorno (`.env`)
Crea tu archivo `.env` basándote en `.env.example`:
```env
GTM_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GTM_CLIENT_SECRET=GOCSPX-tu-client-secret
GTM_REFRESH_TOKEN=1//tu-refresh-token
GTM_DEFAULT_ACCOUNT_ID=1234567890
```

---

## ⚙️ Integración con Google Antigravity / Claude Desktop / Cursor

Agrega la configuración a tu archivo `mcp_config.json`:

```json
{
  "mcpServers": {
    "google-tag-manager-mcp": {
      "command": "node",
      "args": [
        "d:/Ruta/A/google-tag-manager-mcp/dist/index.js"
      ],
      "env": {
        "GTM_CLIENT_ID": "tu-client-id.apps.googleusercontent.com",
        "GTM_CLIENT_SECRET": "GOCSPX-tu-client-secret",
        "GTM_REFRESH_TOKEN": "1//tu-refresh-token",
        "GTM_DEFAULT_ACCOUNT_ID": "1234567890"
      }
    }
  }
}
```

> **Tip para desarrollo rápido**: También puedes ejecutar directamente el archivo TypeScript con soporte nativo de Node.js:
> `"args": ["--experimental-strip-types", "d:/Ruta/A/google-tag-manager-mcp/src/index.ts"]`

---

## 🧪 Casos de Uso Prácticos

### 1. Auditoría Automatizada de Etiquetas Huérfanas
> *"Lista todas las etiquetas de mi contenedor y detecta cuáles no tienen ningún activador asociado o están pausadas."*

### 2. Implementación de Telemetría para Clics en WhatsApp
> *"Crea una variable DataLayer para el identificador del lead, un activador para clics en la clase `.btn-whatsapp` y una etiqueta de evento GA4 llamada `lead_whatsapp` en el espacio de trabajo borrador."*

### 3. Snapshot Seguro antes de Cambios Mayores
> *"Crea una versión snapshot del estado actual del contenedor llamada 'Snapshot Pre-Lanzamiento Campaña' antes de modificar las variables de comercio electrónico."*

---

## 🔒 Consideraciones de Ciberseguridad

1. **Principio de Mínimo Privilegio (PoLP)**: Las operaciones de eliminación de contenedores no están expuestas como herramientas autónomas para prevenir borrados accidentales catastróficos.
2. **Protección XSS**: Siempre valida los scripts de etiquetas tipo `html` (HTML personalizado). El MCP encapsula los payloads en esquemas fuertemente tipados.
3. **Cero Logs Sensibles**: El servidor redirige los diagnósticos a `stderr` sin imprimir jamás tokens ni credenciales en la consola estándar reservada para el protocolo JSON-RPC.

---

## 📄 Licencia

Distribuido bajo la Licencia **MIT**. Consulta [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ por **Ramiro Medina** ([@ramedina-ia](https://github.com/ramedina-ia)) para la comunidad de desarrolladores y creadores de contenido de Inteligencia Artificial.
