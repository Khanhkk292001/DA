'use client'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Container, Stack, Typography } from '@mui/material'

const faqs = [
  {
    question: 'Làm thế nào để thuê sản phẩm?',
    answer: 'Bạn có thể chọn sản phẩm, nhấn vào nút "Thuê ngay" và hoàn tất quy trình thanh toán.',
  },
  {
    question: 'Tôi có thể trả sản phẩm muộn không?',
    answer: 'Nếu bạn trả sản phẩm muộn, phí phạt sẽ được áp dụng dựa trên số ngày quá hạn.',
  },
  {
    question: 'Làm thế nào để hủy đơn hàng?',
    answer: 'Bạn có thể hủy đơn hàng trong phần quản lý đơn hàng trên tài khoản của mình trước khi đơn được xử lý.',
  },
  {
    question: 'Chính sách đổi trả như thế nào?',
    answer: 'Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm gặp vấn đề từ phía chúng tôi.',
  },
  {
    question: 'Tôi có thể thanh toán qua những phương thức nào?',
    answer: 'Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng và ví điện tử.',
  },
]

export const FAQPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Tiêu đề */}
      <Typography variant="h2" fontWeight="bold" textAlign="center" mb={6}>
        Câu hỏi thường gặp
      </Typography>
      <Stack spacing={1}>
        {/* Các câu hỏi */}
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
            >
              <Typography fontWeight="bold">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Container>
  )
}

export default FAQPage
