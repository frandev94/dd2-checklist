import { useEffect, useState, type ChangeEvent } from 'react'
import { Alert, Form, ListGroup } from 'react-bootstrap'

import {
  getItems,
  getItemsCategories,
  type IItem,
  type IItemCategory,
} from '../../api/map-data'
import { useChecklistStore } from '../../store/checklist'

export default function ItemsList() {
  const { checklist, toggleItem } = useChecklistStore()
  const [items, setItems] = useState<IItem[]>()
  const [error, setError] = useState<string>()
  const [categories, setCategories] = useState<IItemCategory[]>()
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isLoadingCategories = !categories && isLoading
  const isLoadingItems = !items && isLoading

  const onCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setSelectedCategory(event.target.value as string)
  }

  useEffect(() => {
    const fecthItems = async (category: string) => {
      try {
        setIsLoading(true)
        const data = await getItems({ categoryId: category })
        setItems(data ?? [])
        console.log(`fecthedItems: ${data.map(d => d.id).join()}`)
      } catch (error) {
        if (error instanceof Error) setError(error.message)
        else setError('Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    if (!selectedCategory) return
    console.log(`fecthItems: ${selectedCategory}`)
    fecthItems(selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    const fecthCategories = async () => {
      try {
        setIsLoading(true)
        const data = await getItemsCategories()
        setCategories(data ?? [])
      } catch (error) {
        if (error instanceof Error) setError(error.message)
        else setError('Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    fecthCategories()
  }, [])

  return (
    <div>
      <Form.Select onChange={onCategoryChange}>
        {isLoadingCategories && <option disabled>Loading...</option>}
        {categories?.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Select>
      {error && <Alert variant='danger'>{error}</Alert>}
      <div key={selectedCategory}>
        <h2>{categories?.find(c => c.id === selectedCategory)?.name}</h2>
        {isLoadingItems && <p>Loading...</p>}
        {items && (
          <ListGroup>
            {items?.map(item => (
              <ListGroup.Item key={item.id} id={'item-' + item.id}>
                <Form.Check
                  className='fs-4 my-2'
                  checked={checklist.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                  type='checkbox'
                  label={<a href={'./map#' + item.id}>{item.name}</a>}
                />
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </div>
  )
}
