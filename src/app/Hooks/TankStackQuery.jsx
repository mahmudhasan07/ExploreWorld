"use client"
import React from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
const TankStackQuery = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
};

export default TankStackQuery;