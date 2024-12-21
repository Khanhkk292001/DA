import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';    // Thư viện bcryptjs để băm mặt khẩu

const prisma = new PrismaClient();  // Khởi tạo Prisma Client để kết nối và thao tác với cơ sở dữ liệu.

// Thêm danh sách người dùng mặc định vào db
const users = [
  {
    name: 'SuperAdmin',
    email: 'super-admin@gmail.com',
    password: 'admin@123',
    role: Role.super_admin,
    emailVerified: new Date(),
  },
  {
    name: 'User',
    email: 'user@gmail.com',
    password: 'user@123',
    role: Role.user,
    emailVerified: new Date(),
  },
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin@123',
    role: Role.admin,
    emailVerified: new Date(),
  },
];

// Hàm băm mật khẩu
const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, 10);   // Băm mật khẩu với độ phức tạp là 10 vòng lặp 
  } catch (error) {
    console.error('Lỗi khi băm mật khẩu:', error);
    throw new Error('Không thể băm mật khẩu');
  }
};

// Hàm kiểm tra và thêm người dùng
const upsertUser = async (user: (typeof users)[number]): Promise<void> => {   
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },               // Tìm user theo trường email
    });

    if (existingUser) {
      console.log(`Người dùng ${user.email} đã tồn tại, không cần thêm mới.`);
    } else {
      const hashedPassword = await hashPassword(user.password);   // Gọi hàm bất đồng bộ hashPasswork để băm mặt khẩu của user    

      await prisma.user.create({     // Thêm user mới
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,   // Lưu mặt khẩu đã băm
          role: user.role,
          emailVerified: user.emailVerified,
        },
      });

      console.log(`Người dùng ${user.email} đã được thêm thành công.`);
    }
  } catch (error) {
    console.error(
      `Lỗi khi thêm hoặc cập nhật người dùng ${user.email}:`,
      error,
    );
  }
};

const userSeed = async (): Promise<void> => {
  try {
    console.log('--- Đang thêm người dùng ---');
    await Promise.all(users.map((user) => upsertUser(user)));
    console.log('--- Thêm người dùng hoàn tất ---');
  } catch (error) {
    console.error('Lỗi trong quá trình thêm người dùng:', error);
  } finally {
    await prisma.$disconnect();
  }
};

if (require.main === module) {
  userSeed();
}

export default userSeed;
