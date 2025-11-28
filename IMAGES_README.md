# 图片资源管理指南 (Assets Management)

为了方便管理您网站中的图片，建议在项目根目录下创建一个 `public/assets` 文件夹，并按照以下规范命名文件。

## 1. 文件夹结构

请确保您的项目目录结构如下：

```
project-root/
├── public/
│   ├── assets/           <-- 新建此文件夹
│   │   ├── logo.png      <-- 您的个人LOGO
│   │   ├── hero-bg.jpg   <-- 首页底部花卉背景图
│   │   ├── gallery/      <-- 画廊图片文件夹
│   │   │   ├── 1.jpg
│   │   │   ├── 2.jpg
│   │   │   └── ...
│   │   └── works/        <-- 作品集封面文件夹
│   │       ├── project1.jpg
│   │       └── ...
```

## 2. 文件命名规范

### LOGO
*   **文件名**: `logo.png` (推荐使用透明背景的PNG)
*   **位置**: `public/assets/logo.png`
*   **代码修改**: 在 `App.tsx` 中搜索 `<img src="姚思源_..."`，将其替换为 `<img src="/assets/logo.png"`。

### 首页背景 (Hero Background)
*   **文件名**: `hero-bg.jpg`
*   **位置**: `public/assets/hero-bg.jpg`
*   **建议**: 选用底部较暗、能够融入黑色背景的植物或纹理图片。
*   **代码修改**: 在 `App.tsx` 中搜索 `src="https://images.unsplash.com/photo-1615..."`，将其替换为 `src="/assets/hero-bg.jpg"`。

### 画廊图片 (Gallery)
*   **文件名**: `1.jpg`, `2.jpg`, `3.jpg`, ...
*   **位置**: `public/assets/gallery/`
*   **代码修改**: 打开 `constants.ts` 文件，找到 `GALLERY_PHOTOS` 数组，将 `src` 修改为对应路径：
    ```typescript
    export const GALLERY_PHOTOS = [
      { id: 1, src: "/assets/gallery/1.jpg", title: "Mist" },
      { id: 2, src: "/assets/gallery/2.jpg", title: "Dawn" },
      // ...
    ];
    ```

### 作品集图片 (Works)
*   **文件名**: 建议以项目名命名，如 `aether.jpg`, `verdant.jpg`。
*   **位置**: `public/assets/works/`
*   **代码修改**: 打开 `constants.ts` 文件，找到 `WEB_PROJECTS` 数组，修改 `image` 字段：
    ```typescript
    export const WEB_PROJECTS = [
      { id: 1, title: "A E T H E R", ..., image: "/assets/works/aether.jpg" },
      // ...
    ];
    ```

## 3. 注意事项
*   图片尽量进行压缩（WebP 或 压缩后的 JPG），以提升网站加载速度。
*   请确保文件名大小写与代码中完全一致。
