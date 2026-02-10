import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth(); // ✅ FIXED

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const {
            title,
            description,
            publicId,
            url,
            originalSize,
            compressedSize,
            duration,
        } = await req.json();

        if (!title || !publicId || !originalSize) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const video = await prisma.video.create({
            data: {
                title,
                description,
                publicId,
                url,
                originalSize: String(originalSize),
                compressedSize: String(compressedSize ?? originalSize),
                duration: duration ?? 0,
                userId,
            },
        });

        return NextResponse.json(video);
    } catch (error) {
        console.error("Failed to save video metadata", error);
        return NextResponse.json(
            { error: "Failed to save video metadata" },
            { status: 500 }
        );
    }
}
