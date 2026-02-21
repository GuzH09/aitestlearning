export interface ActionDefinition {
  label: string;
  route: string;
  modalParam: string;
  description: string;
  pageLabel: string;
}

export const ACTIONS_REGISTRY: ActionDefinition[] = [
  {
    label: "add-item",
    route: "/stock",
    modalParam: "add-item",
    description:
      "Add a new product or item to the inventory/stock. Use when the user wants to create, register, or add a new product.",
    pageLabel: "Inventario",
  },
  {
    label: "create-sale",
    route: "/sales",
    modalParam: "create-sale",
    description:
      "Create a new sale or transaction. Use when the user wants to sell something, register a sale, or create an order.",
    pageLabel: "Ventas",
  },
  {
    label: "change-setting",
    route: "/configuration",
    modalParam: "change-setting",
    description:
      "Change a configuration or setting. Use when the user wants to modify preferences, update settings, or configure the application.",
    pageLabel: "Configuración",
  },
];

export const ACTION_LABELS = ACTIONS_REGISTRY.map((a) => a.label);

export function getActionByLabel(
  label: string,
): ActionDefinition | undefined {
  return ACTIONS_REGISTRY.find((a) => a.label === label);
}

export function buildActionUrl(action: ActionDefinition): string {
  return `${action.route}?modal=${action.modalParam}`;
}

export function buildSystemPrompt(): string {
  const actionsDescription = ACTIONS_REGISTRY.map(
    (a) => `- "${a.label}": ${a.description}`,
  ).join("\n");

  return `You are a dashboard navigation assistant. Your job is to classify the user's request into exactly one of the available actions.

Available actions:
${actionsDescription}

Rules:
- You MUST choose the single most relevant action based on the user's intent.
- Do not explain your reasoning. Just return the action label.
- If the request is ambiguous, pick the closest match.`;
}
