import { SelectOption } from '@/libs/components/Form/Select/SelectStatus'

export const ARTICLE_SELECT_OPTION = [
  { value: 1, label: '公開中' },
  { value: 2, label: '非公開' },
  { value: 3, label: '公開予約中' },
  { value: 4, label: '公開終了' },
]

export const ARTICLE_SELECT_FORM_OPTION: SelectOption[] = [
  {
    label: '公開',
    color: 'green',
    value: 1,
  },
  {
    label: '非公開',
    color: 'grey',
    value: 2,
  },
]
