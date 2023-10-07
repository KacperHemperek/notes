import { UseMutationOptions } from '@tanstack/react-query'

export type Create<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export type ApiMutationOptions<
    T = unknown,
    K = unknown,
    J = unknown,
    L = unknown,
> = Omit<UseMutationOptions<T, K, J, L>, 'mutationFn' | 'mutationKey'>
