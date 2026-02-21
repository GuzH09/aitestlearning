import { HomeClient } from "./page.client";
import { ACTIONS_REGISTRY } from "@/lib/actions-registry";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          AI Navigation Assistant
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Describe what you want to do and the AI will take you there.
        </p>
      </div>

      <HomeClient />

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Available actions
        </h3>
        <ul className="space-y-1 text-sm">
          {ACTIONS_REGISTRY.map((action) => (
            <li key={action.label} className="flex items-baseline gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                {action.label}
              </code>
              <span className="text-muted-foreground">
                {action.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
