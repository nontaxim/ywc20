import {createRootRoute, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: () => (
        <>
            <QueryClientProvider client={queryClient}>
                <div className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-[linear-gradient(rgb(0,0,0)_0%,rgb(0,0,0)_50%,rgb(25,2,0)_100%)] bg-[length:contain] bg-[position:0%_0%] p-2">
                    <Outlet />
                </div>
                <TanStackRouterDevtools />
            </QueryClientProvider>
        </>
    ),
});
