import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ChecklistState {
  checklist: string[]
  toggleItem: (item: string) => void
}

export const useChecklistStore = create<ChecklistState>()(
  devtools(
    persist(
      (set, get) => ({
        checklist: [],
        toggleItem: item => {
          const { checklist } = get()
          const isItemInChecklist = checklist.includes(item)
          set(state => ({
            checklist: isItemInChecklist
              ? state.checklist.filter(i => i !== item)
              : [...state.checklist, item],
          }))
        },
      }),
      { name: 'checklist' }
    )
  )
)
