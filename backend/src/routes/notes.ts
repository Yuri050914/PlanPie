import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const router = Router();

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Prisma adapter and client
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET /api/notes - Get all notes for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.headers['user-id'] as string; // Temporary - will use auth later
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// POST /api/notes - Create a new note
router.post('/', async (req, res) => {
  try {
    const userId = req.headers['user-id'] as string;
    const { title, content } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content required' });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId
      }
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// PUT /api/notes/:id - Update a note
router.put('/:id', async (req, res) => {
  try {
    const userId = req.headers['user-id'] as string;
    const { id } = req.params;
    const { title, content } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const note = await prisma.note.update({
      where: { 
        id,
        userId // Ensure user owns the note
      },
      data: { title, content }
    });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.headers['user-id'] as string;
    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    await prisma.note.delete({
      where: { 
        id,
        userId // Ensure user owns the note
      }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;
