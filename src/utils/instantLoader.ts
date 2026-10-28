// Instant Asset Preloader
// Eliminates network latency and image decode delays across pages and devices.

const CRITICAL_IMAGES = [
  '/assets/aistudio/aaditya_maheshwari_opt.jpg',
  '/assets/aistudio/aadit_amiye_opt.jpg',
  '/assets/aistudio/nit_rr_logo.png',
  '/assets/aistudio/nit_jsr_logo.png',
  '/assets/aistudio/IMG-20261027-WA0025_d3736de3.jpg',
  '/assets/aistudio/Library_of_Scents_with_Handheld_Vials_opt.jpg',
  '/assets/aistudio/Library_of_Scents_with_Handheld_Vials_fd03d189.png',
  '/assets/aistudio/category_woods_ref.jpg',
  '/assets/aistudio/category_floral_ref.jpg',
  '/assets/aistudio/category_citrus_ref.jpg',
  '/assets/aistudio/category_spices_ref.jpg',
  '/assets/aistudio/Titanium_AromaxAI_Scent_Machine_f3d2505a.png',
  '/assets/aistudio/AromaxAI_Aromatherapy_Scent_Diffuser_678d94ee.png',
  '/assets/aistudio/AromaxAI_Vial_Array_Machine_ab3b4640.png',
  '/assets/aistudio/beed88c1-c1ed-470f-bb86-a15037784fa3_a8ddc23e.png',
  '/assets/aistudio/bb053c35-4552-4d37-a81c-2cd5dd2c04fb_df04d57d.png',
  '/assets/aistudio/shlok_pandey_opt.jpg',
  '/assets/aistudio/aromax_logo_clean.png',
];

const CRITICAL_VIDEOS = [
  '/assets/aistudio/smell__online-video-cutter.com__a3fe16c1.mp4',
  '/assets/aistudio/IMG_9419__online-video-cutter.com__b31cd971.mp4',
  '/assets/aistudio/aromax_mob__online-video-cutter.com__2cd2fff9.mp4',
  '/assets/aistudio/___online-video-cutter.com__acbc7330.mp4',
];

// Preload and decode images into memory
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (typeof img.decode === 'function') {
      img
        .decode()
        .then(() => resolve())
        .catch(() => resolve());
    } else {
      (img as HTMLImageElement).onload = () => resolve();
      (img as HTMLImageElement).onerror = () => resolve();
    }
  });
}

// Warm up video cache in background
export function preloadVideo(src: string): void {
  try {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = src;
    link.type = 'video/mp4';
    document.head.appendChild(link);
  } catch {
    // Ignore if link preload not permitted
  }
}

// Main instant loader function called at startup
export function instantlyLoadAll(): void {
  // 1. Kick off video preload links
  CRITICAL_VIDEOS.forEach(preloadVideo);

  // 2. Eagerly decode all critical images
  CRITICAL_IMAGES.forEach((src) => {
    preloadImage(src);
  });
}
