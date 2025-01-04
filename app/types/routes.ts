export const Routes = {
    HOME: '/screens',
    ABOUT: '/screens/about',
    LOG_OF_USAGE: '/screens/logOfUsage',
    USER_ADD_OR_UPDATE: '/screens/userAddOrUpdate?id=', // Add the new route
} as const;

// Define the type for route keys
export type RouteKeys = keyof typeof Routes;

// Define the type for route values
export type RouteValues = typeof Routes[RouteKeys];