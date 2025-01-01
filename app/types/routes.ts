// types/routes.ts
export const Routes = {
    HOME: '/screens',
    ABOUT: '/screens/about',
    LOG_OF_USAGE: '/screens/logOfUsage',
} as const;

export type RouteKeys = keyof typeof Routes;
export type RouteValues = typeof Routes[RouteKeys];