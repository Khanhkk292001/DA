import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const FAQComponent = () => {
  const router = useRouter()

  const faqItems = [
    {
      question: 'Làm thế nào để tôi đặt hàng online?',
      answer:
        'Bạn có thể đặt hàng online bằng cách truy cập vào trang web của chúng tôi, chọn sản phẩm và làm theo hướng dẫn thanh toán.',
    },
    {
      question: 'Nếu tôi đặt hàng trực tuyến có những rủi ro gì không?',
      answer:
        'Chúng tôi cam kết bảo mật thông tin khách hàng và đảm bảo giao hàng đúng hẹn. Mọi vấn đề phát sinh sẽ được hỗ trợ ngay lập tức.',
    },
    {
      question: 'Nếu tôi thuê nhiều sản phẩm tại Shop thì có chính sách ưu đãi gì không?',
      answer:
        'Shop cung cấp chính sách giảm giá đặc biệt cho khách hàng thuê nhiều sản phẩm. Vui lòng liên hệ để biết thêm chi tiết.',
    },
    {
      question: 'Tôi thuê lần đầu thì quy trình thuê của shop như thế nào?',
      answer:
        'Quy trình thuê rất đơn giản: chọn sản phẩm, cung cấp thông tin cá nhân, thanh toán và nhận sản phẩm tại nhà.',
    },
    {
      question: 'Tôi cần lưu ý gì khi nhận váy thuê tại Shop?',
      answer:
        'Vui lòng kiểm tra tình trạng sản phẩm trước khi nhận và liên hệ với chúng tôi ngay nếu phát hiện vấn đề.',
    },
  ]

  return (
    <Stack width="100%" bgcolor="white" alignItems="center">
      <Box
        maxWidth={{ xs: '100%', md: 800 }}
        sx={{
          backgroundColor: 'base.white',
          padding: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          sx={{
            textAlign: 'center',
            fontSize: {
              xs: '1.25rem', // Kích thước chữ nhỏ cho màn hình nhỏ
              sm: '1.5rem', // Kích thước chữ lớn hơn cho màn hình trung bình
            },
          }}
        >
          Câu hỏi thường gặp
        </Typography>
        {faqItems.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography fontSize={{ xs: '0.9rem', sm: '1rem' }}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontSize={{ xs: '0.85rem', sm: '1rem' }}>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box
          mt={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push('/faq')}
            sx={{
              fontSize: {
                xs: '0.875rem', // Nhỏ hơn trên màn hình nhỏ
                sm: '1rem',
              },
              px: {
                xs: 2, // Padding ngang nhỏ hơn trên màn hình nhỏ
                sm: 4,
              },
              borderRadius: 6,
            }}
          >
            Xem thêm
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}

export { FAQComponent }
