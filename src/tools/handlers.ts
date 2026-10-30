import { GtmService } from "../gtm.ts";

let gtmServiceInstance: GtmService | null = null;

function getService(): GtmService {
  if (!gtmServiceInstance) {
    gtmServiceInstance = new GtmService();
  }
  return gtmServiceInstance;
}

export async function handleToolCall(name: string, args: any) {
  const service = getService();

  switch (name) {
    case "gtm_list_accounts": {
      const data = await service.listAccounts();
      return formatResult(data);
    }

    case "gtm_list_containers": {
      const data = await service.listContainers(args?.accountId);
      return formatResult(data);
    }

    case "gtm_get_container": {
      const data = await service.getContainer(args?.accountId, args?.containerId);
      return formatResult(data);
    }

    case "gtm_list_workspaces": {
      const data = await service.listWorkspaces(args?.accountId, args?.containerId);
      return formatResult(data);
    }

    case "gtm_get_workspace_status": {
      const data = await service.getWorkspaceStatus(
        args?.accountId,
        args?.containerId,
        args?.workspaceId
      );
      return formatResult(data);
    }

    case "gtm_list_tags": {
      const data = await service.listTags(
        args?.accountId,
        args?.containerId,
        args?.workspaceId
      );
      return formatResult(data);
    }

    case "gtm_get_tag": {
      const data = await service.getTag(
        args?.accountId,
        args?.containerId,
        args?.workspaceId,
        args?.tagId
      );
      return formatResult(data);
    }

    case "gtm_list_triggers": {
      const data = await service.listTriggers(
        args?.accountId,
        args?.containerId,
        args?.workspaceId
      );
      return formatResult(data);
    }

    case "gtm_get_trigger": {
      const data = await service.getTrigger(
        args?.accountId,
        args?.containerId,
        args?.workspaceId,
        args?.triggerId
      );
      return formatResult(data);
    }

    case "gtm_list_variables": {
      const data = await service.listVariables(
        args?.accountId,
        args?.containerId,
        args?.workspaceId
      );
      return formatResult(data);
    }

    case "gtm_list_built_in_variables": {
      const data = await service.listBuiltInVariables(
        args?.accountId,
        args?.containerId,
        args?.workspaceId
      );
      return formatResult(data);
    }

    case "gtm_create_tag": {
      const data = await service.createTag({
        accountId: args?.accountId,
        containerId: args?.containerId,
        workspaceId: args?.workspaceId,
        name: args?.name,
        type: args?.type,
        parameter: args?.parameter,
        firingTriggerId: args?.firingTriggerId,
        blockingTriggerId: args?.blockingTriggerId,
        notes: args?.notes,
      });
      return formatResult(data);
    }

    case "gtm_update_tag": {
      const data = await service.updateTag({
        accountId: args?.accountId,
        containerId: args?.containerId,
        workspaceId: args?.workspaceId,
        tagId: args?.tagId,
        name: args?.name,
        type: args?.type,
        parameter: args?.parameter,
        firingTriggerId: args?.firingTriggerId,
        blockingTriggerId: args?.blockingTriggerId,
        paused: args?.paused,
        notes: args?.notes,
      });
      return formatResult(data);
    }

    case "gtm_create_trigger": {
      const data = await service.createTrigger({
        accountId: args?.accountId,
        containerId: args?.containerId,
        workspaceId: args?.workspaceId,
        name: args?.name,
        type: args?.type,
        filter: args?.filter,
        customEventFilter: args?.customEventFilter,
        notes: args?.notes,
      });
      return formatResult(data);
    }

    case "gtm_create_variable": {
      const data = await service.createVariable({
        accountId: args?.accountId,
        containerId: args?.containerId,
        workspaceId: args?.workspaceId,
        name: args?.name,
        type: args?.type,
        parameter: args?.parameter,
        notes: args?.notes,
      });
      return formatResult(data);
    }

    case "gtm_create_version": {
      const data = await service.createVersion({
        accountId: args?.accountId,
        containerId: args?.containerId,
        workspaceId: args?.workspaceId,
        name: args?.name,
        notes: args?.notes,
      });
      return formatResult(data);
    }

    case "gtm_publish_version": {
      const data = await service.publishVersion({
        accountId: args?.accountId,
        containerId: args?.containerId,
        containerVersionId: args?.containerVersionId,
        confirmPublish: Boolean(args?.confirmPublish),
      });
      return formatResult(data);
    }

    default:
      throw new Error(`Herramienta no reconocida: ${name}`);
  }
}

function formatResult(data: any) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}
