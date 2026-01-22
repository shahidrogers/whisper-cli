// Available models for command generation
// These models are optimized for following JSON output format and cost-effectiveness

export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  contextWindow: number;
  pricePer1MTokens: number; // Approximate pricing in USD
  speed: "fast" | "medium" | "slow";
  recommended?: boolean;
}

export const AVAILABLE_MODELS: ModelInfo[] = [
  {
    id: "xiaomi/mimo-v2-flash:free",
    name: "MiMo-V2-Flash (free)",
    description: "Fast Xiaomi model",
    contextWindow: 262144,
    pricePer1MTokens: 0,
    speed: "fast",
    recommended: true,
  },
  {
    id: "mistralai/devstral-2512:free",
    name: "Devstral 2 2512 (free)",
    description: "Free coding model",
    contextWindow: 262144,
    pricePer1MTokens: 0,
    speed: "fast",
  },
  {
    id: "x-ai/grok-code-fast-1",
    name: "Grok Code Fast 1",
    description: "Grok coding model",
    contextWindow: 256000,
    pricePer1MTokens: 0.85,
    speed: "fast",
  },
  {
    id: "anthropic/claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    description: "Claude general-purpose",
    contextWindow: 1000000,
    pricePer1MTokens: 9,
    speed: "medium",
  },
  {
    id: "anthropic/claude-opus-4.5",
    name: "Claude Opus 4.5",
    description: "Highest-accuracy Claude",
    contextWindow: 200000,
    pricePer1MTokens: 15,
    speed: "slow",
  },
  {
    id: "google/gemini-3-flash-preview",
    name: "Gemini 3 Flash Preview",
    description: "Fast Google model",
    contextWindow: 1048576,
    pricePer1MTokens: 1.75,
    speed: "fast",
  },
  {
    id: "minimax/minimax-m2.1",
    name: "MiniMax M2.1",
    description: "Efficient coding model",
    contextWindow: 196608,
    pricePer1MTokens: 0.695,
    speed: "medium",
  },
  {
    id: "z-ai/glm-4.7",
    name: "GLM 4.7",
    description: "Z.AI flagship model",
    contextWindow: 202752,
    pricePer1MTokens: 0.95,
    speed: "medium",
  },
  {
    id: "deepseek/deepseek-v3.2",
    name: "DeepSeek V3.2",
    description: "Balanced DeepSeek",
    contextWindow: 163840,
    pricePer1MTokens: 0.315,
    speed: "medium",
  },
];

// Get model by ID
export function getModelById(modelId: string): ModelInfo | undefined {
  return AVAILABLE_MODELS.find((m) => m.id === modelId);
}

// Get recommended model
export function getRecommendedModel(): ModelInfo {
  const recommended = AVAILABLE_MODELS.find((m) => m.recommended);
  if (!recommended) {
    throw new Error("No models available");
  }
  return recommended;
}

// Format model for display
export function formatModelDisplay(model: ModelInfo, isCurrent: boolean = false): string {
  const marker = isCurrent ? "→" : " ";
  const recommended = model.recommended ? " ★" : "";
  const price = model.pricePer1MTokens === 0 ? "free" : `$${model.pricePer1MTokens}/1M`;
  return `${marker} ${model.name}${recommended} · ${model.speed} · ${price}`;
}

// List all models
export function listModels(currentModelId?: string): string {
  return AVAILABLE_MODELS.map((model) =>
    formatModelDisplay(model, model.id === currentModelId)
  ).join("\n");
}
