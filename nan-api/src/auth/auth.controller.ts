import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'; 
import { AuthService } from './auth.service'; 
import { Auth, GetUser } from './decorators'; 
import { RegisterUserDto } from './dto/register-user.dto'; 

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'; 
import { User } from 'src/user/entities/user.entity'; // Import entity User để sử dụng trong các response
import { LoginUserDto } from './dto/login-user.dto'; // Import DTO đăng nhập người dùng

@ApiTags('Auth') 
@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inject AuthService vào controller để sử dụng các phương thức đăng nhập, đăng ký

  // Route đăng ký người dùng
  @Post('register')
  @ApiOperation({
    summary: 'Đăng ký', 
  })
  register(@Body() createUserDto: RegisterUserDto) {
    // Xử lý đăng ký người dùng mới bằng cách gọi phương thức registerUser trong AuthService
    return this.authService.registerUser(createUserDto);
  }

  // Route đăng nhập người dùng
  @Post('login')
  @ApiOperation({
    summary: 'Đăng nhập', 
  })
  async login(@Res() response, @Body() loginUserDto: LoginUserDto) {
    // Xử lý đăng nhập người dùng bằng cách gọi phương thức loginUser trong AuthService
    const data = await this.authService.loginUser(
      loginUserDto.email, // Email người dùng
      loginUserDto.password, // Mật khẩu người dùng
    );
    // Trả về response với status OK và dữ liệu người dùng cùng token
    response.status(HttpStatus.OK).send(data);
  }

  // Route làm mới token
  @Get('refresh-token')
  @ApiOperation({
    summary: 'Refresh token', 
  })
  @ApiBearerAuth() 
  @Auth() // Kiểm tra xem người dùng đã đăng nhập chưa 
  refreshToken(@GetUser() user: User) {
    // Gọi phương thức refreshToken trong AuthService để tạo token mới cho người dùng
    return this.authService.refreshToken(user);
  }

  // Route lấy thông tin người dùng
  @Get('me')
  @ApiOperation({
    summary: 'Thông tin của tôi', 
  })
  @ApiBearerAuth() 
  @Auth() // Kiểm tra xem người dùng đã đăng nhập chưa 
  async getMe(@GetUser() user: User) {
    // Gọi phương thức getMe trong AuthService để lấy thông tin người dùng
    return await this.authService.getMe(user.id);
  }
}
