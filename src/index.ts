#!/usr/bin/env node

/**
 * Servidor MCP de Google Tag Manager (GTM)
 * Arquitectura Segura basada en STDIO y OAuth 2.0
 * Desarrollado para Google Antigravity & Automatizaciones de Analítica Web
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { TOOLS } from "./tools/definitions.ts";
import { handleToolCall } from "./tools/handlers.ts";

const server = new Server(
  {
    name: "google-tag-manager-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 1. Listar el catálogo de herramientas
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// 2. Ejecutar herramientas solicitadas por el cliente MCP
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    return await handleToolCall(name, args);
  } catch (error: any) {
    console.error(`[GTM MCP ERROR] Error en herramienta '${name}':`, error.message);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              error: true,
              tool: name,
              message: error.message,
            },
            null,
            2
          ),
        },
      ],
      isError: true,
    };
  }
});

// 3. Inicializar el transporte STDIO seguro
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Servidor MCP de Google Tag Manager iniciado exitosamente en modo STDIO seguro.");
}

main().catch((err) => {
  console.error("Error fatal al inicializar Google Tag Manager MCP:", err);
  process.exit(1);
});
