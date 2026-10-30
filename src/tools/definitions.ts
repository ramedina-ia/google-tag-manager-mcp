import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const TOOLS: Tool[] = [
  {
    name: "gtm_list_accounts",
    description:
      "Lista todas las cuentas de Google Tag Manager accesibles con las credenciales OAuth configuradas.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "gtm_list_containers",
    description:
      "Lista todos los contenedores (Web y Server-Side) dentro de una cuenta de Google Tag Manager.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM (opcional si está definido en GTM_DEFAULT_ACCOUNT_ID).",
        },
      },
      required: [],
    },
  },
  {
    name: "gtm_get_container",
    description:
      "Obtiene detalles técnicos de un contenedor específico de Google Tag Manager.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM (opcional si está configurado el valor por defecto).",
        },
        containerId: {
          type: "string",
          description: "ID numérico interno del contenedor de GTM.",
        },
      },
      required: ["containerId"],
    },
  },
  {
    name: "gtm_list_workspaces",
    description:
      "Lista todos los espacios de trabajo (workspaces) activos en un contenedor de GTM.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
      },
      required: ["containerId"],
    },
  },
  {
    name: "gtm_get_workspace_status",
    description:
      "Obtiene el estado de sincronización y las entidades modificadas/pendientes en un workspace de GTM.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
      },
      required: ["containerId", "workspaceId"],
    },
  },
  {
    name: "gtm_list_tags",
    description:
      "Lista todas las etiquetas (tags) configuradas en un espacio de trabajo de GTM.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
      },
      required: ["containerId", "workspaceId"],
    },
  },
  {
    name: "gtm_get_tag",
    description:
      "Obtiene la configuración completa de una etiqueta específica (tipo, parámetros, activadores asociados).",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
        tagId: {
          type: "string",
          description: "ID de la etiqueta de GTM.",
        },
      },
      required: ["containerId", "workspaceId", "tagId"],
    },
  },
  {
    name: "gtm_list_triggers",
    description:
      "Lista todos los activadores (triggers) configurados en un workspace de GTM.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
      },
      required: ["containerId", "workspaceId"],
    },
  },
  {
    name: "gtm_get_trigger",
    description:
      "Obtiene los detalles y condiciones de filtro de un activador específico en GTM.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
        triggerId: {
          type: "string",
          description: "ID del activador de GTM.",
        },
      },
      required: ["containerId", "workspaceId", "triggerId"],
    },
  },
  {
    name: "gtm_list_variables",
    description:
      "Lista todas las variables personalizadas (User-Defined Variables) en un workspace de GTM.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
      },
      required: ["containerId", "workspaceId"],
    },
  },
  {
    name: "gtm_list_built_in_variables",
    description:
      "Lista las variables incorporadas (Built-in Variables) actualmente habilitadas en el contenedor.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
      },
      required: ["containerId", "workspaceId"],
    },
  },
  {
    name: "gtm_create_tag",
    description:
      "Crea una nueva etiqueta de forma segura en un espacio de trabajo borrador (ej. GA4 Event, Ads, Meta Pixel, HTML personalizado).",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace borrador de GTM.",
        },
        name: {
          type: "string",
          description: "Nombre legible de la etiqueta (ej. 'GA4 - Evento Lead WhatsApp').",
        },
        type: {
          type: "string",
          description: "Tipo de etiqueta en GTM (ej. 'gaawe', 'html', 'awct', etc.).",
        },
        parameter: {
          type: "array",
          description: "Lista de parámetros de configuración de la etiqueta según el tipo.",
          items: {
            type: "object",
          },
        },
        firingTriggerId: {
          type: "array",
          description: "Lista de IDs de activadores que disparan esta etiqueta.",
          items: {
            type: "string",
          },
        },
        blockingTriggerId: {
          type: "array",
          description: "Lista de IDs de activadores de bloqueo / excepción.",
          items: {
            type: "string",
          },
        },
        notes: {
          type: "string",
          description: "Notas explicativas sobre el propósito de la etiqueta.",
        },
      },
      required: ["containerId", "workspaceId", "name", "type"],
    },
  },
  {
    name: "gtm_update_tag",
    description:
      "Actualiza la configuración o estado (pausada/activa) de una etiqueta existente en un workspace borrador.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
        tagId: {
          type: "string",
          description: "ID de la etiqueta a modificar.",
        },
        name: {
          type: "string",
          description: "Nuevo nombre para la etiqueta (opcional).",
        },
        type: {
          type: "string",
          description: "Tipo de etiqueta (opcional).",
        },
        parameter: {
          type: "array",
          description: "Parámetros actualizados de la etiqueta.",
          items: {
            type: "object",
          },
        },
        firingTriggerId: {
          type: "array",
          description: "Lista actualizada de IDs de activadores de disparo.",
          items: {
            type: "string",
          },
        },
        blockingTriggerId: {
          type: "array",
          description: "Lista actualizada de IDs de activadores de bloqueo.",
          items: {
            type: "string",
          },
        },
        paused: {
          type: "boolean",
          description: "True para pausar la etiqueta, false para mantenerla activa.",
        },
        notes: {
          type: "string",
          description: "Notas actualizadas.",
        },
      },
      required: ["containerId", "workspaceId", "tagId"],
    },
  },
  {
    name: "gtm_create_trigger",
    description:
      "Crea un nuevo activador en un workspace borrador (ej. Pageview, Clic en Enlace, Evento Personalizado).",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
        name: {
          type: "string",
          description: "Nombre del activador (ej. 'Trig - Clic Boton WhatsApp').",
        },
        type: {
          type: "string",
          description: "Tipo de activador (ej. 'customEvent', 'linkClick', 'pageview').",
        },
        filter: {
          type: "array",
          description: "Condiciones de activación.",
          items: {
            type: "object",
          },
        },
        customEventFilter: {
          type: "array",
          description: "Condiciones específicas para filtros de eventos personalizados.",
          items: {
            type: "object",
          },
        },
        notes: {
          type: "string",
          description: "Notas técnicas del activador.",
        },
      },
      required: ["containerId", "workspaceId", "name", "type"],
    },
  },
  {
    name: "gtm_create_variable",
    description:
      "Crea una variable personalizada en un workspace borrador (ej. DataLayer, Constante, Cookie, JavaScript).",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace de GTM.",
        },
        name: {
          type: "string",
          description: "Nombre de la variable (ej. 'DLV - user_id').",
        },
        type: {
          type: "string",
          description: "Tipo de variable (ej. 'v' para DataLayer, 'c' para constante, 'jsm' para JavaScript personalizado).",
        },
        parameter: {
          type: "array",
          description: "Configuración y parámetros de la variable.",
          items: {
            type: "object",
          },
        },
        notes: {
          type: "string",
          description: "Notas sobre la variable.",
        },
      },
      required: ["containerId", "workspaceId", "name", "type"],
    },
  },
  {
    name: "gtm_create_version",
    description:
      "Crea una versión snapshot congelada de todos los cambios del workspace antes de cualquier publicación.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        workspaceId: {
          type: "string",
          description: "ID del workspace a congelar.",
        },
        name: {
          type: "string",
          description: "Nombre descriptivo de la versión (ej. 'v1.2.0 - Telemetría WhatsApp & Formulario').",
        },
        notes: {
          type: "string",
          description: "Changelog o notas detalladas de los cambios incluidos en esta versión.",
        },
      },
      required: ["containerId", "workspaceId", "name"],
    },
  },
  {
    name: "gtm_publish_version",
    description:
      "Publica una versión a producción (tráfico web en vivo). CUENTA CON GUARDRAIL OBLIGATORIO: requiere confirmPublish: true.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID de la cuenta de GTM.",
        },
        containerId: {
          type: "string",
          description: "ID del contenedor de GTM.",
        },
        containerVersionId: {
          type: "string",
          description: "ID de la versión de contenedor a publicar.",
        },
        confirmPublish: {
          type: "boolean",
          description: "GUARDRAIL DE SEGURIDAD: Debe ser explícitamente true para autorizar la publicación en vivo.",
        },
      },
      required: ["containerId", "containerVersionId", "confirmPublish"],
    },
  },
];
