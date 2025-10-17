import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { loadImage } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useState } from "react";
import {
    ReactZoomPanPinchRef,
    TransformComponent,
    TransformWrapper,
} from "react-zoom-pan-pinch";

interface PMRDialogPortfolioProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    images: string[];
    projectId: string;
}

export default function PMRDialogPortfolio({
    open,
    onOpenChange,
    images,
    projectId,
}: PMRDialogPortfolioProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentScale, setCurrentScale] = useState(1);

    useEffect(() => {
        if (!api) return;

        setCurrentIndex(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap());
            setCurrentScale(1);
        });
    }, [api]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleClose = () => {
        onOpenChange(false);
    };

    const handleTransform = (ref: ReactZoomPanPinchRef) => {
        setCurrentScale(ref.instance.transformState.scale);
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-10 flex items-center justify-center bg-card overflow-hidden"
                >
                    <div className="fixed inset-0" onClick={handleClose} />
                    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                        {/* Close button */}
                        <motion.button
                            onClick={handleClose}
                            className="absolute top-6 right-6 z-50 bg-background backdrop-blur-md text-primary p-3 rounded-full transition-all duration-200 hover:scale-110 hover:bg-accent"
                            aria-label="Fermer"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>

                        {/* Carousel */}
                        <div className="w-full h-full flex items-center justify-center">
                            <Carousel
                                opts={{
                                    loop: true,
                                    watchDrag: currentScale <= 1,
                                }}
                                className="w-full h-full"
                                setApi={setApi}
                            >
                                <CarouselContent className="h-[100vh]">
                                    {images.map((img, idx) => (
                                        <CarouselItem
                                            key={img}
                                            className="flex items-center justify-center h-full"
                                        >
                                            <div className="w-full h-full relative">
                                                <TransformWrapper
                                                    initialScale={1}
                                                    minScale={1}
                                                    maxScale={3}
                                                    centerOnInit
                                                    wheel={{ step: 0.1 }}
                                                    doubleClick={{
                                                        disabled: false,
                                                        mode: "toggle",
                                                    }}
                                                    limitToBounds
                                                    onTransformed={
                                                        handleTransform
                                                    }
                                                >
                                                    {({
                                                        zoomIn,
                                                        zoomOut,
                                                        resetTransform,
                                                    }) => (
                                                        <>
                                                            {/* Zoom controls */}
                                                            <motion.div
                                                                initial={{
                                                                    x: 20,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    x: 0,
                                                                    opacity: 1,
                                                                }}
                                                                transition={{
                                                                    delay: 0.2,
                                                                }}
                                                                className="absolute top-6 right-20 z-50 flex gap-2"
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                            >
                                                                <motion.button
                                                                    whileHover={{
                                                                        scale: 1.1,
                                                                    }}
                                                                    whileTap={{
                                                                        scale: 0.95,
                                                                    }}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation();
                                                                        zoomIn();
                                                                    }}
                                                                    disabled={
                                                                        currentScale >=
                                                                        3
                                                                    }
                                                                    className="bg-background disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md text-primary p-3 rounded-full transition-all duration-200 hover:bg-accent"
                                                                    aria-label="Zoom in"
                                                                >
                                                                    <ZoomIn className="w-5 h-5" />
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{
                                                                        scale: 1.1,
                                                                    }}
                                                                    whileTap={{
                                                                        scale: 0.95,
                                                                    }}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation();
                                                                        zoomOut();
                                                                    }}
                                                                    disabled={
                                                                        currentScale <=
                                                                        1
                                                                    }
                                                                    className="bg-background disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md text-primary p-3 rounded-full transition-all duration-200 hover:bg-accent"
                                                                    aria-label="Zoom out"
                                                                >
                                                                    <ZoomOut className="w-5 h-5" />
                                                                </motion.button>
                                                                <AnimatePresence>
                                                                    {currentScale >
                                                                        1 && (
                                                                        <motion.button
                                                                            whileHover={{
                                                                                scale: 1.1,
                                                                            }}
                                                                            whileTap={{
                                                                                scale: 0.95,
                                                                            }}
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                resetTransform();
                                                                            }}
                                                                            className="bg-background backdrop-blur-md text-primary p-3 rounded-full transition-all duration-200 hover:bg-accent"
                                                                            aria-label="Reset zoom"
                                                                        >
                                                                            <Maximize2 className="w-5 h-5" />
                                                                        </motion.button>
                                                                    )}
                                                                </AnimatePresence>
                                                            </motion.div>

                                                            {/* Zoom indicator */}
                                                            <AnimatePresence>
                                                                {currentScale >
                                                                    1 && (
                                                                    <motion.div
                                                                        initial={{
                                                                            x: -20,
                                                                            opacity: 0,
                                                                        }}
                                                                        animate={{
                                                                            x: 0,
                                                                            opacity: 1,
                                                                        }}
                                                                        exit={{
                                                                            x: -20,
                                                                            opacity: 0,
                                                                        }}
                                                                        className="absolute top-6 left-6 z-50 bg-background backdrop-blur-md text-primary px-4 py-2 rounded-full text-sm font-medium pointer-events-none"
                                                                    >
                                                                        {Math.round(
                                                                            currentScale *
                                                                                100
                                                                        )}
                                                                        %
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>

                                                            <TransformComponent
                                                                wrapperClass="!w-full !h-full"
                                                                contentClass="!w-full !h-full !flex !items-center !justify-center"
                                                                wrapperStyle={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    cursor:
                                                                        currentScale >
                                                                        1
                                                                            ? "grab"
                                                                            : "default",
                                                                }}
                                                            >
                                                                <motion.div
                                                                    initial={{
                                                                        scale: 0.9,
                                                                        opacity: 0,
                                                                    }}
                                                                    animate={{
                                                                        scale: 1,
                                                                        opacity: 1,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.3,
                                                                    }}
                                                                    className="select-none flex items-center justify-center w-full h-3/4"
                                                                >
                                                                    {loadImage(
                                                                        projectId,
                                                                        img,
                                                                        `Image ${
                                                                            idx +
                                                                            1
                                                                        }`
                                                                    )}
                                                                </motion.div>
                                                            </TransformComponent>
                                                        </>
                                                    )}
                                                </TransformWrapper>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <CarouselPrevious
                                        className="left-6 bg-background hover:bg-accent backdrop-blur-md border-none text-primary transition-all duration-200"
                                        disabled={currentScale > 1}
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <CarouselNext
                                        className="right-6 bg-background hover:bg-accent backdrop-blur-md border-none text-primary transition-all duration-200"
                                        disabled={currentScale > 1}
                                    />
                                </motion.div>
                            </Carousel>
                        </div>

                        {/* Image counter */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background backdrop-blur-md text-primary px-4 py-2 rounded-full text-sm font-medium"
                        >
                            {currentIndex + 1} / {images.length}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
