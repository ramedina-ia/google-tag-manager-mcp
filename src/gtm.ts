import { getGtmAuthClient, getDefaultAccountId, getDefaultContainerId } from "./auth.ts";
import type {
  CreateTagParams,
  CreateTriggerParams,
  CreateVariableParams,
  CreateVersionParams,
  PublishVersionParams,
  UpdateTagParams,
} from "./types.ts";

export class GtmService {
  private client = getGtmAuthClient();

  private resolveAccountId(accountId?: string): string {
    const resolved = accountId || getDefaultAccountId();
    if (!resolved) {
      throw new Error(
        "Se requiere 'accountId' o la variable de entorno GTM_DEFAULT_ACCOUNT_ID."
      );
    }
    return resolved;
  }

  private resolveContainerId(containerId?: string): string {
    const resolved = containerId || getDefaultContainerId();
    if (!resolved) {
      throw new Error(
        "Se requiere 'containerId' o la variable de entorno GTM_DEFAULT_CONTAINER_ID."
      );
    }
    return resolved;
  }

  /**
   * Lista todas las cuentas de GTM disponibles para la credencial autenticada.
   */
  async listAccounts() {
    try {
      const response = await this.client.accounts.list();
      return {
        accounts: (response.data.account || []).map((acc) => ({
          accountId: acc.accountId,
          name: acc.name,
          shareData: acc.shareData,
          fingerprint: acc.fingerprint,
          path: acc.path,
        })),
      };
    } catch (error: any) {
      throw new Error(`Error al listar cuentas de GTM: ${error.message}`);
    }
  }

  /**
   * Lista todos los contenedores de una cuenta específica.
   */
  async listContainers(accountId?: string) {
    const accId = this.resolveAccountId(accountId);
    try {
      const response = await this.client.accounts.containers.list({
        parent: `accounts/${accId}`,
      });
      return {
        accountId: accId,
        containers: (response.data.container || []).map((c) => ({
          containerId: c.containerId,
          name: c.name,
          publicId: c.publicId, // GTM-XXXXXXX
          usageContext: c.usageContext, // ["web"], ["server"], etc.
          fingerprint: c.fingerprint,
          tagManagerUrl: c.tagManagerUrl,
        })),
      };
    } catch (error: any) {
      throw new Error(`Error al listar contenedores de la cuenta ${accId}: ${error.message}`);
    }
  }

  /**
   * Obtiene la información detallada de un contenedor.
   */
  async getContainer(accountId?: string, containerId?: string) {
    const accId = this.resolveAccountId(accountId);
    const contId = this.resolveContainerId(containerId);
    try {
      const response = await this.client.accounts.containers.get({
        path: `accounts/${accId}/containers/${contId}`,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error al obtener contenedor accounts/${accId}/containers/${contId}: ${error.message}`
      );
    }
  }

  /**
   * Lista los espacios de trabajo (workspaces) de un contenedor.
   */
  async listWorkspaces(accountId?: string, containerId?: string) {
    const accId = this.resolveAccountId(accountId);
    const contId = this.resolveContainerId(containerId);
    try {
      const response = await this.client.accounts.containers.workspaces.list({
        parent: `accounts/${accId}/containers/${contId}`,
      });
      return {
        accountId: accId,
        containerId: contId,
        workspaces: (response.data.workspace || []).map((w) => ({
          workspaceId: w.workspaceId,
          name: w.name,
          description: w.description,
          fingerprint: w.fingerprint,
        })),
      };
    } catch (error: any) {
      throw new Error(`Error al listar workspaces: ${error.message}`);
    }
  }

  /**
   * Obtiene el estado y cambios pendientes de un workspace (sincronización y modificaciones).
   */
  async getWorkspaceStatus(accountId?: string, containerId?: string, workspaceId?: string) {
    const accId = this.resolveAccountId(accountId);
    const contId = this.resolveContainerId(containerId);
    if (!workspaceId) throw new Error("Se requiere 'workspaceId'.");

    try {
      const response = await this.client.accounts.containers.workspaces.getStatus({
        path: `accounts/${accId}/containers/${contId}/workspaces/${workspaceId}`,
      });
      return {
        accountId: accId,
        containerId: contId,
        workspaceId,
        workspace: response.data.workspace,
        entityChangeStatus: response.data.entity,
      };
    } catch (error: any) {
      throw new Error(`Error al obtener status del workspace: ${error.message}`);
    }
  }

  /**
   * Lista todas las etiquetas (tags) en un workspace.
   */
  async listTags(accountId?: string, containerId?: string, workspaceId?: string) {
    const accId = this.resolveAccountId(accountId);
    const contId = this.resolveContainerId(containerId);
    if (!workspaceId) throw new Error("Se requiere 'workspaceId'.");

    try {
      const response = await this.client.accounts.containers.workspaces.tags.list({
        parent: `accounts/${accId}/containers/${contId}/workspaces/${workspaceId}`,
      });
      return {
        accountId: accId,
        containerId: contId,
        workspaceId,
        tags: response.data.tag || [],
      };
    } catch (error: any) {
      throw new Error(`Error al listar etiquetas: ${error.message}`);
    }
  }

  /**
   * Obtiene una etiqueta específica por su ID.
   */
  async getTag(accountId?: string, containerId?: string, workspaceId?: string, tagId?: string) {
    const accId = this.resolveAccountId(accountId);
    const contId = this.resolveContainerId(containerId);
    if (!workspaceId || !tagId) throw new Error("Se requieren 'workspaceId' y 'tagId'.");

    try {
      const response = await this.client.accounts.containers.workspaces.tags.get({
        path: `accounts/${accId}/containers/${contId}/workspaces/${workspaceId}/tags/${tagId}`,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error al obtener la etiqueta ${tagId}: ${error.message}`);
    }
  }

  /**
   * Lista los activadores (triggers) en un workspace.
   */
  async listTriggers(accountId?: string, containerId?: string, workspaceId?: string) {
    const accId = this.resolveAccountId(accountId);
    const contId = this.resolveContainerId(containerId);
    if (!workspaceId) throw new Error("Se requiere 'workspaceId'.");

    try {
      const response = await this.client.accounts.containers.workspaces.triggers.list({
        parent: `accounts/${accId}/containers/${contId}/workspaces/${workspaceId}`,
      });
      return {
        accountId: accId,
        containerId: contId,
        workspaceId,
        triggers: response.data.trigger || [],
      };
    } catch (error: any) {
      throw new Error(`Error al listar activadores: ${error.message}`);
    }
  }

  /**
   * Obtiene un activador específico por su ID.
   */
  async getTrigger(accountId?: string, containerId?: string, workspaceId?: string, triggerId?: string) {
    const accId = this.resolveAccountId(accountId);
    const contId = this.resolveContainerId(containerId);
    if (!workspaceId || !triggerId) throw new Error("Se requieren 'workspaceId' y 'triggerId'.");

    try {
      const response = await this.client.accounts.containers.workspaces.triggers.get({
        path: `accounts/${accId}/containers/${contId}/workspaces/${workspaceId}/triggers/${triggerId}`,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error al obtener el activador ${triggerId}: ${error.message}`);
    }
  }

  /**
   * Lista las variables definidas por el usuario en un workspace.
   */
  async listVariables(accountId?: string, containerId?: string, workspaceId?: string) {
    const accId = this.resolveAccountId(accountId);
    const contId = this.resolveContainerId(containerId);
    if (!workspaceId) throw new Error("Se requiere 'workspaceId'.");

    try {
      const response = await this.client.accounts.containers.workspaces.variables.list({
        parent: `accounts/${accId}/containers/${contId}/workspaces/${workspaceId}`,
      });
      return {
        accountId: accId,
        containerId: contId,
        workspaceId,
        variables: response.data.variable || [],
      };
    } catch (error: any) {
      throw new Error(`Error al listar variables: ${error.message}`);
    }
  }

  /**
   * Lista las variables incorporadas (built-in variables) habilitadas.
   */
  async listBuiltInVariables(accountId?: string, containerId?: string, workspaceId?: string) {
    const accId = this.resolveAccountId(accountId);
    const contId = this.resolveContainerId(containerId);
    if (!workspaceId) throw new Error("Se requiere 'workspaceId'.");

    try {
      const response = await this.client.accounts.containers.workspaces.built_in_variables.list({
        parent: `accounts/${accId}/containers/${contId}/workspaces/${workspaceId}`,
      });
      return {
        accountId: accId,
        containerId: contId,
        workspaceId,
        builtInVariables: response.data.builtInVariable || [],
      };
    } catch (error: any) {
      throw new Error(`Error al listar variables incorporadas: ${error.message}`);
    }
  }

  /**
   * Crea una nueva etiqueta de forma segura en un workspace borrador.
   */
  async createTag(params: CreateTagParams) {
    const accId = this.resolveAccountId(params.accountId);
    const contId = this.resolveContainerId(params.containerId);
    if (!params.workspaceId) throw new Error("Se requiere 'workspaceId'.");
    if (!params.name || !params.type) throw new Error("Se requieren 'name' y 'type' para la etiqueta.");

    try {
      const response = await this.client.accounts.containers.workspaces.tags.create({
        parent: `accounts/${accId}/containers/${contId}/workspaces/${params.workspaceId}`,
        requestBody: {
          name: params.name,
          type: params.type,
          parameter: params.parameter,
          firingTriggerId: params.firingTriggerId,
          blockingTriggerId: params.blockingTriggerId,
          notes: params.notes,
        },
      });
      return {
        status: "success",
        message: `Etiqueta '${params.name}' creada exitosamente en workspace borrador.`,
        tag: response.data,
      };
    } catch (error: any) {
      throw new Error(`Error al crear etiqueta: ${error.message}`);
    }
  }

  /**
   * Actualiza una etiqueta existente de forma segura en un workspace borrador.
   */
  async updateTag(params: UpdateTagParams) {
    const accId = this.resolveAccountId(params.accountId);
    const contId = this.resolveContainerId(params.containerId);
    if (!params.workspaceId || !params.tagId) {
      throw new Error("Se requieren 'workspaceId' y 'tagId' para actualizar la etiqueta.");
    }

    try {
      // Obtener fingerprint actual para evitar conflictos de concurrencia
      const current = await this.client.accounts.containers.workspaces.tags.get({
        path: `accounts/${accId}/containers/${contId}/workspaces/${params.workspaceId}/tags/${params.tagId}`,
      });

      const response = await this.client.accounts.containers.workspaces.tags.update({
        path: `accounts/${accId}/containers/${contId}/workspaces/${params.workspaceId}/tags/${params.tagId}`,
        fingerprint: current.data.fingerprint || undefined,
        requestBody: {
          name: params.name || current.data.name,
          type: params.type || current.data.type,
          parameter: params.parameter || current.data.parameter,
          firingTriggerId: params.firingTriggerId || current.data.firingTriggerId,
          blockingTriggerId: params.blockingTriggerId || current.data.blockingTriggerId,
          paused: params.paused !== undefined ? params.paused : current.data.paused,
          notes: params.notes || current.data.notes,
        },
      });

      return {
        status: "success",
        message: `Etiqueta '${response.data.name}' actualizada exitosamente.`,
        tag: response.data,
      };
    } catch (error: any) {
      throw new Error(`Error al actualizar etiqueta: ${error.message}`);
    }
  }

  /**
   * Crea un activador (trigger) en un workspace borrador.
   */
  async createTrigger(params: CreateTriggerParams) {
    const accId = this.resolveAccountId(params.accountId);
    const contId = this.resolveContainerId(params.containerId);
    if (!params.workspaceId) throw new Error("Se requiere 'workspaceId'.");
    if (!params.name || !params.type) throw new Error("Se requieren 'name' y 'type' para el activador.");

    try {
      const response = await this.client.accounts.containers.workspaces.triggers.create({
        parent: `accounts/${accId}/containers/${contId}/workspaces/${params.workspaceId}`,
        requestBody: {
          name: params.name,
          type: params.type,
          filter: params.filter,
          customEventFilter: params.customEventFilter,
          notes: params.notes,
        },
      });
      return {
        status: "success",
        message: `Activador '${params.name}' creado exitosamente.`,
        trigger: response.data,
      };
    } catch (error: any) {
      throw new Error(`Error al crear activador: ${error.message}`);
    }
  }

  /**
   * Crea una variable personalizada en un workspace borrador.
   */
  async createVariable(params: CreateVariableParams) {
    const accId = this.resolveAccountId(params.accountId);
    const contId = this.resolveContainerId(params.containerId);
    if (!params.workspaceId) throw new Error("Se requiere 'workspaceId'.");
    if (!params.name || !params.type) throw new Error("Se requieren 'name' y 'type' para la variable.");

    try {
      const response = await this.client.accounts.containers.workspaces.variables.create({
        parent: `accounts/${accId}/containers/${contId}/workspaces/${params.workspaceId}`,
        requestBody: {
          name: params.name,
          type: params.type,
          parameter: params.parameter,
          notes: params.notes,
        },
      });
      return {
        status: "success",
        message: `Variable '${params.name}' creada exitosamente.`,
        variable: response.data,
      };
    } catch (error: any) {
      throw new Error(`Error al crear variable: ${error.message}`);
    }
  }

  /**
   * Crea una versión snapshot del contenedor antes de publicar.
   */
  async createVersion(params: CreateVersionParams) {
    const accId = this.resolveAccountId(params.accountId);
    const contId = this.resolveContainerId(params.containerId);
    if (!params.workspaceId) throw new Error("Se requiere 'workspaceId'.");
    if (!params.name) throw new Error("Se requiere un nombre representativo para la versión.");

    try {
      const response = await this.client.accounts.containers.workspaces.create_version({
        path: `accounts/${accId}/containers/${contId}/workspaces/${params.workspaceId}`,
        requestBody: {
          name: params.name,
          notes: params.notes,
        },
      });
      return {
        status: "success",
        message: `Versión '${params.name}' creada exitosamente.`,
        containerVersion: response.data.containerVersion,
      };
    } catch (error: any) {
      throw new Error(`Error al crear versión de contenedor: ${error.message}`);
    }
  }

  /**
   * Publica una versión en vivo. Cuenta con GUARDRAIL OBLIGATORIO de confirmación.
   */
  async publishVersion(params: PublishVersionParams) {
    const accId = this.resolveAccountId(params.accountId);
    const contId = this.resolveContainerId(params.containerId);

    if (!params.confirmPublish) {
      throw new Error(
        "GUARDRAIL DE SEGURIDAD ACTIVADO: Publicar una versión de Google Tag Manager impacta inmediatamente el código JavaScript ejecutado en el tráfico de tus usuarios reales. Debes proporcionar explícitamente confirmPublish: true para autorizar esta operación."
      );
    }

    try {
      const response = await this.client.accounts.containers.versions.publish({
        path: `accounts/${accId}/containers/${contId}/versions/${params.containerVersionId}`,
      });
      return {
        status: "success",
        message: `Versión ${params.containerVersionId} publicada exitosamente a producción.`,
        containerVersion: response.data.containerVersion,
      };
    } catch (error: any) {
      throw new Error(`Error al publicar versión en vivo: ${error.message}`);
    }
  }
}
