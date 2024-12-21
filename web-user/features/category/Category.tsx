'use client'

import { getCategories, getEquipmentsByCategory } from '@/service/product.service'
import { formatMoney } from '@/utils'
import { Box, Card, CardContent, CardMedia, Grid, Tab, Tabs, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CategoryPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const limit = 10 // Số lượng sản phẩm mỗi trang
  const router = useRouter()

  // Query danh mục
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (categories?.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id) // Chỉ thay đổi selectedCategory nếu chưa có giá trị
    }
  }, [categories]) // Chỉ phụ thuộc vào categories

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(newValue)
  }
  const { data: equipments, isLoading: isLoadingEquipments } = useQuery({
    queryKey: ['equipments', selectedCategory, page],
    queryFn: () =>
      getEquipmentsByCategory({
        categoryId: selectedCategory,
        limit,
        page,
      }),
    enabled: !!selectedCategory,
  })

  return (
    <Box p={4}>
      <Typography variant="h2" fontWeight="bold" mb={4}>
        Danh mục sản phẩm
      </Typography>

      {/* Danh mục */}
      {isLoadingCategories ? (
        <Typography>Đang tải danh mục...</Typography>
      ) : (
        <Box mb={4}>
          {/* Tabs for categories */}
          <Tabs
            value={selectedCategory}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Category Tabs"
          >
            {categories?.map((category) => (
              <Tab
                key={category.id}
                label={category.name}
                value={category.id}
                sx={{
                  textTransform: 'none',
                  fontWeight: selectedCategory === category.id ? 'bold' : 'normal',
                  color: selectedCategory === category.id ? '#1976d2' : 'inherit',
                }}
              />
            ))}
          </Tabs>

          {/* Display content of selected category */}
          <Box mt={2}>
            {categories?.map((category) =>
              selectedCategory === category.id ? (
                <Card key={category.id}>
                  <CardContent>
                    <Typography variant="h6">{category.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              ) : null,
            )}
          </Box>
        </Box>
      )}

      {/* Sản phẩm */}
      {selectedCategory ? (
        isLoadingEquipments ? (
          <Typography>Đang tải sản phẩm...</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {equipments?.map((equipment) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={equipment.id}
                  onClick={() => router.push(`/products/${equipment.id}`)}
                >
                  <Card>
                    <CardMedia component="img" height="300" image={equipment.image} alt={equipment.name} />
                    <CardContent>
                      <Typography variant="h6">{equipment.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {equipment.description}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="primary">
                        Giá thuê: {formatMoney(equipment.rentalPrice)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Số lượng: {equipment.stock}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )
      ) : (
        <Typography>Vui lòng chọn danh mục để xem sản phẩm</Typography>
      )}
    </Box>
  )
}

export { CategoryPage }
