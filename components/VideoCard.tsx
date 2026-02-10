import React, { useState, useEffect, useCallback } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@/types";

import { notify } from "@/lib/toast";

dayjs.extend(relativeTime);

interface VideoCardProps {
    video: Video;
    currentUserId: string | null | undefined;
    onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
    video,
    currentUserId,
    onDownload,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);

    const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video",
        });
    }, []);

    const getPreviewVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            quality: "auto",
            format: "mp4",
        });
    }, []);

    const formatSize = useCallback((size: number) => {
        return filesize(size);
    }, []);

    const formatDuration = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }, []);

    const compressionPercentage = Math.round(
        (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100,
    );

    useEffect(() => {
        setPreviewError(false);
    }, [isHovered]);

    const handlePreviewError = () => {
        setPreviewError(true);
    };

    const handleDelete = async () => {
        const confirmed = confirm("Delete this video permanently?");
        if (!confirmed) return;

        const toastId = notify.loading("Deleting video...");

        try {
            const res = await fetch(`/api/videos/${video.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error();

            notify.success("Video deleted", toastId);
            window.location.reload(); // (we can remove later if you want)
        } catch {
            notify.error("Failed to delete video", toastId);
        }
    };

    const isOwner = !!video.userId && video.userId === currentUserId;


    return (
        <div
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <figure className="aspect-video relative">
                {isHovered ? (
                    previewError ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <p className="text-red-500">
                                Preview not available
                            </p>
                        </div>
                    ) : (
                        <video
                            src={getPreviewVideoUrl(video.publicId)}
                            autoPlay
                            muted
                            loop
                            playsInline
                            onClick={(e) => {
                                e.currentTarget.requestFullscreen();
                            }}
                            className="w-full h-full object-cover cursor-pointer"
                        />
                    )
                ) : (
                    <img
                        src={getThumbnailUrl(video.publicId)}
                        alt={video.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
                    <Clock size={16} className="mr-1" />
                    {formatDuration(video.duration)}
                </div>
            </figure>

            <div className="card-body p-4">
                <h2 className="card-title text-lg font-bold">{video.title}</h2>

                <p className="text-sm text-base-content opacity-70 mb-4">
                    {video.description}
                </p>

                <p className="text-sm text-base-content opacity-70 mb-4">
                    Uploaded {dayjs(video.createdAt).fromNow()}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                        <FileUp size={18} className="mr-2 text-primary" />
                        <div>
                            <div className="font-semibold">Original</div>
                            <div>{formatSize(Number(video.originalSize))}</div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <FileDown size={18} className="mr-2 text-secondary" />
                        <div>
                            <div className="font-semibold">Compressed</div>
                            <div>
                                {formatSize(Number(video.compressedSize))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm font-semibold">
                        Compression:{" "}
                        <span className="text-accent">
                            {compressionPercentage}%
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            className="btn btn-primary btn-sm"
                            disabled={!video.url}
                            onClick={() => {
                                if (!video.url) return;
                                notify.success("Download started");
                                onDownload(video.url, video.title);
                            }}
                        >
                            <Download size={16} />
                        </button>

                        {isOwner && (
                            <button
                                className="btn btn-error btn-sm"
                                onClick={handleDelete}
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {!video.url && (
                    <p className="text-xs text-warning mt-2">
                        Re-upload required
                    </p>
                )}
            </div>
        </div>
    );
};

export default VideoCard;
