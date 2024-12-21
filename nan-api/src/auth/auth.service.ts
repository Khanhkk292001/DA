import { 
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'; // Import các exception từ NestJS
import { JwtService } from '@nestjs/jwt'; // Import JwtService để tạo token JWT
import * as bcrypt from 'bcryptjs'; // Import thư viện bcryptjs để mã hóa mật khẩu
import { RegisterUserDto } from './dto/register-user.dto'; // Import DTO dùng để đăng ký người dùng
import { JwtPayload } from './interfaces/jwt-payload.interface'; // Import interface JwtPayload dùng để định nghĩa payload trong JWT
import { PrismaService } from 'src/prisma/prisma.service'; // Import PrismaService để tương tác với cơ sở dữ liệu
import { User } from 'src/user/entities/user.entity'; // Import entity người dùng từ Prisma

@Injectable() 
export class AuthService {
  constructor(
    private prisma: PrismaService, // Inject PrismaService để truy cập cơ sở dữ liệu
    private readonly jwtService: JwtService, // Inject JwtService để tạo và kiểm tra token JWT
  ) {}

  // Hàm đăng ký người dùng mới
  async registerUser(dto: RegisterUserDto): Promise<any> {
    // Kiểm tra xem mật khẩu và mật khẩu xác nhận có khớp nhau không
    if (dto.password !== dto.passwordconf)
      throw new BadRequestException('Passwords do not match'); // Nếu không khớp, ném lỗi BadRequest

    dto.email = dto.email.toLowerCase().trim(); // Chuẩn hóa email (chuyển về chữ thường và loại bỏ khoảng trắng thừa)

    // Mã hóa mật khẩu người dùng trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      // Lấy thông tin người dùng từ DTO (trừ mật khẩu xác nhận)
      const { passwordconf, ...newUserData } = dto;
      newUserData.password = hashedPassword; // Gán mật khẩu đã mã hóa vào data người dùng

      // Tạo người dùng mới trong cơ sở dữ liệu
      const newuser = await this.prisma.user.create({
        data: newUserData,
        select: { // Chọn các trường cần trả về khi tạo người dùng
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      // Trả về thông tin người dùng và token JWT cho người dùng
      return {
        user: newuser,
        token: this.getJwtToken({
          id: newuser.id,
        }),
      };
    } catch (error) {
      // Nếu có lỗi khi tạo người dùng, kiểm tra lỗi trùng email (P2002 là lỗi của Prisma khi trùng khóa duy nhất)
      if (error.code === 'P2002') {
        throw new BadRequestException('User already exists'); // Người dùng đã tồn tại
      }
      // Nếu có lỗi khác, ném lỗi server
      throw new InternalServerErrorException('Server error');
    }
  }

  // Hàm đăng nhập người dùng
  async loginUser(email: string, password: string): Promise<any> {
    let user;
    try {
      // Tìm người dùng trong cơ sở dữ liệu theo email
      user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
        select: { //  Các trường thông tin người dùng cần trả về
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Wrong credentials'); // Nếu không tìm thấy người dùng, ném lỗi "Sai thông tin"
    }

    // Kiểm tra mật khẩu người dùng nhập vào có đúng với mật khẩu đã mã hóa trong cơ sở dữ liệu không
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Wrong credentials'); // Nếu mật khẩu không khớp, ném lỗi "Sai thông tin"
    }

    delete user.password; // Xóa trường mật khẩu trước khi trả về thông tin người dùng

    // Trả về thông tin người dùng và token JWT cho người dùng
    return {
      user,
      token: this.getJwtToken({
        id: user.id,
      }),
    };
  }

  // Hàm làm mới token JWT
  async refreshToken(user: User) {
    return {
      data: {
        user: user, // Thông tin người dùng
        token: this.getJwtToken({ id: user.id }), // Token mới cho người dùng
      },
    };
  }

  // Hàm lấy thông tin người dùng dựa trên userId
  async getMe(userId: string): Promise<any> {
    try {
      // Tìm người dùng theo userId trong cơ sở dữ liệu
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { // Chọn các trường cần trả về
          id: true,
          name: true,
          email: true,
          role: true,
          identityDoc: true,
          phoneNumber: true,
          dateOfBirth: true,
          avatar: true,
          gender: true,
          statusIdentityDoc: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found'); // Nếu không tìm thấy người dùng, ném lỗi "Không tìm thấy người dùng"
      }

      // Trả về thông tin người dùng
      return { data: user };
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving user'); // Nếu có lỗi, ném lỗi server
    }
  }

  // Hàm tạo token JWT từ payload
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload); // Dùng JwtService để ký và tạo token JWT từ payload
    return token; // Trả về token đã tạo
  }
}
