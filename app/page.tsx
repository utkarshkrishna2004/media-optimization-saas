import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";

export default function LandingPage() {
    return (
        <main className="min-h-screen flex flex-col bg-base-100">
            {/* Hero Section */}
            <section className="flex-grow flex items-center justify-center">
                <div className="max-w-4xl text-center px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Media Optimization SaaS
                    </h1>

                    <p className="text-lg md:text-xl text-base-content/70 mb-10">
                        An AI-powered platform to optimize images and videos for
                        performance and social media.
                    </p>

                    {/* Single CTA */}
                    <div className="mb-14">
                        <Link
                            href="/home"
                            className="btn btn-primary btn-lg inline-flex items-center gap-2"
                        >
                            Go to App
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                        <div className="card bg-base-200 shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">
                                    Video Compression
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    Automatically compress videos while
                                    preserving visual quality using Cloudinary.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">
                                    Social Media Formats
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    Generate perfectly sized images for
                                    Instagram, Twitter, and other platforms.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">
                                    Built with Modern Stack
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    Next.js (App Router), Prisma ORM,
                                    PostgreSQL, and Cloudinary.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-base-300 py-6">
                <div className="flex items-center justify-center gap-3 text-sm text-base-content/60">
                    <span>
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-base-content">
                            Utkarsh Krishna
                        </span>
                    </span>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                        <a
                            href="https://github.com/utkarshkrishna2004"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-xs p-1"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/utkarsh-krishna-3bab41240/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-xs p-1"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
