import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils'

export async function GET() {
  const data = await prisma.user.findMany()
  return NextResponse.json({
    res: data
  })
}

export async function POST() {
  const data = await prisma.user.create({
    data: {
      name: "Lutfi Ikbal Majid",
      email: "lutfiikbalmajid@gmail.com"
    }
  })
  return NextResponse.json({
    res: data
  })
}