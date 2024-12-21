// Import các kiểu dữ liệu và thư viện cần thiết
import { 
  LoginInputType,      // Kiểu dữ liệu đầu vào khi đăng nhập
  LoginResponseType,   // Kiểu dữ liệu phản hồi khi đăng nhập
  MeResponseType,      // Kiểu dữ liệu phản hồi khi lấy thông tin người dùng
  RegisterInputType    // Kiểu dữ liệu đầu vào khi đăng ký
} from '@/features/auth/type'
import request from '@/libs/configs/axios/axios' // Import hàm `request` đã cấu hình sẵn cho Axios

// Hàm đăng nhập người dùng
export const login = async (input: LoginInputType) => {
  // Gửi yêu cầu POST đến endpoint `auth/login` với dữ liệu đầu vào
  const response = await request.post<LoginResponseType>('auth/login', input)

  // Trả về dữ liệu phản hồi từ API
  return response.data
}

// Hàm lấy thông tin người dùng hiện tại (người đã đăng nhập)
export const getMe = async () => {
  // Gửi yêu cầu GET đến endpoint `auth/me`
  const response = await request.get<MeResponseType>('auth/me')

  // Trả về dữ liệu người dùng từ phần `data` trong phản hồi
  return response.data.data
}

// Hàm đăng ký tài khoản người dùng mới
export const register = async (input: RegisterInputType) => {
  // Gửi yêu cầu POST đến endpoint `auth/register` với dữ liệu đầu vào
  const response = await request.post('auth/register', input)

  // Trả về dữ liệu phản hồi từ API
  return response.data
}
