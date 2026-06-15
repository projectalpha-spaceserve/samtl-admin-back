import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@samtl.com' },
    update: {},
    create: {
      firstname: 'SAMTL',
      lastname: 'Admin',
      email: 'admin@samtl.com',
      phone: '08000000000',
      password: hashedPassword,
    },
  });

  console.log('Admin seeded:', admin);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });