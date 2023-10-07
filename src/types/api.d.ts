import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

export type Create<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export type ApiMutationOptions<
    T = unknown,
    K = unknown,
    J = unknown,
    L = unknown,
> = Omit<UseMutationOptions<T, K, J, L>, 'mutationFn' | 'mutationKey'>

export type ApiQueryOptions<
    T = unknown,
    K = unknown,
    J = unknown,
    L = unknown,
> = Omit<UseQueryOptions<T, K, J, L>, 'queryFn' | 'queryKey'>
