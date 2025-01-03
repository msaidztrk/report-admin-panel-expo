export const Routes = {
    HOME: '/screens',
    ABOUT: '/screens/about',
    LOG_OF_USAGE: '/screens/logOfUsage',
    USER_ADD_OR_UPDATE: '/screens/userAddOrUpdate?id=', // Add the new route
} as const;

export type RouteKeys = keyof typeof Routes;
export type RouteValues = typeof Routes[RouteKeys];