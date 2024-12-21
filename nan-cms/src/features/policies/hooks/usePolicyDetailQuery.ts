import { getPolicyDetail } from '@/libs/api/policy'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { PolicyDetailResponseType, QueryInputPolicyDetailType } from '../type'

export const usePolicyDetailQuery = (policyId: string) => {
  const { sortOptions } = useTableContext<PolicyDetailResponseType, QueryInputPolicyDetailType>()

  const { data, error, isLoading } = useQuery({
    queryKey: ['policy-detail', policyId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getPolicyDetail({ policyId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
