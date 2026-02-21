import { HomeClient } from "./page.client";
import { ViewTransition } from "react";

export default function Home() {
  return (
    <ViewTransition enter="slide-bottom" exit="auto">
      <section className="mx-auto max-w-2xl space-y-8 py-8 flex flex-col h-full justify-center my-auto content-center">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-center">
            ¿Qué quieres hacer hoy?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-center">
            Describe lo que quieres hacer y nuestra IA te llevará allí.
          </p>
        </div>

        <HomeClient />
      </section>
    </ViewTransition>
  );
}
