import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function createTestUser() {
  try {
    const user = await prisma.user.create({
      data: {
        id: 'temp-user-123',
        email: 'test@example.com',
        name: 'Test User',
      }
    });
    console.log('Test user created:', user);
  } catch (error) {
    console.log('User might already exist or error:', error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

createTestUser();
