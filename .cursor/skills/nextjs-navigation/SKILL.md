---
name: nextjs-navigation
description: >-
  Provides expert guidance on Next.js App Router navigation, prefetching behavior, and Link component configuration. Use when working with Next.js navigation, Link prefetching, or App Router routing.
---

## Core Concepts

### Link Prefetching Behavior

Understand the three-state prefetch system in App Router:

- `prefetch={undefined}` (default): Prefetches only static routes. Dynamic routes are not prefetched until the user initiates navigation.
- `prefetch={true}`: Prefetches both static and dynamic routes eagerly.
- `prefetch={false}`: Disables prefetching entirely. No prefetch occurs, not even on hover.

Note: In versions prior to App Router, `prefetch={false}` would still trigger prefetching on hover. This behavior changed in App Router—`prefetch={false}` now means no prefetching whatsoever.

```tsx
// Default: prefetches static routes only
<Link href="/dashboard">Dashboard</Link>

// Prefetch both static and dynamic routes
<Link href="/user/123" prefetch={true}>User Profile</Link>

// No prefetching at all
<Link href="/heavy-page" prefetch={false}>Heavy Page</Link>
```

### Component State Preservation with Activity

When the `cacheComponents` flag is enabled, Next.js uses React's `<Activity>` component internally to preserve component state during client-side navigation. This allows components to maintain their state when navigating away and back, rather than remounting fresh.

## Common Pitfalls

### Suspense Boundaries and Search Param Changes

Suspense boundaries do not re-trigger their fallback UI for same-page navigations when only search params change. This can cause stale UI when content depends on search params.

Fix this by adding a unique `key` to the Suspense boundary that includes the changing search param:

```tsx
// ❌ Suspense fallback won't show when searchParams change
<Suspense fallback={<Loading />}>
  <SearchResults query={searchParams.query} />
</Suspense>

// ✅ Suspense fallback shows on each query change
<Suspense key={searchParams.query} fallback={<Loading />}>
  <SearchResults query={searchParams.query} />
</Suspense>
```

## API Specifics

### Typing Page Props

Use the `PageProps` helper type to correctly type page component props in App Router:

```tsx
import type { PageProps } from 'next';

export default async function Page({ params, searchParams }: PageProps) {
  // params and searchParams are correctly typed
}
```